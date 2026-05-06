const mongoose = require("mongoose");

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined in .env");
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};

module.exports = { connect };
