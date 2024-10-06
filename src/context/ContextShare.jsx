import React, { createContext, useState } from "react";

export const addProjectResponseContext = createContext();
export const editProjectResponseContext = createContext();

function ContextShare({ children }) {
  //children is predefined probs name used to share data between componenets
  //create a state that need to be shared;

  const [addProjectResponse, setAddProjectResponse] = useState([]);
  const [editProjectResponse, setEditProjectResponse] = useState([]);

  return (
    <>
      <addProjectResponseContext.Provider
        value={{ addProjectResponse, setAddProjectResponse }}
      >

        <editProjectResponseContext.Provider
          value={{ editProjectResponse, setEditProjectResponse }}
        >
          {children}
          
        </editProjectResponseContext.Provider>


      </addProjectResponseContext.Provider>
    </>
  );
}

export default ContextShare;
