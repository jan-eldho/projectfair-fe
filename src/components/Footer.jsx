import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center bg-success p-3'>

<div className='footer d-flex align-items-center justify-content-evenly'>
  <div style={{width:'400px'}}>
    <h5 className='text-style' style={{color:'white'}}><i class="fa-brands fa-stack-overflow me-3"></i> Project Fair
    </h5>
    <p className='text-style' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore laudantium voluptatibus consequatur veniam illum maxime necessitatibus voluptate veritatis, dolore commodi assumenda doloribus modi soluta culpa ducimus incidunt inventore voluptatum reprehenderit.</p>
  </div>
  <div className='d-flex flex-column ms-5'>
  <h4 className='text-style'>Links</h4>
 <Link to='/' style={{textDecoration:"none",color:'black'}}>
 Home
 </Link>
 <Link to='/dashboard' style={{textDecoration:"none",color:'black'}}>
 Dashboard
 </Link>
 <Link to='/projects' style={{textDecoration:"none",color:'black'}}>
Projects
 </Link>
  </div>
  <div className='d-flex flex-column ms-5'>
    <h4 className='text-style'>Guides</h4>
    <Link to='https://react.dev/' target='_blank' style={{textDecoration:"none",color:'black'}}>
React
 </Link>
 <Link to='https://react-bootstrap.netlify.app/' target='_blank' style={{textDecoration:"none",color:'black'}}>
 React Bootstrap
 </Link>
 <Link to='https://www.npmjs.com/package/json-server' target='_blank' style={{textDecoration:"none",color:'black'}}>
Json Server
 </Link>
  </div>
  <div className='d-flex flex-column ms-5'>
    <h4 className='text-style'>Contact US</h4>
    <div className='d-flex'>
      <input type="text" name='' id='' className='form-control' placeholder='Enter Your Email Id' />
      <button className='btn btn-warning ms-2'>SUBSCRIBE</button>
    </div>
    <div className='d-flex justify-content-evenly align-items-center mt-3'> 
      <Link style={{textDecoration:"none",color:"white"}} className='text-style' >
      <i class="fa-brands fa-instagram fa-2x"></i>
      </Link>
      <Link style={{textDecoration:"none",color:"white"}}>
      <i class="fa-brands fa-facebook fa-2x"></i>
      </Link>
      <Link style={{textDecoration:"none",color:"white"}}>
      <i class="fa-brands fa-x-twitter fa-2x"></i>
      </Link>
      <Link style={{textDecoration:"none",color:"white"}}>
      <i class="fa-brands fa-reddit fa-2x"></i>
      </Link>
      </div>
  </div>
</div>


</div>
    </>
  )
}

export default Footer