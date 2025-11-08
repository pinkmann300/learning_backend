import express from "express";  

const app = express(); 
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
})

app.get("/", (req, res) => {
    console.log(req.rawHeaders); 
    res.send(`Hello world`); 
})

app.get("/about", (req , res) => {
    res.send(`Hello about`);
})

