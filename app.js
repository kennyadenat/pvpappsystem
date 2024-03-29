const compression = require("compression");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const session = require("express-session");
var cookieParser = require("cookie-parser");

var logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");
var API_PREFIX = "/api/v0001";

var app = express();
app.use(compression());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("*", cors());
app.use(API_PREFIX, routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
