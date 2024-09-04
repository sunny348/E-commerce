const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.error(err);
  });

// Use cors middleware to allow requests from your frontend
app.use(cors()); // Add this line
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true, // Allow credentials like cookies
}));

// Import routes
const databaseSeeder = require('./databaseSeeder');
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

// Routes
app.use('/api/seed', databaseSeeder);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
