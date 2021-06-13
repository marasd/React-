import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
function AddInstructor() {
  let history = useHistory();
  const [genderError,setGenderError]=useState("Gender is required");
  const [FirstNameError,setFirstNameError]=useState("FirstName is required");
  const [LastNameError,setLastNameError]=useState("LastName is required");
  const [emailError,setEmailError]=useState("Email is required");
  const [dateofbirthError,setDateOfBirthError]=useState("DateOfBirth is required");
  const [hobbiesError,setHobbiesError]=useState("hobbies is required");
  const [BioError,setBioError]=useState("Bio is required");
  const [LinkedinError,setLinkedinError]=useState("Linkedin is required");
  const [instructors,setInstructors]=useState({
    gender:"",
    FirstName:"",
    LastName:"",
    email:"",
    dob:"",
    bio:"",
    hobbies:"",
    linkedin:""
  })
  function validation(newData){
    
    if (newData.gender===""){
      setGenderError('Gender is required')
    }
    else if(/[`!@#$%^&*=[\]{};':"\\|,.<>/?~]/.test(newData.gender)){
      setGenderError('invalid characters')
    }
    else{
      setGenderError('')
    }
    //GenderValidation
    if (newData.FirstName===""){
      setFirstNameError('FirstName is required')
    }
    else if(/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/.test(newData.FirstName)){
      setFirstNameError('invalid characters')
    }
    else{
      setFirstNameError('')
    }
    //FirstNameValidation
    if (newData.LastName===""){
      setLastNameError('LastName is required')
    } else if(/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/.test(newData.LastName)){
      setLastNameError('invalid characters')
    }
     else{
      setLastNameError('')
    }
    //LastNameValidation
    
    if (newData.dob===""){
      setDateOfBirthError('startDate is required')
    }
    
    else if(newData.dob.length !== 10 || (!/^[0-9-]+$/.test(newData.dob))){
        setDateOfBirthError("Date must contain at least 10 characters")
    }
    else{
      setDateOfBirthError("")
    }
    
    if (newData.bio===""){
      setBioError('bio is required')
    }
    else if(/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/.test(newData.bio)){
      setBioError('invalid characters')
    }
    else{
      setBioError('')
    }
    //BioValidation
    if (newData.hobbies===""){
      setHobbiesError('hobbies is required')
    }
    else{
      setHobbiesError("")
    }
    //HobbiesValidation
    if (newData.linkedin===""){
      setLinkedinError('Linkedin is required')
    }
    else{
      setLinkedinError('')
    }
    //LinkedinValidation
    if (newData.email===""){
      setEmailError('Email is required')
    }
    else{
      setEmailError('')
    }
  }

  function handle(e){
    const newData={...instructors}
      newData[e.target.id]=e.target.value
      validation(newData)
      setInstructors(newData)

      console.log(newData)
  }
  function submit(e){
      
    e.preventDefault();
    
    axios.post('http://localhost:3001/instructors',{
      gender:instructors.gender,
      name:{first:instructors.FirstName,
        last:instructors.LastName},
      email:instructors.email,
      dob:instructors.dob,
      bio:instructors.bio,
      hobbies:[instructors.hobbies],
      linkedin:instructors.linkedin
  }).then((resp) => {
    if (resp.status === 201) {
      history.push("/");
    }
  });

   
   
   
  }
  return (
    <div className="bg-light border rounded mt-3">
      <div className=" col-11 container-fluid mt-5 mx-auto">
        <h1>Add Instructor</h1>

        <form onSubmit={(e) => submit(e)}>
          <div className="form-group">
            <label htmlFor="gender" className="my-1">
              Gender:
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={instructors.gender}
              placeholder="Gender"
              onChange={(e) => handle(e)}
            ></input>
            <div className="text-danger">
              {genderError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="FirstName" className="my-1">
             FirstName:
            </label>
            <input
              type="text"
              className="form-control"
              id="FirstName"
              placeholder="Firstname"
              value={instructors.FirstName}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {FirstNameError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="LastName" className="my-1">
              LastName
            </label>
            <input
              type="text"
              className="form-control"
              id="LastName"
              placeholder="LastName"
              value={instructors.LastName}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {LastNameError}
            </div>
          </div>
          <div className="form-group ">
            <label className="my-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={instructors.email}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {emailError}
            </div>
          </div>
          <hr></hr>
          <div className="form-group ">
            <label className="my-1" htmlFor="dob">
              dob
            </label>
            <input
              type="text"
              className="form-control"
              id="dob"
              placeholder="dob"
              value={instructors.dob}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {dateofbirthError}
            </div>
          </div>
          <div className="form-group ">
            <label className="my-1" htmlFor="bio">
              bio
            </label>
            <input
              type="text"
              className="form-control"
              id="bio"
              placeholder="bio"
              value={instructors.bio}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {BioError}
            </div>
          </div>
          <hr></hr>
          <div className="form-group my-2">
            <label htmlFor="hobbies">Hobbies</label>
            <input
              className="form-control"
              id="hobbies"
              placeholder="hobbies"
              value={instructors.hobbies}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {hobbiesError}
            </div>
          </div>
          <hr></hr>
          <div className="form-group ">
            <label className="my-1" htmlFor="linkedin">
              linkedin
            </label>
            <input
              type="text"
              className="form-control"
              id="linkedin"
              placeholder="linkedin"
              value={instructors.linkedin}
              onChange={(e) => handle(e)}
            ></input>
             <div className="text-danger">
              {LinkedinError}
            </div>
          </div>
          <hr></hr>
          <div
            style={{ height: "60px" }}
            className="py-2 px-4 justify-content-end mb-5"
          >
            <button
              style={{ float: "right" }}
              type="submit"
              className="btn btn-primary text-white float-right"
              disabled={genderError!==""|| FirstNameError!=="" || LastNameError!=="" || dateofbirthError!=="" || BioError!=="" || LinkedinError!=="" || hobbiesError!=="" || emailError!==""}
            >
              Add Instructor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  }
export default AddInstructor;
