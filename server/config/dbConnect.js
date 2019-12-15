const mongoose = require("mongoose");
const mongooseUri = process.env.MONGOOSE_URI || "mongodb://localhost:27017/richardson-risk";

const dbConnect = async () => {
  try {
    await mongoose.connect(mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`Mongoose connected to: ${mongooseUri}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
