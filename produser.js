const amqp = require('amqplib/callback_api');

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connectionError, connection) => {
    if (connectionError) {
        throw connectionError
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError
        }
        // Step 3: Create Queue Name
        const QUEUEsatu = 'eaiTask'
        channel.assertQueue(QUEUEsatu)

        const QUEUEdua = 'codingtest'
        channel.assertQueue(QUEUEdua)        
        
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUEsatu, Buffer.from('Helo EAI TASK from Produser'))
        console.log(`Message send ${QUEUEsatu}`)

        channel.sendToQueue(QUEUEdua, Buffer.from('Halo Codingtest from produser'))
        console.log(`Message send ${QUEUEdua}`)
    })
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
})