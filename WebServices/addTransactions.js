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

    var path = common.addTransactions;
    var insertTransaction = function(db, transactionData, response, callback) {
        db.collection('transactions').insert(transactionData, response, function(err, result) {
            if (!err) {
                console.log("Inserted a document into the transactions collection.");
                //console.log(result.result.toString());
                response.json('"success":' + '"' + result.toString() + '"');
            } else {
                callback();
                response.json('{"failure":"error while insertion"}');
            }

        });
    };
app.use(function (req, res, next) {

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
    app.post(path, function(req, res,next) {
        var transactions = req.body.transactions;
        res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = "";
        var validated = false;
        var mandatoryAttributeMessage = "Please send transaction/s to be inserted";
        if ((typeof transactions !== "undefined") && (transactions !== null)) {
            validated = true;
        } else {
            res.send(mandatoryAttributeMessage);
        }
        //};
        if (validated) {


            MongoClient.connect(mongourl, function(err, db) {
                assert.equal(null, err);
                if (!err) {
                    insertTransaction(db, transactions, res, function() {
                        db.close();
                    });
                } else {
                    response.json('{"failure":"error while connecting to mongodb"}');
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