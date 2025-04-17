const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const mongoose = require("mongoose");

const graphQLSchema = require("./graphql/schema");
const graphQLResolver = require("./graphql/resolver");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.all(
  "/graphql",
  createHandler({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const message = err.message || "An error occured";
      const data = err.originalError.data;
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then((response) => {
    app.listen(port, () => {
      console.log(`Server at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Something wrong with database");
  });
