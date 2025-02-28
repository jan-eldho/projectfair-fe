import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({register}) {
  const registerForm= register? true:false;
  const navigate= useNavigate() //used to redirect a prticulatr path

  const [userData,setUserData]=useState({

    username:"",
    email:"",
    password:""
  })
const handleRegister =async(e)=>{
e.preventDefault();
const {username,email,password} =userData;
if(!username || !email || !password)
{
  toast.warning("Please fill the form Completetly")
}else{
  // alert(`${username}, ${email} ,${password}`)
  // console.log(userData);
  const result= await registerApi(userData)
  console.log(result);
  if(result.status===200)
  {
    setUserData({
      username:"",
      email:"",
      password:""
    })
    toast.success(`${username} Register Successfully`)
    //navigate to login page
    navigate('/login')

  }else if(result.status === 400)
  {
    toast.error(result.response.data.message)

  }
  else{
    toast.error("!Something Happened...")
  }
  
}
}

//login
const handleLogin =async(e)=>{
  e.preventDefault();
  const {email,password}=userData;
  if(!email || !password){
    toast.warning("Please fill the form Completetly")
  }
  else{

    const result= await loginApi(userData)
    console.log("login result");
    console.log(result);
    if(result.status== 200)
    {
      sessionStorage.setItem("loggedUser",JSON.stringify(result.data.existData));
      sessionStorage.setItem('token',result.data.token);
      setUserData({
        username:"",
        email:"",
        password:""
      })
      toast.success("Logged in Succefully")
      navigate('/')
    }
    else if(result.status== 401){
      toast.error("Inavlaid Email or Password")

    }
    else{
      toast.error("Something Went Wrong...")
    }
    
    
    
    
  }

}

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container w-75">
          <h5>
            <Link to={'/'} className="text-warning" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-arrow-left me-3"></i>Back to Home
            </Link>
          </h5>
          <div className="bg-primary">
            <Row>
              <Col md={6} className="p-4 d-flex justify-content-center align-items-center">
              <img src="data:image/png;base64,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" width='70%' alt="image" />

              </Col>
              <Col md={6} className="p-5 d-flex justify-content-center">
              <form className="w-100">
                <h5 className="text-center">
                  <i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h5>
                {
                  registerForm ?
                  <>
                   <h6 className="text-center mb-3 mt-3">Sign up to Your Account</h6> 
                   <input type="text" name="" id="" placeholder="Name" className="form-control rounded"
                   value={userData.username}
                   onChange={(e)=>setUserData({...userData, username: e.target.value})} />

                  </>
                  :
                 
                  <h6 className="text-center mb-3 mt-3">Sign into Your Account</h6>
                }
               <div className="mt-3 mb-3">
               <input type="text" name="email" id="" placeholder="Email Id" className="form-control rounded"
                 value={userData.email}  onChange={(e)=>setUserData({...userData, email: e.target.value})} />
               </div>
               <div className="mt-3 mb-3">
               <input type="password" name="password" id="" placeholder="Password"  className="form-control rounded" value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} />
               </div>
               {
                registerForm ?
                <div>
                  <button className="btn btn-warning w-100 rounded" onClick={handleRegister}>Register</button>
                  <p className="mt-3">Already a User? Click Here to <Link className="ms-2" to={'/login'} style={{textDecoration:'none',color:'yellow'}}>Login</Link></p>
                </div> :
                <div>
                  <button className="btn btn-warning w-100 rounded" onClick={handleLogin}>Login</button>
                  <p className="mt-3">Not Registered yet? Click Here to <Link className="ms-2" to={'/Register'} style={{textDecoration:'none',color:'yellow'}}>Register</Link></p>
                </div>
               }

              </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Auth;
