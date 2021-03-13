const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //tutor helped
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))

    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value "findByPk"
  // be sure to include its associated Products
  //tutor helped
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((categories) => res.json(categories))

    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  // create a new category
  //mini project unit 13
  Category.create(req.body) 
  .then((category) => res.json(category))
  .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  //used mini project 13 to help
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categoryData) => res.json(categoryData))
  .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  //   try {
    Category.destroy({
      where: {
        id: req.params.id
      }
  })
  .then((categoryData) => res.json(categoryData))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
