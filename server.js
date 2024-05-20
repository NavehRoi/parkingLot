const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(({ path: '' }));

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection URI, to specific collection
const MONGODB_URI = process.env.MONGODB_URI;

const parkingSchema = new mongoose.Schema({
    plate: String,
    parkingLotId: String,
    date: Object,
  });

const Item = mongoose.model('Item', parkingSchema, 'parking_lot');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    const server = app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
    });

}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


app.get('/', async (req, res) => {
  res.send('Welcome to the Roi & Nir Parking Lot API');
});

// POST /entry?plate=123-123-123&parkingLot=382
app.post('/entry', async (req, res) => {
  try {
    const { plate, parkingLot } = req.query;

    if (!plate || !parkingLot) {
      return res.status(400).json({ error: 'Missing plate or parkingLot in query parameters' });
    }

    console.log('New entry:', plate, parkingLot);

    const currentDateTime = new Date();
    const date = currentDateTime.toISOString();

    const ticketId = await Item.create({
      plate,
      parkingLotId: parkingLot,
      date,
    }).then(item => item._id);

    res.status(201).json({ message: `Your ticket ID: ${ticketId}` });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: 'An error occurred while creating the entry' });
  }
});

// POST /exit?ticketId=1234
app.post('/exit', async (req, res) => {
  try {
    const { ticketId } = req.query;

    if (!ticketId) {
      return res.status(400).json({ error: 'Missing ticketId in query parameters' });
    }

    console.log('Exit ticket:', ticketId);

    const item = await Item.findById(ticketId);

    if (!item) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const currentDateTime = new Date();
    const parkedDateTime = new Date(item.date);
    const parkedTime = currentDateTime - parkedDateTime;

    console.log('Parked time:', Math.floor(parkedTime / (1000 * 60)), 'minutes');

    // Calculate the charge based on 15 minutes increments
    const charge = Math.floor(parkedTime / (1000 * 60 * 15)) * 2.5;

    res.status(200).json({
      plate: item.plate,
      parkedTime: `${Math.floor(parkedTime / (1000 * 60))} minutes`,
      parkingLotId: item.parkingLotId,
      charge: `$${charge}`,
    });
  } catch (error) {
    console.error('Error exiting ticket:', error);
    res.status(500).json({ error: 'An error occurred while exiting the ticket' });
  }
});