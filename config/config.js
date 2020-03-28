const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };

    await mongoose.connect(uri, mongooseOpts);
    mongoose.connection.on("connected", () => console.log("connected DB"));
  } else {
    try {
      await mongoose.connect(
        process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        },
        console.log("connected to db")
      );
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
};

module.exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
module.exports.clear = async () => {};
module.exports.connectDB = connectDB;
