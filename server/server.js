const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const customerSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  age: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.log("Error getting customers:", err);
    res.status(500).send("Error getting customers");
  }
});

app.post("/api/customers", (req, res) => {
  const customerData = req.body;

  const newCustomer = new Customer(customerData);

  newCustomer
    .save()
    .then((savedCustomer) => {
      res.status(201).json(savedCustomer);
    })
    .catch((error) => {
      console.error("Error saving customer:", error);
      res.status(500).json({ message: "Error saving customer" });
    });
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    await Customer.findByIdAndRemove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log("Error deleting customer:", err);
    res.status(500).send("Error deleting customer");
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    console.log("Error updating customer:", err);
    res.status(500).send("Error updating customer");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
