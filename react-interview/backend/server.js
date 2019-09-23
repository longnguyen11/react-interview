import express from 'express';
import cors from 'cors';
require('dotenv').config({path:'.env'});
const app = express();

const fs = require('fs');
const csv = require('csv-parser');

import * as locations from "../data/stores.json";

function getLocations(req) {

  var stores = []

  locations.Stores.map(x => {
    stores.push(
      {
        name: x.lct_name,
        number: x.lct_nbr,
        geometry: {
          location: {
            lat:x.ltd_msr,
            lng:x.lng_msr
          }
        }
      },
    )
  })
  return stores
}

function getEarth(req) {

  let fileContent = fs.readFileSync('../data/earthquake.csv', {encoding: 'utf8'});
  return fileContent
}

function getLoans(req) {

  let fileContent = fs.readFileSync('../data/Loan_payments_data.csv', {encoding: 'utf8'});
  return fileContent
}

app.use(cors());
app.get('/react-interview/getLowesStores', (req, res) => res.send(getLocations(req)));
app.get('/react-interview/getEarthQuakes', (req, res) => res.send(getEarth(req)));
app.get('/react-interview/getLoanData', (req, res) => res.send(getLoans(req)));

app.listen(process.env.PORT);
