const { ServiceBusClient, ReceiveMode, delay} = require("@azure/service-bus");
const BatteryController = require('../controllers').BatteryController;
const socketIo = require('./socket');
let io;

async function message(server) {
  const connection_string = process.env.NAMESPACE_CONNECTION_STRING;
  io = socketIo(server);
  while(true) {
    const sbClient = ServiceBusClient.createFromConnectionString(connection_string);
    try {
      await receiveMessages(sbClient);
    } finally {
      await sbClient.close();
    }
  }
}

async function receiveMessages(sbClient) {
  const queueName = "jplbus-queue";
  const queueClient = sbClient.createQueueClient(queueName);

  const onMessageHandler = async (brokeredMessage) => {
    const battery = await BatteryController.add(brokeredMessage.body);

    if(battery) {
      io.emit('add_battery', battery.dataValues);
    }
    await brokeredMessage.complete();
  };
  const onErrorHandler = (err) => {
    console.log("Error occurred: ", err);
  };

  let receiver = queueClient.createReceiver(ReceiveMode.peekLock);
  receiver.registerMessageHandler(onMessageHandler, onErrorHandler);
  await delay(5000);
  await receiver.close();

  await queueClient.close();
}

module.exports = message;
