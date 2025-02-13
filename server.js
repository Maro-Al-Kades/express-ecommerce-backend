const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./database/db");
const categoryRoute = require("./routes/categories.routes");
const subCategoryRoute = require("./routes/subCategory.routes");
const brandRoute = require("./routes/brands.routes");
const ApiError = require("./errors/apiError");
const globalError = require("./middlewares/errors.middleware");

dotenv.config({ path: "config.env" });

const app = express();
dbConnection();

//! Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ➡️  ${process.env.NODE_ENV}`);
}

//! Mount-Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`"Cannot find this route ${req.originalUrl}"`, 400));
});

//! Global Errors handling middlewares
app.use(globalError);

//! Server Listening
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`"App Running ON PORT ${PORT} ✅"`);
});

//! Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection at: ${err.name} | ${err.message} ⛔`);
  server.close(() => {
    console.error(`Shutting down... ❌ `);
    process.exit(1);
  });
});
