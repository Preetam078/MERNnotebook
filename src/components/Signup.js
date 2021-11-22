import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {

    let navigate = useNavigate();

const [credential, setCredential] = useState({name:"", email:"", password:""})
    
const host = "http://localhost:5000"
const handleSubmit = async (e) => {
     
     e.preventDefault();
     const {name, email, password} = credential
     const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}) 
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
         // we have to redirect to the notes page if the success is true 
         localStorage.setItem('token',json.authtoken)
         navigate('/')

      }
      else{
          alert("Invalid Credentials")
      }

}

const handleChange = (e) => {
    setCredential({...credential,[e.target.name]:e.target.value})
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credential.name}
            aria-describedby="emailHelp"
            placeholder="Enter your Name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
            minLength={5}
            value={credential.email}
            placeholder="Enter your Email"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="passowrd">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
