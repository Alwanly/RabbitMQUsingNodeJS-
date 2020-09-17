const amqp = require('amqplib/callback_api')

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connectionError, connection) => {
    if (connectionError) {
        throw connectionError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        //Step 3: Create Queue
        const QUEUEsatu = 'eaiTask'
        channel.assertQueue(QUEUEsatu);

        const QUEUEdua = 'codingtest'
        channel.assertQueue(QUEUEdua)

        // Step 4: Receive Messages
        channel.consume(QUEUEsatu, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
        }, {
            noAck: true
        })

        channel.consume(QUEUEdua,(msg)=>{
            console.log(`Message receved: ${msg.content.toString()}`)
        },{
            noAck: true
        })
    })
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
})