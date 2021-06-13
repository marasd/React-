import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AddCourse() {
  
  let history = useHistory();
  const [checked, setChecked] = useState(false);
  const [checkName1, setCheckName1] = useState("");
  const [checkName2, setCheckName2] = useState("");
  const [titleError,setTitleError]=useState("title is required");
  const [durationError,setDurationError]=useState("duration is required");
  const [imagePathError,setImagePathError]=useState("imagePathError is required");
  const [descriptionError,setDescriptionError]=useState("description is required");
  const [startDateError,setStartDateError]=useState("startDate is required");
  const [endDateError,setEndDateError]=useState("endDate is required");
  const [normalPriceError,setNormalPriceError]=useState("NormalPrice is required");
  const [earlyPriceError,setEarlyPriceError]=useState("EarlyPrice is required");
  
  // const []=useState("");

  const [courses, setData] = useState({
    title: "",
    duration: "",
    imagePath: "",
    bookable: "",
    checkName1: "",
    checkName2: "",
    description: "",
    startDate: "",
    endDate: "",
    earlyPrice: "",
    normalPrice: "",
  });
 
  function validation(newData){
    
    if (newData.title===""){
      setTitleError('title is required')
    }
    else if(/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/.test(newData.title)){
      setTitleError('invalid characters')
    }
    else{
      setTitleError('')
    }
    //TitleValidation
    if (newData.duration===""){
      setDurationError('duration is required')
    }
    else if(/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/.test(newData.duration)){
      setDurationError('invalid characters')
    }
    else{
      setDurationError('')
    }
     //DurationValidation
    if (newData.imagePath===""){
      setImagePathError('imagePath is required')
    } else if(/[`!@#$%^&*()+=[\]{};':"\\|,<>?~]/.test(newData.imagePath)){
      setImagePathError('invalid characters')
    }
     else{
      setImagePathError('')
    }
     //ImagePathValidation
    if (newData.description===""){
      setDescriptionError('Description is required')
    }
    else if(/[`@#$%^*_+\-=[\]{}"\\|~]/.test(newData.description)){
      setDescriptionError('invalid characters')
    }
    else{
      setDescriptionError('')
    }
     //DescriptionValidation
    if (newData.startDate===""){
      setStartDateError('startDate is required')
    }
    
    else if(newData.startDate.length !== 10 || (!/^[0-9-]+$/.test(newData.startDate))){
        setStartDateError("Date must contain at least 10 characters")
    }
    else{
      setStartDateError("")
    }
    
     //StartDateValidation
    if (newData.endDate===""){
      setEndDateError('endDate is required')
    }
    else if(newData.endDate.length !== 10 || (!/^[0-9-]+$/.test(newData.endDate))){
      setEndDateError('Date must contain at least 10 characters')
    }
    else{
      setEndDateError("")
    }
     //EndDateValidation
    if (newData.normalPrice===""){
      setNormalPriceError('NormalPrice is required')
    }
    else{
      setNormalPriceError('')
    }
     //NormalPriceValidation
    if (newData.earlyPrice===""){
      setEarlyPriceError('EarlyPrice is required')
    }
    else{
      setEarlyPriceError('')
    }
  }
  function handle(e) {
    const newData = { ...courses };
    newData[e.target.id] = e.target.value;
    console.log(newData.startDate)
    setData(newData);
    validation(newData)
    console.log(newData);
  }

  function submit(e) {
   e.preventDefault();
   
     axios
      .post("http://localhost:3001/courses", {
        title: courses.title,
        duration: courses.duration,
        imagePath: courses.imagePath,
        open: (courses.bookable = checked),
        instructors: [
          (courses.checkName1 = checkName1),
          (courses.checkName2 = checkName2),
        ],
        description: courses.description,
        dates: { start_date: courses.startDate, end_date: courses.endDate },
        price: { early_bird: courses.earlyPrice, normal: courses.normalPrice },
      })
      .then((resp) => {
        if (resp.status === 201) {
          history.push("/");
        }
      });
  }
  const checkInstructor1 = (e) => {
    if (e.currentTarget.checked) {
      setCheckName1("01");
    } else {
      setCheckName1("");
    }
  };
 const checkInstructor2 = (e) => {
    if (e.currentTarget.checked) {
      setCheckName2("02");
    } else {
      setCheckName2("");
    }
  };
 
  return (
    <div className="bg-light border rounded mt-3">
      <div className=" col-11 container-fluid mt-5 mx-auto">
        <h1>Add Course</h1>

        <form onSubmit={(e) => submit(e)}>
          <div className="form-group">
            <label htmlFor="title" className="my-1">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={courses.title}
              placeholder="Title"
              onChange={(e) => handle(e)}
            ></input>
            <div className="text-danger">
            {titleError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="duration" className="my-1">
              Duration:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              placeholder="Duration"
              value={courses.duration}
              onChange={(e) => handle(e)}
            ></input>
            <div className="text-danger">
           {durationError}
           </div>
          </div>
          <div className="form-group">
            <label htmlFor="imagePath" className="my-1">
              Image path:
            </label>
            <input
              type="text"
              className="form-control"
              id="imagePath"
              placeholder="Image path"
              value={courses.imagePath}
              onChange={(e) => handle(e)}
            ></input>
            <div className="text-danger">
            {imagePathError}
            </div>
          </div>
          <div className="form-check my-2">
            <label className="form-check-label" htmlFor="bookable">
              Bookable
            </label>
            <input
              className="form-check-input "
              type="checkbox"
              value={courses.bookable}
              id="bookable"
              onChange={(e) => setChecked(e.target.checked)}
            ></input>
          </div>
          <hr></hr>
          <h3>Instructors</h3>
          <div className="form-check">
            <label className="form-check-label" htmlFor="checkName1">
              Instructor 1
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              value={courses.checkName1}
              id="checkName1"
              onChange={checkInstructor1}
            ></input>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="checkName2">
              Instructor 2
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              value={courses.checkName2}
              id="checkName2"
              onChange={checkInstructor2}
            ></input>
          </div>
          <hr></hr>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={courses.description}
              onChange={(e) => handle(e)}
            ></textarea>
            <div className="text-danger">
            {descriptionError}
            </div>
          </div>
          <hr></hr>
          <h3>Dates</h3>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              placeholder="Start date"
              value={courses.startDate}
              onChange={(e) => handle(e)}
              pattern="(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3}"
              required
            ></input>
            <div className="text-danger">
            {startDateError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              className="form-control"
              id="endDate"
              placeholder="End date"
              value={courses.endDate}
              onChange={(e) => handle(e)}
              pattern="(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3}"
              required
            ></input>
            <div className="text-danger">
            {endDateError}
            </div>
          </div>
          <hr></hr>
          <h3>Price</h3>
          <div className="form-group">
            <label htmlFor="earlyPrice">Early Bird:</label>
            <input
              type="number"
              className="form-control"
              id="earlyPrice"
              placeholder="0"
              value={courses.earlyPrice}
              onChange={(e) => handle(e)}
            ></input>
            <div className="text-danger">
            {earlyPriceError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="normalPrice">Normal price:</label>
            <input
              type="number"
              className="form-control"
              id="normalPrice"
              placeholder="0"
              value={courses.normalPrice}
              onChange={(e) => handle(e)}
            ></input>
           <div className="text-danger">
            {normalPriceError}
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
              disabled={titleError!==""|| descriptionError!=="" || imagePathError!=="" || durationError!=="" || endDateError!=="" || startDateError!=="" || normalPriceError!=="" || earlyPriceError!==""} 
              className="btn btn-primary text-white float-right"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(AddCourse);
