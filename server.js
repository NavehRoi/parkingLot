const express = require('express');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JSON_FILE = 'parking_data.json';

let parkingData = [];

// Load initial parking data from JSON file
try {
  const jsonData = fs.readFileSync(JSON_FILE);
  parkingData = JSON.parse(jsonData);
} catch (err) {
  console.error('Error reading parking data:', err);
}

function saveParkingData() {
  fs.writeFile(JSON_FILE, JSON.stringify(parkingData, null, 2), err => {
    if (err) {
      console.error('Error saving parking data:', err);
    }
  });
}

app.get('/', (req, res) => {
  res.send('Welcome to the Roi & Nir Parking Lot API');
});

// POST /entry?plate=123-123-123&parkingLot=382
app.post('/entry', (req, res) => {
  const { plate, parkingLot } = req.query;

  if (!plate || !parkingLot) {
    return res.status(400).json({ error: 'Missing plate or parkingLot in query parameters' });
  }

  console.log('New entry:', plate, parkingLot);

  const currentDateTime = new Date().toISOString();
  const ticketId = Math.random().toString(36).substring(7); // Generate random ticket ID

  parkingData.push({ ticketId, plate, parkingLot, date: currentDateTime });
  saveParkingData();

  res.status(201).json({ message: `Your ticket ID: ${ticketId}` });
});

// POST /exit?ticketId=1234
app.post('/exit', (req, res) => {
  const { ticketId } = req.query;

  if (!ticketId) {
    return res.status(400).json({ error: 'Missing ticketId in query parameters' });
  }

  console.log('Exit ticket:', ticketId);

  const itemIndex = parkingData.findIndex(entry => entry.ticketId === ticketId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const currentDateTime = new Date();
  const parkedDateTime = new Date(parkingData[itemIndex].date);
  const parkedTime = currentDateTime - parkedDateTime;

  const parkedTimeMinutes = Math.floor(parkedTime / (1000 * 60));
  console.log('Parked time:', parkedTimeMinutes, 'minutes');

  // Calculate the charge based on 15 minutes increments
  const charge = Math.floor(parkedTime / (1000 * 60 * 15)) * 2.5;
  console.log('Charge:', charge); 

  const exitArray = parkingData.splice(itemIndex, 1);
  saveParkingData();

  const exitCar = exitArray[0];
  res.status(200).json({
    plate: exitCar.plate,
    parkedTime: `${parkedTimeMinutes} minutes`,
    parkingLotId: exitCar.parkingLot,
    charge: `$${charge}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
