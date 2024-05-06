#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

import test_data from './testUser.json' 
console.log(data);

amqp.connect('amqp://frontend:frontendpass@localhost:5672/', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'fe2be';
        var msg = toString(test_data);
       

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});