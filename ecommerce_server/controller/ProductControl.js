const Product = require("../models/Product");
const Keyword = require("../models/KeywordModel");
exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  console.log(
    "Product Control line no 29 : Product Category : ",
    req.query.category
  );

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  // if (req.query._sort && req.query._order) {
  //   query = query.sort({ [req.query._sort]: req.query._order });
  //   console.log(req.query._sort);
  //   console.log(req.query._order);
  // }
  if (req.query._sort && req.query._order) {
    const sortingField = req.query._sort;
    const sortingOrder = req.query._order.match("desc") ? -1 : 1;
    const sortingObject = {};
    sortingObject[sortingField] = sortingOrder;
    query = query.sort({ [req.query._sort]: sortingOrder });
    console.log(sortingField);
    console.log(sortingOrder);
  }
  console.log(
    "Product Controller Line  no : 57 | req.query.keyword : ",
    req.query.keyword
  );
  if (req.query.keyword) {
    // Use the $regex operator for a case-insensitive title search using a keyword
    query = query.find({
      $or: [
        { description: { $regex: new RegExp(req.query.keyword, "i") } },
        { title: { $regex: new RegExp(req.query.keyword, "i") } },
      ],
    });
    totalProductsQuery = totalProductsQuery.find({
      $or: [
        { description: { $regex: new RegExp(req.query.keyword, "i") } },
        { title: { $regex: new RegExp(req.query.keyword, "i") } },
      ],
    });
  }
  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllKeyWords = async (req, res) => {
  try {
    const { characters } = req.query; // Get the characters to search for from the query parameters
    if (!characters) {
      return res
        .status(400)
        .json({ error: "Please provide characters to search for." });
    }
    // Use a regular expression to perform a case-insensitive search for keywords
    const regex = new RegExp(characters, "i");
    console.log("Search characters:", characters);
    console.log("Regular Expression:", regex);
    // Find keywords that match the provided characters
    const keywords = await Keyword.find({ keyword: regex });
    console.log("Found keywords:", keywords);
    res.json(keywords); // Respond with the actual 'keywords' array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createKeyWords = async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res
        .status(400)
        .json({ error: "Please provide a keyword to add." });
    }

    // Check if the keyword already exists in the database
    const existingKeyword = await Keyword.findOne({ keyword });

    if (existingKeyword) {
      return res.status(409).json({ error: "Keyword already exists." });
    }

    // Create a new keyword document and save it to the database
    const newKeyword = new Keyword({ keyword });
    await newKeyword.save();

    res.status(201).json(newKeyword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.fetchAllProducts = async (req, res) => {
//   console.log("req.query", req.query);
//   console.log("req.query.admin", req.query.admin);
//   console.log("req.query.keyword", req.query.keyword);
// };
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};
