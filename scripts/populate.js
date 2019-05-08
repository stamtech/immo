const { Lot, Gestionnaire, Client } = require("../src/models");
const clients = require("../data/client_dataset.json");
const mongoose = require("mongoose");
const loadClient = async () => {
  await mongoose.connect("mongodb://localhost:27017/myFonciaBdd", {
    useNewUrlParser: true
  });
  const clientToInsert = clients.map(
    client => new Client({ id: new mongoose.Types.ObjectId(), ...client })
  );
  Client.insertMany(clientToInsert, (error, result) => {
    console.log("data loaded with success.");
    process.exit(0);
  });
};
loadClient();
