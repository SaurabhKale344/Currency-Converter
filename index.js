import express from "express";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));

const API_KEY = process.env.API_KEY;

app.get("/",  (req,res)  =>{

    res.render("index.ejs");
});

app.get("/convert", async (req,res) =>{
  const fromCurrency = req.query.fromCurrency;

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/a36faa18cdafb26c8e8a87f9/latest/${fromCurrency}`);
    const data = response.data;
  
    res.json(data);
} catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).json({ error: "Failed to fetch exchange rates" });
}
});

app.listen(port,() =>{
    console.log("server running on port 3000");
});