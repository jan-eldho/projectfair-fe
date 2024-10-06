import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import { getAllProjectApi } from "../services/allApi";
import { Link } from "react-router-dom";

function Project() {
  const [allProjects, setAllProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isToken, setIsToken] = useState(false)

  // Function to fetch all projects from the API
  const getAllProject = async () => {
    console.log("Search key:", searchKey);

    if (sessionStorage.getItem("token")) {
      try {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        const response = await getAllProjectApi(reqHeader, searchKey);
        console.log("User Project", response);
        setAllProjects(response.data.allproject);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllProject();
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or re-render
  }, [searchKey]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
        setIsToken(true)
    }
}, [])

  return (
    <>
      <Header />
      <div className="container-fluid">
        <h3 className="text-center mt-5">All Projects</h3>
      </div>
      {
        isToken?
        <div>
 <div className="row my-4">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search By Technology"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <span className="input-group-text">
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="container row my-5 ms-5">
        
          {allProjects.length > 0 ? (
            allProjects.map((item) => (
              <div className="col-md-4 mt-3">
              <ProjectCard project={item} key={item.id} />
              </div>
            ))
          ) : (
            <p>No project added</p>
          )}
        
      </div>
        </div>:
          <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Please_log_in_image.png" alt="" height="300px" width="400px" />

          <p className='m-5'> Please
              <Link className='text-danger ms-3' to={'/login'} style={{ textDecoration: 'none', color: 'blue' }} >Login</Link> To View All projects
          </p>
          
      </div>

      }

     
    </>
  );
}

export default Project;
