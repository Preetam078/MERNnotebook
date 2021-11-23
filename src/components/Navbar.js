import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login')

  }
  
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/"?"active":""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==="/about"?"active":""}`} to="/about">About</Link>
        </li>
       
      </ul>
     {!localStorage.getItem('token') ? <form>
      <Link role="button" className="btn btn-primary mx-4" to="/login">Login</Link>
      <Link role="button" className="btn btn-primary" to="/signup">SignUp</Link>
      </form>: <button className="btn btn-primary" onClick={handleLogout} >Logout</button>
      }
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
