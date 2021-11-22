import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

const [credential, setCredential] = useState({email:"", password:""})

const host = "http://localhost:5000"
const handleSubmit = async (e) => {

     e.preventDefault();

     const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credential.email,password:credential.password}) 
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            value={credential.email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={credential.password}
          />
        </div>
    
        <button type="submit" className="btn btn-primary my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
