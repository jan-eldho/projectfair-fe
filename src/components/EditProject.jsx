import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from '../services/baseurl';
import { toast } from 'react-toastify';
import { editUserProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {
    const [show, setShow] = useState(false);
    const [preview,setPreview] = useState("")

    //context api
    const {editProjectResponse, setEditProjectResponse} =useContext(editProjectResponseContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails]=useState({
      
      id:project._id,
      title: project.title,
      github: project.github,
      language: project.language,
      overview: project.overview,
      projectImage: "",
      website: project.website
    })
    const handleUpdate=async(e)=>{
      e.preventDefault();
      console.log("update project values")
      console.log(projectDetails);
      const {title,language,github,website,overview,projectImage,id}=projectDetails;
      if(!title || !language || !github || !website || !overview || !id)
        {
          toast.warning("Please fill the field Completetly.")
        }
        else{
           //here we are also uploading a file, so we should sent body in the form of formData
      const reBody = new FormData();
      reBody.append("title",title)
      reBody.append("language",language)
      reBody.append("github",github)
      reBody.append("website",website)
      reBody.append("overview",overview)
      preview ? reBody.append("projectImage",projectImage) :
      reBody.append("projectImage",project.projectImage)
      const token =sessionStorage.getItem("token");
      if(preview)
      {
        const reqHeader ={
          'Content-Type':'multipart/form-data',
          "Authorization":`Bearer ${token}`
        }
        const result= await editUserProjectApi(id, reqHeader, reBody);
        console.log("==== Update Project Details ====");
        console.log(result);
       

        if(result.status===200)
          {
             //context api
        setEditProjectResponse(result.data)
            handleClose()
          }
      }
      else{
        const reqHeader={
          'Content-Type':'multipart/json',
          "Authorization":`Bearer ${token}`
        }
        const result= await editUserProjectApi(id,reqHeader,reBody);
        console.log("==== Update Project Details ====");
        console.log(result);
        
        if(result.status===200)
        {
           //context api
         setEditProjectResponse(result.data)
          handleClose()
        }
      }

        }

      
    }
    useEffect(()=>{
      if(projectDetails.projectImage)
      {
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }

    },[projectDetails.projectImage])
    const handleCloseOne= async()=>{
      handleClose();
      setProjectDetails({
        id:project._id,
        title: project.title,
        github: project.github,
        language: project.language,
        overview: project.overview,
        projectImage: "",
        website: project.website

      })
      setPreview("")

    }
  return (
   <>
   <i class="fa-regular fa-pen-to-square text-primary" onClick={handleShow} style={{cursor:'pointer'}}></i>
   <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projectimg">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="projectimg"
                  onChange={(e)=>setProjectDetails({...projectDetails, projectImage: e.target.files[0]})}
                />
                <img
                  src={ preview?preview : `${BASE_URL}/uploads/${project?.projectImage}`}
                  alt="upload image"
                  className="w-100"
                  style={{ cursor: "pointer" }}
                 
                />
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text" value={projectDetails.title}
                placeholder="Project Title"
                className="form-control mb-3" 
                onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
              />

              <input
                type="text" value={projectDetails.language}
                placeholder="Languages Used"
                className="form-control mb-3"
                onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}
              />

              <input
                type="text" value={projectDetails.github}
                placeholder="Github-link"
                className="form-control mb-3"
                onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
              />
              <input
                type="text" value={projectDetails.website}
                placeholder="Website-link"
                className="form-control mb-3"
                onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
              />
              <textarea
                placeholder="Project Overview" value={projectDetails.overview}
                rows={4}
                className="form-control mb-3"
                onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseOne}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleUpdate}>
           UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default EditProject