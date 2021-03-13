const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  //Capital letter is model
  //models are green
  Product.findAll({
    include: [Category, Tag],
  })
    .then((products) => res.json(products))

    .catch((err) => res.status(500).json(err));
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findByPk(req.params.id)

    .then((products) => res.json(products))
    .catch((err) => res.status(500).json(err));
});

// create new product
router.post("/", (req, res) => {
  // create a new tag
  Product.create(req.body)
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json(err));
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((productsData) => res.json(productsData))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((productsData) => res.json(productsData))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
