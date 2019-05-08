const mongoose = require('mongoose');
const { Lot, Gestionnaire, Client } = require('../src/models');
const clients = require('../data/client_dataset.json');

const loadClient = async () => {
  await mongoose.connect('mongodb://localhost:27017/myFonciaBdd', {
    useNewUrlParser: true,
  });
  const clientToInsert = clients.map(
    client => new Client({ id: new mongoose.Types.ObjectId(), ...client }),
  );
  Client.insertMany(clientToInsert, () => {
    console.log('data loaded with success.');
    process.exit(0);
  });
};
loadClient();
