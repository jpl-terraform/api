'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const BatteryController = require('../controllers').BatteryController;

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    try {
        const p = await BatteryController.add(req.body);
        res.json(p);
    } catch(err) {
        res.status(409).end();
    }
});

router.get('/', async (req, res) => {
  try{
    const p = await BatteryController.getAll();
    if(p) {
        return res.json(p).status(200);
    }else{
        res.status(404).end();
    }
  }catch(err){
    console.log({err : err, env : process.env});
    res.status(500).json({err : err, env : process.env}).end();
  }
});


module.exports = router;
