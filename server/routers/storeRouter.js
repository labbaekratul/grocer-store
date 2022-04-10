const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Store = require("../models/storeModel.js");

const storeRouter = express.Router();

storeRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const stores = await Store.find({});
    res.send(stores);
  })
);

storeRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdStores = await Store.insertMany(data.stores);
    res.send({ createdStores });
  })
);

storeRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id);

    if (store) {
      res.send(store);
    } else {
      res.status(404).send({ message: "Product not Found" });
    }
  })
);

storeRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id);
    if (store) {
      await store.remove();
      res.send({ message: "store Deleted" });
    } else {
      res.status(404).send({ message: "Store Not Found" });
    }
  })
);

storeRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const store = new Store({
      name: req.body.name,
      image: req.body.image,
      openingTime: `Delivery by ${req.body.openingTime}`,
      deliveryTime: req.body.deliveryTime,
    });
    const createdStore = await store.save();
    res.send({ message: "Store Created", store: createdStore });
  })
);

module.exports = storeRouter;
