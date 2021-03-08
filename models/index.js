// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");
const { belongsTo } = require("./Category");
const seedProducts = require("../seeds/product-seeds");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products

// Products belongToMany Tags (through ProductTag)
Products.belongTo(ProductTag),
  {
    foreignKey: "product_id",
  };

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
