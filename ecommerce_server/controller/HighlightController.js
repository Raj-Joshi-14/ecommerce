const Highlight = require("../models/Highlights");
const Product = require("../models/Product");
const TopSearch = require("../models/TopSearch");
exports.fetchHighlights = async (req, res) => {
  try {
    const highlight = await Highlight.find({}).exec();
    res.status(200).json(highlight);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchTopRatedProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ rating: -1 }) // Sorting in descending order by rating
      .limit(10); // Limiting the results to the top 10

    console.log("Top rated products:", products);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching top rated products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchTopCostlyProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ price: -1 }) // Sorting in descending order by price
      .limit(10); // Limiting the results to the top 10 expensive products

    console.log("Top costly products:", products);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching top costly products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchTopCheapestProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ price: 1 }) // Sorting in descending order by price
      .limit(10); // Limiting the results to the top 10 expensive products

    console.log("Top costly products:", products);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching top costly products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createHighlights = async (req, res) => {
  const highlight = new Highlight(req.body);
  try {
    const doc = await highlight.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchTopSearch = async (req, res) => {
  try {
    const topresult = await TopSearch.find({}).exec();
    console.log(topresult);
    res.status(200).json(topresult);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createTopSearch = async (req, res) => {
  const topresult = new TopSearch(req.body);
  try {
    const doc = await topresult.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateTopSearch = async (req, res) => {
  const { id } = req.params;
  try {
    const topresult = await TopSearch.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(topresult);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.deleteHighlight = async (req, res) => {
  const { id } = req.params;
  try {
    const highlight = await Highlight.findByIdAndDelete(id);
    res.status(200).json(highlight);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateHighlight = async (req, res) => {
  const { id } = req.params;
  try {
    const highlight = await Highlight.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(highlight);
  } catch (err) {
    res.status(400).json(err);
  }
};
