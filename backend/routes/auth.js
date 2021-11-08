const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")


const JWT_SECRET = "developedbypreetam"

//ROUTE:1 Create a user Using POST "/api/auth/createuser"Dosnt require authentication
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter ta valid email").isEmail(),
    body("password", "password must be atleast 8 characters").isLength({min: 8}),
  ],
  async (req, res) => {
    // if there are error that return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with same email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry user with this email already exist" });
      }

      //creating salt and hash for the password security
      const salt = await bcrypt.genSalt(10);
      const secPass =await bcrypt.hash(req.body.password,salt)

      //create new user if email address already not exist
      user = await User.create({
        name: req.body.name,
        email: req.body.email ,
        password:secPass ,
      });

      const data = {
          user:{
              id:user.id
          }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      
      
      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
)



//ROUTE:2 login a user Using POST "/api/auth/login "Dosnt require authentication

router.post("/login",[
    body("email","PLease Enter a Valid Email ID").isEmail(),
    body("password","password cannot be Blank").exists()
],async(req,res)=>{
 
     // if there are error that return bad request
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const {email, password} = req.body;

     try{
         let user = await User.findOne({email});
         if(!user){
             return res.status(400).json({error: "Please try to login with Authentical credential"});
         }

         const passwordCompare = await bcrypt.compare(password, user.password);

         if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with Authentical credential"});
         }
         const data = {
             user:{
                 id:user.id
             }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
      
         res.json({authtoken});
     }
     catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
     }
    
})




//ROUTE:3 get logged in user detail POST"api/auth/getuser"  login required
router.post("/getuser", fetchuser ,async(req,res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error occured");
}
})
module.exports = router;
