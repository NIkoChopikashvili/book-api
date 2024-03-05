const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { globalErrorHandler } = require("./middlewares");
const { testDbConnection } = require("./config/db-setup");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const path = require("path");
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(helmet());

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", require("./routes/books.routes"));
app.use("/", require("./routes/auth.routes"));

app.use(globalErrorHandler);

app.listen(port, () => {
  try {
    console.log(`Server started on port: ${port}`);
    testDbConnection();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
