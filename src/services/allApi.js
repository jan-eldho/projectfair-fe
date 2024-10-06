import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"

// register API
export const registerApi = async(userDetails)=>{
    return await commonApi("POST",`${BASE_URL}/user/register` ,userDetails,"")
}

//login Api
export const loginApi = async(userDetails)=>{
    return await commonApi("POST",`${BASE_URL}/user/login`,userDetails,"")
}
//add project api
export const addProjectApi = async(projectDetails,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/project/addproject`,projectDetails,reqHeader)
}
//get home projects 3 nos api

export const getHomeProjectApi = async()=>{
    return await commonApi("GET",`${BASE_URL}/project/homeproject`,"","")
}
//get all projects 

export const getAllProjectApi = async(reqHeader,searchKey)=>{
    return await commonApi("GET",`${BASE_URL}/project/allproject?search=${searchKey}`,"",reqHeader)
}

//get user projects 

export const getUserProjectApi = async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/project/userproject`,"",reqHeader)
}

//update project
export const editUserProjectApi = async (projectId, reqHeader, reqBody) => {
    return await commonApi("PUT", `${BASE_URL}/project/editproject/${projectId}`, reqBody, reqHeader);
  };
  
  //delete project
  export const deleteUserProjectApi = async(projectId, reqHeader)=>{
    return await commonApi("DELETE",`${BASE_URL}/project/deleteproject/${projectId}`,{}, reqHeader);
  }