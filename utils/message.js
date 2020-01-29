const { ServiceBusClient, ReceiveMode, delay} = require("@azure/service-bus");
const BatteryController = require('../controllers').BatteryController;

async function message() {
  const connection_string = process.env.NAMESPACE_CONNECTION_STRING;



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
    console.log(brokeredMessage.body);

    await BatteryController.add(brokeredMessage.body);

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
