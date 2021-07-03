const Category = require("../models/categoryModel");
const _ = require("lodash");

module.exports = {
  categoryById: (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
      if (err || !category) {
        return res.json({
          error: err,
        });
      }
      req.category = category;
      next();
    });
  },
  getCategory: (req, res, next) => {
    Category.find()
      .select("_id name icon color")
      .then((category) => {
        return res.json(category);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  createCategory: (req, res, next) => {
    Category.create(req.body)
      .then((category) => {
        return res.json(category);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  deleteCategory: (req, res, next) => {
    let category = req.category;
    category.remove((err, result) => {
      if (err || !category) {
        return res.json({
          error: err,
        });
      }
      return res.json({
        message: `Category ${result.name} is Deleted`,
      });
    });
  },
  updateCategory: (req, res, next) => {
    let category = req.category;
    category = _.extend(category, req.body);
    category.save((err, result) => {
      if (err || !category) {
        return res.json({
          message: "Category not Found",
        });
      }
      return res.json({
        message: "Updated Succesful",
        Category: result,
      });
    });
  },
};
