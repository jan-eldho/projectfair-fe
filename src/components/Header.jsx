import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate =useNavigate();
  const handleLogout =async()=>{
    if (sessionStorage.getItem('token'))
    {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loggedUser')
      navigate('/')

    }
  }
  return (
    <>
       <Navbar className="bg-success">
        <Container className='p-1'>
          <Navbar.Brand ><Link to={'/'} style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-stack-overflow me-3"></i>
          Project Fair</Link>
          
          </Navbar.Brand>
          <button className='btn btn-warning' onClick={handleLogout}><i class="fa-solid fa-power-off me-2"></i>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header