const Product = require("../models/productModel");
const _ = require("lodash");

module.exports = {
  productById: (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
      if (err || !product) {
        return res.json({
          error: "Product not Found",
        });
      }
      req.product = product;
      next();
    });
  },
  craeteProduct: (req, res, next) => {
    const productParam = {
      name: req.body.name,
      desc: req.body.discription,
      photo: req.body.photo,
      inStock: req.body.instock,
      photos: req.body.photos,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rate,
      isFeatured: req.body.featured,
    };
    let product = new Product(productParam);
    product.category = req.category;
    product.save((err, result) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      return res.json({
        product: result,
      });
    });
  },
  getProduct: (req, res, next) => {
    Product.find()
      .populate("category", " name")
      .select(
        "_id name desc brand photo inStock price rating isFeatured created"
      )
      .then((product) => {
        return res.json(product);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  getProductByCategory: (req, res, next) => {
    Product.find({ category: req.category.id })
      .populate("category", "name")
      .select(
        "_id name desc brand photo inStock price rating isFeatured created"
      )
      .sort("_created")
      .exec((err, product) => {
        if (err) {
          return res.json({
            error: err,
          });
        }
        return res.json(product);
      });
  },
  getSingleProduct: (req, res, next) => {
    Product.findById(req.product.id)
      .populate("category", "name")
      .then((product) => {
        if (!product) {
          return res.json({
            error: "Product not Found",
          });
        }
        return res.json(product);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  updateProduct: (req, res, next) => {
    const productParam = {
      name: req.body.name,
      desc: req.body.discription,
      photo: req.body.photo,
      inStock: req.body.instock,
      photos: req.body.photos,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rate,
      isFeatured: req.body.featured,
    };
    let product = req.product;
    Product.findByIdAndUpdate(product._id, productParam, { new: true }).then(
      (result) => {
        return res
          .json({
            message: "Prodcut Updated",
            product: result,
          })
          .catch((err) => {
            return res.json({
              error: err,
            });
          });
      }
    );
  },
  deleteProduct: (req, res, next) => {
    let product = req.product;
    product.remove((err, result) => {
      if (err || !result) {
        return res.json({
          error: err,
        });
      }
      return res.json({
        message: `Product ${result.name} was Deleted`,
      });
    });
  },
  productCount: (req, res, next) => {
    Product.countDocuments((count) => {
      return res.json({
        count,
      });
    }).catch((err) => {
      return res.json({
        error: err,
      });
    });
  },
  featuredProduct: (req, res, next) => {
    Product.find({ isFeatured: true })
      .then((product) => {
        return res.json({
          product,
        });
      })
      .catch((err) => {
        error: err;
      });
  },
};
