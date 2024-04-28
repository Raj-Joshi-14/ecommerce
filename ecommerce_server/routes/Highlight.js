const express = require("express");
const {
  fetchHighlights,
  createHighlights,
  deleteHighlight,
  updateHighlight,
  fetchTopRatedProduct,
  fetchTopCostlyProducts,
  fetchTopCheapestProducts,
  createTopSearch,
  updateTopSearch,
  fetchTopSearch,
} = require("../controller/HighlightController");

const router = express.Router();
//  /brands is already added in base path
router
  .get("/", fetchHighlights)
  .get("/toprated", fetchTopRatedProduct)
  .get("/topcostly", fetchTopCostlyProducts)
  .get("/top", fetchTopSearch)
  .post("/top", createTopSearch)
  .patch("/top/:id", updateTopSearch)
  .get("/topcheapest", fetchTopCheapestProducts)
  .post("/", createHighlights)
  .delete("/:id", deleteHighlight)
  .patch("/:id", updateHighlight);

exports.router = router;
