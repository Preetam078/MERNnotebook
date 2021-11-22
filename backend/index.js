const connectToMongo = require("./db")
const express = require("express")
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())


//this is the middleware use for the req.body json acceptance
app.use(express.json())


//available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))



app.listen(port,()=>{
   console.log(`Inotebook app Backend listening at http://localhost:${port}`);
})