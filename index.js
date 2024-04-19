const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/dbconnection");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set the view engine to "ejs"
app.set("view engine", "ejs");

// Use the router from "./router" for handling routes
app.use("", require("./src/routers/admin_login"));
app.use("", require("./src/routers/register"));
app.use("", require("./src/routers/otp_verify"));
app.use("", require("./src/routers/view_users"));
app.use("", require("./src/routers/delete_user"));
app.use("", require("./src/routers/add_users"));
app.use("", require("./src/routers/sign_out"));
app.use("", require("./src/routers/user_status"));
app.use("", require("./src/routers/update"));
app.use("", require("./src/routers/admin_profile"));
app.use("", require("./src/routers/admin_profile_update"));
app.use("", require("./src/routers/add_product"));
app.use("", require("./src/routers/view_product"));
app.use("", require("./src/routers/update_product"));
app.use("", require("./src/routers/delete_product"));
app.use("", require("./src/routers/user_view_product"));
app.use("", require("./src/routers/buy_product"));
app.use("", require("./src/routers/add_money"));
app.use("", require("./src/routers/withdrawal"));
app.use("", require("./src/routers/view_transaction"));
app.use("", require("./src/routers/treeview"));

// Set the views directory
app.set("views", path.join(__dirname, "src/views"));

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle potential errors during server startup
app.on("error", (error) => {
  console.error(`Server startup error: ${error.message}`);
});
