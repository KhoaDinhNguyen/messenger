const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const mongoose = require("mongoose");

const graphQLSchema = require("./graphql/schema");
const graphQLResolver = require("./graphql/resolver");
const { uploadToS3, getImageFromS3 } = require("./s3");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fieldSize: "1MB" } });

app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.post("/uploadImage", upload.single("image"), async (req, res) => {
  // console.log("who call this");
  // console.log(req.file);
  // console.log(req.body.userid);
  // console.log(new Date().getTime());
  try {
    const fileName = await uploadToS3({
      file: req.file,
      userid: req.body.userid,
    });
    //console.log(fileName);
    const fileURL = await getImageFromS3({
      filename: fileName,
    });
    // console.log(url);
    res.status(200).send({
      message: "File uploaded successfully",
      fileName: fileName,
      fileURL: fileURL,
    });
  } catch (err) {
    console.log(err);
  }
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
      console.log(err);
      const message = err.message || "An error occured";
      const data = err.originalError.data || "";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then((response) => {
    const server = app.listen(port, () => {
      console.log(`Server at ${port}`);
    });
    const io = require("./socket").init(server);
    const Sockets = require("./models/socket");
    io.on("connect", (socket) => {
      if (
        !(Sockets.findSocketByUserId(socket.handshake.query.userid) === null)
      ) {
        Sockets.deleteSocketByUserId(socket.handshake.query.userid);
      }
      console.log(`${socket.handshake.query.userid} connect`);
      console.log(socket.id);
      Sockets.insertSocket(socket.handshake.query.userid, socket.id);
      //Sockets.findSocketByUserId("");
      socket.on("disconnect", () => {
        console.log(`${socket.handshake.query.userid} disconnect`);
        Sockets.deleteSocketByUserId(socket.handshake.query.userid);
        socket.disconnect(true);
      });
    });
  })
  .catch((err) => {
    console.log("Something wrong with database");
  });
