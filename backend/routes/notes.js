const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


//ROUTE:1 get all the notes using GET "/api/auth/fetchallnotes" require authentication
router.get("/fetchallnotes", fetchuser, async(req,res)=>{

  try {
       
       const notes = await Notes.find({user:req.user.id})
       res.json({notes});
  } catch (error) {

     console.error(error.message);
     res.status(500).send("Internal server error occured");
       
  }   
})

//ROUTE:2 add new notes using POST "/api/auth/addnotes" require authentication
router.post("/addnotes", fetchuser,[
  
     body("title", "enter a valid title").isLength({ min: 5 }),
     body("description", "Description must be of at least 8 characters").isLength({min: 8}),
     

], async(req,res)=>{
 
     try {
          const { title, description, tag} = req.body;
     
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
     
          const note = new Notes({
         title, description,tag, user:req.user.id
          })
          const savedNote = await note.save();
          
          res.json(savedNote);
          
     } catch (error) {  
      console.error(error.message);
      res.status(500).send("Internal server error occured");
     }
})


//ROUTE:3 update existing notes using POST "/api/auth/updatenote" require authentication
router.put("/updatenotes/:id", fetchuser, async(req,res)=>{
 
    const {title, description, tag} = req.body;

    //create a newnote
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}

    if(note.user.toString()!=  req.user.id){
         return res.status(401).send("not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note);

})



module.exports = router 