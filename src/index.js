const express = require("express");
const { responseError } = require("./shared/handleError");
const app = express();
const cors = require("cors");
app.use(cors());
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://counter-strike-five.vercel.app"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     " GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
//routes
app.use(require("./routes"));

app.get("*", (req, res, next) => {
  return next(responseError("404 not found", 404));
});

//middlewares handle error response
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 3300, () => {
  console.log("listening on port 3300");
});
