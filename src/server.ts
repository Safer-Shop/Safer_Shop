import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { v1 } from "@api";
import { requestLogger } from "@core";
// import { requestLogger, swaggerDocs } from '@core'

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../static")));
// app.use('*.css', (req, res, next) => {
// 	res.set('Content-Type', 'text/css')
// 	next()
// })

app.use(requestLogger);

app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use("/api/v1", v1);

// app.listen(port, () => {
//   console.log(`Server is running. Host: http://localhost:${port}`);
//   swaggerDocs(app, +port);
// });
app.listen(port, () => {
  console.log(`Server is running. Host: http://localhost:${port}`);
});
