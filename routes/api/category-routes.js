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

// mini project 13
// router.post("/", (req, res) => {
//   //  post route
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

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

// mini project 13
// router.put("/:id", (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       // find all associated tags from ProductTag
//       return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

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
