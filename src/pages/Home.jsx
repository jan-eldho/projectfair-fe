import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import home_image from "../assets/project-image.jpg";
import ProjectCard from "../components/ProjectCard";
import { getHomeProjectApi } from "../services/allApi";

function Home() {
  const [isLogin,setIsLogin]=useState(false)

  const [homeProject,setHomeProject]=useState([])

  const getHomeProjectItem=async()=>{
     const result= await getHomeProjectApi();
     console.log("home projects");
     console.log(result);
     setHomeProject(result.data.homeproject)
     
     
  }

  useEffect(()=>{

    if(sessionStorage.getItem("token"))
      {
        setIsLogin(true)
      }
      getHomeProjectItem();
  },[])

  return (
    <>
      <div
        className="container-fluid bg-success p-4 mb-3 mt-3"
        style={{ width: "100%", height: "100vh" }}
      >
        <Row>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div>
              <h3 className="text-light">Project Fair</h3>
              <h6>One stop destination for many software projects</h6>
            </div>
            {
              isLogin ?
              <Link to={"/dashboard"}>
              <button className="btn btn-outline-light my-4">
                <i class="fa-solid fa-arrow-right me-2"></i>Manage Project
              </button>
            </Link> :
             <Link to={"/login"}>
             <button className="btn btn-outline-light my-4">
               <i class="fa-solid fa-arrow-right me-2"></i>Get Started
             </button>
           </Link>

            }
           
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column mt-5"
          >
            <img src={home_image} width="75%" alt="home-image" />
          </Col>
        </Row>
      </div>

      {/* Explore our projects */}
      <div className="container-fluid mb-5">
        <h2 className="text-center my-5">Explore our projects</h2>
        <marquee scrollAmount={20}>
        <div className="row">
          {
            homeProject?.length>0?
            homeProject.map((item)=>(
              <div className="col-md-4 justify-content-center d-flex p-4" style={{width:'400px'}}>
              {/* bing project card */}
              <ProjectCard project={item} />
            </div>

            )):
            <p>No project card</p>
          }
         
        
        </div>

        </marquee>
       
        <Link
          to={"/projects"}
          className="text-primary"
          style={{ textDecoration: "none" }}
        >
          <h5 className="text-center">See more projects</h5>
        </Link>
      </div>
    </>
  );
}

export default Home;
