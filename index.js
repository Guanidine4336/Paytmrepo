// const express = require("express");
// const cors = require("cors"); // Corrected typo here

// const app = express();

// app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
// app.use(express.json()); // Parse incoming JSON requests

// const mainRouter = require("./routes/index"); // Import the main router for routing

// app.use("/api/v1", mainRouter); // Use the main router for all routes starting with /api/v1

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

// // Sample routes:
// // /api/v1/user/signup
// // /api/v1/user/signin
// // /api/v1/user/changePassword
// // /api/v1/account/transferMoney
// // /api/v1/account/balance


const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });