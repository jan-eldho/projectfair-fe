import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteUserProjectApi, getUserProjectApi } from '../services/allApi'
import { useContext } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { toast } from 'react-toastify'

function MyProject() {
  const [userProject, setuserProject]=useState([])

  const {addProjectResponse, setAddProjectResponse}=useContext(addProjectResponseContext)
  //context
  const {editProjectResponse, setEditProjectResponse} =useContext(editProjectResponseContext)

  const getUserProjects =async()=>{
    const token =sessionStorage.getItem('token')
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }
  const result = await getUserProjectApi(reqHeader);
  console.log("User project");
  console.log(result)
  setuserProject(result.data.alluserproject)

  }
  useEffect(()=>{
    getUserProjects();
  },[addProjectResponse,editProjectResponse])

  const handleDelete=async(id)=>{
    // e.preventDefalt();
    const token =sessionStorage.getItem("token");
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }
  const result = await deleteUserProjectApi(id,reqHeader);
  console.log("delete response");
  console.log(result);
  if(result.status===200)
  {
    toast.success("Project deleted sucessfully")
    getUserProjects();
  }
  else{
    toast.error("Something went wrong")
  }
  


  }

  return (
    <>
    <div className='shadow p-5 mb-5'>
        <div className='d-flex mt-4'>
            <h5 className='text-success me-auto'>My Projects</h5>
            {/* add project button componenet */}
            <AddProject />
        </div>
        {
          userProject?.length>0?
          userProject.map((item)=>(
            <div className='p-3 mt-4 rounded-2 d-flex bg-light'>
         
            <h5>{item.title}</h5>

        <div className='d-flex ms-auto align-items-center'>
            <EditProject project={item}/>
            <Link to={item.website} target='_blank' className='ms-3 text-success'>
            <i class="fa-solid fa-link"></i>
            </Link>
            <Link to={item.github} target='_blank' className='ms-3 text-warning'>
            <i class="fa-brands fa-github"></i>
            </Link>
            <button className='btn' onClick={(e)=>handleDelete(item._id)}>
            <i class="fa-solid fa-trash text-danger"></i>
            </button>
            {/* <Link >
          
            </Link> */}
        </div>
        </div>

          )):
          <p>no items found</p>

        }
      

    </div>
    </>
  )
}

export default MyProject