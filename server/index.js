const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello world! chutiye 🤮🤢👄🫦");
});

app.use("/script", require("./routes/script"));

app.listen(8000, ()=>console.log("Server is running on localhost:8000"));