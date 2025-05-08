import app from "./app.js";
import connectDB from "./data/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port :", PORT);
    // console.log(`Live Preview - http://localhost:${PORT}/`)
})