'use strict';
require('dotenv').config();

const express = require('express');
const RouterBuilder = require('./routes');
const cors = require('cors');
const { ServiceBusClient, ReceiveMode, delay } = require("@azure/service-bus");
const BatteryController = require('./controllers').BatteryController;

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

message().catch((err) => {
  console.log("Error occurred: ", err);
});

async function receiveMessages(sbClient) {
  const queueName = "esgi-jpl-queue";
  const queueClient = sbClient.createQueueClient(queueName);

  const onMessageHandler = async (brokeredMessage) => {
    console.log(brokeredMessage.body);
    //await BatteryController.add(brokeredMessage.body);
    await brokeredMessage.complete();
  };

  const onErrorHandler = (err) => {
    console.log("Error occurred: ", err);
  };

  let receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);
  console.log("avant");
  await receiver.registerMessageHandler(onMessageHandler, onErrorHandler);
  console.log("apres");
  await receiver.close();

  await queueClient.close();
}

const app = express();
app.use(cors());

RouterBuilder.build(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Api Start on server ${port}...`));
