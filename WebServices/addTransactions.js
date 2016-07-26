module.exports = function(app, client, url) {
    var common = require("./commonscripts.js");
    var MongoClient = require('mongodb').MongoClient;
    var ObjectId = require('mongodb').ObjectID;
    var bodyParser = require('body-parser');
    var assert = require('assert');
    var mongourl = common.mongoUrl;
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    var successCount = 0;
    var failedCount = 0;

    var path = common.addTransactions;
    var closeDB = function(db) {
        db.close();
    };	

    function checkSuccess(db, docId, length, response) {

        if (docId == length-1) {
            closeDB(db);
            if (successCount == length) {
                response.json('{"success":"inserted ' + successCount + ' records."}');

            } else {
                response.status(500).send('{"failure":"failed ' + failedCount + ' records."}');

            }

        }
    }

    var updateDoc = function(db, insertedDoc, docId, length, sequenceId, response) {
        db.collection('transactions').updateOne({
            "_id": insertedDoc
        }, {
            $set: {
                "TRANSACTION_ID": sequenceId
            },
            $currentDate: {
                "lastModified": true
            }
        }, function(err, results) {

            if (!err) {
                successCount++;
                checkSuccess(db, docId, length, response);
            } else {
                failedCount++;
                checkSuccess(docId, length, response);
                response.status(500).send('{"failure":"error while updating sequence"}');
            }
        });
    }
    var insertTransaction = function(db, transactionData, response) {

        db.collection('transactions').insert(transactionData, response, function(err, result) {
            if (!err) {
                var insertedDocs = result.insertedIds;
                for (var w = 0; w < insertedDocs.length; w++) {
                    incrementSequence(db, insertedDocs[w], w, insertedDocs.length, response);
                }

            } else {
                closeDB(db);
                response.status(500).send('{"failure":"error while insertion"}');
            }

        });
    };
    var incrementSequence = function(db, insertedDoc, docId, length, response) {

        db.collection('transactioncounter').findAndModify({
            "_id": "transactionid"
        }, {}, {
            "$inc": {
                "seq": 1
            }
        }, {
            "new": true,
            "upsert": true
        }, function(err, results) {
            if (!err) {

                updateDoc(db, insertedDoc, docId, length, results.value.seq, response);
            } else {
                response.status(500).send('{"failure":"error while incrementSequence in mongodb"}');
                closeDB(db);
            }
        });

    }

    app.use(function(req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    app.post(path, function(req, res, next) {
        var transactions = req.body.transactions;
console.log(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = "";
        var validated = false;
 	successCount = 0;
    	failedCount = 0;

        var mandatoryAttributeMessage = "Please send transaction/s to be inserted";
        if ((typeof transactions !== "undefined") && (transactions !== null)) {
            validated = true;
        } else {
            res.send(mandatoryAttributeMessage);
        }

        if (validated) {



            MongoClient.connect(mongourl, function(err, db) {
                assert.equal(null, err);
                if (!err) {
                    insertTransaction(db, transactions, res);

                } else {
                    res.status(500).send('{"failure":"error while connecting to mongodb"}');
                }

            });

        }

        req.on('requestTimeout', function(req) {
            console.log('request has expired');
            res.send('request has expired');
            req.abort();
        });

        req.on('responseTimeout', function(res) {
            console.log('response has expired');
            res.send('response has expired');
        });

        //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
        req.on('error', function(err) {
            console.log('request error', err);
            res.send(err);
        });

    });
}