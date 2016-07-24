  var SequenceGenerator = require('mysequence').SequenceGenerator;
    var SequenceStore = require('mysequence').SequenceStore;
    var redisClient = require('./redis');
    var store = new SequenceStore({
        keyPrefix: 'seq:id:',
        redis: redisClient,
        logger: console
    });

    var generator = new SequenceGenerator();
    generator.useLogger(console); //set logger here, or just use console as logger
    generator.useStore(store);    //set store here, here we use default redis store

    /*
     * set default sequence config in case of client don't config it.
     */
    generator.useDefaults({
        initialCursor: 0, //default start number for a new sequence
        segment: 20000,   //default segment width which a sequence apply once
        prebook: 18000    //default prebook point when a sequence start to apply a segment in advance
    });

    /**
     * put each of sequence config here
     */
    generator.putAll(
        [{
            key: 'Employee', //the sequence's name which is store in redis.
            initialCursor: 0,     //the sequence's initial value to start from
            segment: 100,         //a number width to increase before sequence touch the segment end.
            prebook: 60           //It means when to book segment. the value is normally
                                  //between half segment (50) and near segment end (90).
        },{
            key: 'User',
            //initialValue: 100,  //by default, use 0
            //segment: 1000,      //by default, use 20000
            //prebook: 500        //by default, use 18000
        }]
    );

    /*
     * Invoke #init method to initialize/sync all sequence to store(redis) until callback
     * is invoked with true parameter.
     */
    generator.init(function(result){
        if(!result){
            throw new Error('generator is not ready');
        }
        var so = generator.get('Employee'); //get a ready sequence object.
        console.log(so.next().val); //get and output a new sequence number
        console.log(so.next().val); //get and output a another sequence number
    });