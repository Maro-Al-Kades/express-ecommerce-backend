const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");

const dbConnection = require("./database/db");

// routes
const categoryRoute = require("./routes/categories.routes");
const subCategoryRoute = require("./routes/subCategory.routes");
const brandRoute = require("./routes/brands.routes");
const productRoute = require("./routes/products.routes");

// errors
const ApiError = require("./errors/apiError");
const globalError = require("./middlewares/errors.middleware");

dotenv.config({ path: "config.env" });

const app = express();
dbConnection();

//! Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ➡️  ${process.env.NODE_ENV}`.yellow.inverse);
}

//! Mount-Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all("*", (req, res, next) => {
  next(
    new ApiError(`"Cannot find this route ${req.originalUrl}"`.red.inverse, 400)
  );
});

//! Global Errors handling middlewares
app.use(globalError);

//! Server Listening
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`"App Running ON PORT ${PORT} ✅"`.white.inverse);
});

//! Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(
    `Unhandled Rejection at: ${err.name} | ${err.message} ⛔`.red.inverse
  );
  server.close(() => {
    console.error(`Shutting down... ❌ `);
    process.exit(1);
  });
});
