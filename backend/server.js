const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { seedSampleProducts } = require("./controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedSampleProducts();
  })
  .catch((err) => {
    console.log(
      "MongoDB connection failed, running without database:",
      err.message,
    );
    console.log("Note: Some features may not work without MongoDB");
  });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
