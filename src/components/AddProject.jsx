import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { addProjectApi } from "../services/allApi";
import { addProjectResponseContext } from "../context/ContextShare";

function AddProject() {
  const [show, setShow] = useState(false);
  const [token,setToken]=useState("");
  
  //useContext() hooks used to acess state created inside contextshare
  const {addProjectResponse, setAddProjectResponse}=useContext(addProjectResponseContext);

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
      setToken(sessionStorage.getItem("token"))
    }
    

  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails,setProjectDetails]=useState({
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''

  })
  //state showing previewImage
  const [preview,setPreview]=useState("")
  useEffect(()=>{

    console.log("project details");
    console.log(projectDetails);
    if(projectDetails.projectImage)
    {
      // to create image url for preview URL.createObjectURL('image url')
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
    

  },[projectDetails.projectImage])

  const handleAddProject=async(e)=>{
    e.preventDefault();
    const {title,language,github,website,overview,projectImage}=projectDetails;
    if(!title || !language || !github || !website || !overview || !projectImage)
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
      reBody.append("projectImage",projectImage)

      //here content type we are passing is multipart form data,so specfic req header needed
      const reqHeader={
        'Content-Type':'multipart/form-data',
        "Authorization":`Bearer ${token}`
      }
      const result=await addProjectApi(reBody,reqHeader)
      if(result.status === 201)
      {
        setAddProjectResponse(result.data)
        //context used to set value

        toast.success(`${title} uploaded Successfully`)

        setProjectDetails({
          title:'',
          language:'',
          github:'',
          website:'',
          overview:'',
          projectImage:''
        })
        setPreview("") //after adding project we need to clear image also
        handleClose()
        
      }else if(result.status === 409)
      {

        toast.warning(`${title} Already Existing`)
      }
      else{
        toast.error(`${title} upload Failed`)
      }
    }
  }

  const handleClose1=()=>{
        handleClose()
      setProjectDetails({
          title:'',
          language:'',
          github:'',
          website:'',
          overview:'',
          projectImage:''
        })
       setPreview("")
  }
 
  
  
  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        Add Project
      </button>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Add Project</Modal.Title>
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
                  src={preview? preview : "data:image/png;base64,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"}
                  alt="upload image"
                  className="w-100"
                  style={{ cursor: "pointer" }}
                />
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Project Title"
                className="form-control mb-3"
                value={projectDetails.title}
                onChange={(e)=>setProjectDetails({...projectDetails, title: e.target.value})}
              />

              <input
                type="text"
                placeholder="Languages Used"
                className="form-control mb-3"
                value={projectDetails.language}
                onChange={(e)=>setProjectDetails({...projectDetails, language: e.target.value})}
              />

              <input
                type="text"
                placeholder="Github-link"
                className="form-control mb-3"
                value={projectDetails.github}
                onChange={(e)=>setProjectDetails({...projectDetails, github: e.target.value})}
              />
              <input
                type="text"
                placeholder="Website-link"
                className="form-control mb-3"
                value={projectDetails.website}
                onChange={(e)=>setProjectDetails({...projectDetails, website: e.target.value})}
              />
              <textarea
                placeholder="Project Overview"
                rows={4}
                className="form-control mb-3"
                value={projectDetails.overview}
                onChange={(e)=>setProjectDetails({...projectDetails, overview: e.target.value})}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            CANCEL
          </Button>
          <Button variant="success"  onClick={handleAddProject}>
           ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
