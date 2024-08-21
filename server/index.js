const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);


//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route
// app.get("/", (req, res) => {
// 	return res.json({
// 		success:true,
// 		message:'Your server is up and running....'
// 	});
// });
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
	console.log(path.join(__dirname1, "/build"));

  app.use(express.static(path.join(__dirname1, "./build")));
  app.get("*", (req, res) => {
    console.log(__dirname1)
    res.sendFile(path.resolve(__dirname1, "build", "index.html"));

  });
} else {
  app.get("/", (req, res) => {
    res.send("The api is running seccessfully");
  });
}
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})