const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.find({});
    res.send(category);
  })
);

categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: "Category not Found" });
    }
  })
);

categoryRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: req.body.name,
      image: req.body.image,
    });
    const createdCategory = await category.save();
    res.send({ message: "Store Created", store: createdCategory });
  })
);

categoryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      category.image = req.body.image;
      const updatedCategory = await category.save();
      res.send({ message: "Category Updated", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.send({ message: "Category Deleted" });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

module.exports = categoryRouter;
