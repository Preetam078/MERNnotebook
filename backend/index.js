const connectToMongo = require("./db")
const express = require("express")

connectToMongo();
const app = express();
const port = 5000;


//this is the middleware use for the req.body json acceptance
app.use(express.json())


//available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))



app.listen(port,()=>{
   console.log(`Inotebook app Backend listening at http://localhost:${port}`);
})