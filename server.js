const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./server/routers/userRouter.js");
const productRouter = require("./server/routers/productRouter.js");
const orderRouter = require("./server/routers/orderRouter.js");
const path = require("path");
const storeRouter = require("./server/routers/storeRouter.js");
const uploadRouter = require("./server/routers/uploadRouter.js");
const categoryRouter = require("./server/routers/categoryRouter.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/alimama", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/store", storeRouter);
app.use("/api/category", categoryRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("application is running");
  });
}

// app.use(express.static(path.join(__dirname, "/client/build/")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/build/index.html"))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
