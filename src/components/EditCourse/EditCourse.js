import axios from 'axios';
import React, {useEffect,useRef, useState} from 'react';
import {useHistory} from  "react-router-dom";

function EditCourse(props) {
  
  let history = useHistory();
  const inputRef = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const titleRef = useRef();
  const durationRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const discPriceRef = useRef();
  const normalPriceRef = useRef();
  const subRef=useRef();
  let counterButton=8;
  let inputvalidators=[0,0,0,0,0,0,0,0]

  const [courses, setData]=useState([{
    id:0,
    title:0,
    duration:0,
    imagePath:0,
    open:0,
    instructors:0,
    description:0,
    startDate:0,
    endDate:0,
    earlyPrice:0,
    normalPrice:0
  }])

  
  function passAllData(){
    courses[0].title=titleRef.current.value;
    courses[0].duration=durationRef.current.value;
    courses[0].imagePath=imageRef.current.value;
    courses[0].description=descriptionRef.current.value;
    courses[0].startDate=startDateRef.current.value;
    courses[0].endDate=endDateRef.current.value;
    courses[0].earlyPrice=discPriceRef.current.value;
    courses[0].normalPrice=normalPriceRef.current.value;
  }

  function submit(e){
    e.preventDefault();
    passAllData();
    console.log(courses[0].title)
    axios.put(`http://localhost:3001/courses/${courses[0].id}`,{
      title:courses[0].title,
      duration:courses[0].duration,
      imagePath:courses[0].imagePath,
      open:courses[0].open,
      instructors:courses[0].instructors,      
      description:courses[0].description,
      dates:{start_date:courses[0].startDate,
      end_date:courses[0].endDate},
      price:{
        early_bird:courses[0].earlyPrice,
        normal:courses[0].normalPrice,
      }
    })
    .then(res=>{
      console.log(res.data)
      history.push('/')
    })
  }

  useEffect(() => {

   if(props.location.course != null){
    let tempArray=[
      {
        open:props.location.course.open===true? bookableMark(true):bookableMark(false),
        checkName1:(props.location.course.instructors[0]==="01")? check(1):uncheck(1),
        checkName2:(props.location.course.instructors[1]==="02")? check(2):uncheck(2),
      }
    ]  
    console.log("For warning", tempArray)
    setData([{
      id:props.location.course.id,
      title:props.location.course.title,
      duration:props.location.course.duration,
      imagePath:props.location.course.imagePath,
      open:props.location.course.open,
      instructors:props.location.course.instructors,
      description:props.location.course.description,
      startDate:props.location.course.dates.start_date,
      endDate:props.location.course.dates.end_date,
      earlyPrice:props.location.course.price.early_bird,
      normalPrice:props.location.course.price.normal
    }]);
   }else if(JSON.parse(window.localStorage.getItem('editCourse'))!= null){
    console.log("edit course refresh")
    let dataForCheck = JSON.parse(window.localStorage.getItem('editCourse'))
    let tempArray=[
      {
        checkName1:(dataForCheck[0].instructors[0]==="01")? check(1):uncheck(1),
        checkName2:(dataForCheck[0].instructors[1]==="02")? check(2):uncheck(2),
      }
    ]  
    console.log("For warning", tempArray)
    setData(JSON.parse(window.localStorage.getItem('editCourse')));
   }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('editCourse', JSON.stringify(courses));
    // console.log("Zigo courses change",window.localStorage.getItem('editCourse'))
  }, [courses]);

  function bookableMark(isTrue){
    if(isTrue){
      document.getElementById("bookable").checked = true;
    }
    else{
      document.getElementById("bookable").checked = false;
    }
  }

  function check(id) {
    if(id===1){
      document.getElementById("checkName1").checked = true;
    }
    else{
      document.getElementById("checkName2").checked = true;
    }
  }
  
  function uncheck(id) {
    if(id===1){
      document.getElementById("checkName1").checked = false;
    }
    else{
      document.getElementById("checkName2").checked = false;
    }
  }

  function checkInstructor1(){
    let newData
    if(inputRef2.current.checked ===true){
      newData = [{...courses[0], instructors : ["01",courses[0].instructors[1]]}]
    }
    else{
      newData = [{...courses[0], instructors : [" ",courses[0].instructors[1]]}]
    }
    setData(newData)
  }

  function checkInstructor2(){
    let newData
    if(inputRef3.current.checked ===true){        
        newData = [{...courses[0], instructors : [courses[0].instructors[0],"02"]}]
    }
    else{
        newData = [{...courses[0], instructors : [courses[0].instructors[0]," "]}]
    }
    setData(newData)
  }

  function updateTitle(e){
    console.log("There was a change in title");
      let titleElement=document.getElementById("titleHelp");
      let format =/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/;
      if(titleElement!=null){
        if(format.test(titleRef.current.value)){
          let newData = [{...courses[0], title : e.target.value}]
          setData(newData)
          titleRef.current.classList.add('border');
          titleRef.current.classList.add('border-danger');
          titleElement.classList.remove('d-none');
          if(inputvalidators[0]===0){
            counterButton--;
            inputvalidators[0]=1;
          }
          subRef.current.disabled=true;
        }
        else{
          titleRef.current.classList.remove('border');
          titleRef.current.classList.remove('border-danger');
          titleElement.classList.add('d-none');
          let newData = [{...courses[0], title : e.target.value}]
          setData(newData)
          if(inputvalidators[0]===1){
            counterButton++;
            inputvalidators[0]=0;
          }
          if(counterButton===8){
            subRef.current.disabled=false;
          }
        }
      } 
  }

  function updateDuration(e){
    console.log("There was a change in duration");
    let durationElement=document.getElementById("durationHelp");
    let format =/[`!@#$%^&*+=[\]{};':"\\|,.<>/?~]/;
    if(durationElement!=null){
      if(format.test(durationRef.current.value)){
        let newData = [{...courses[0], duration : e.target.value}]
        setData(newData)
        durationRef.current.classList.add('border');
        durationRef.current.classList.add('border-danger');
        durationElement.classList.remove('d-none');
        if(inputvalidators[1]===0){
          counterButton--;
          inputvalidators[1]=1;
        }
        subRef.current.disabled=true;
      }
      else{
        durationRef.current.classList.remove('border');
        durationRef.current.classList.remove('border-danger');
        durationElement.classList.add('d-none');
        let newData = [{...courses[0], duration : e.target.value}]
        setData(newData)
        if(inputvalidators[1]===1){
          counterButton++;
          inputvalidators[1]=0;
        }
        if(counterButton===8){
          subRef.current.disabled=false;
        }
      }
    }
  }

  function updateImagePath(e){
    console.log("There was a change in image");
      let imageElement=document.getElementById("imageHelp");
      let format =/[`!@#$%^&*()+=[\]{};':"\\|,<>?~]/;
      if(imageElement!=null){
        if(format.test(imageRef.current.value)){
          let newData = [{...courses[0], imagePath : e.target.value}]
          setData(newData)
          imageRef.current.classList.add('border');
          imageRef.current.classList.add('border-danger');
          imageElement.classList.remove('d-none');
          if(inputvalidators[2]===0){
            counterButton--;
            inputvalidators[2]=1;
          }
          subRef.current.disabled=true;
        }
        else{
          imageRef.current.classList.remove('border');
          imageRef.current.classList.remove('border-danger');
          imageElement.classList.add('d-none');
          let newData = [{...courses[0], imagePath : e.target.value}]
          setData(newData)
          if(inputvalidators[2]===1){
            counterButton++;
            inputvalidators[2]=0;
          }
          if(counterButton===8){
            subRef.current.disabled=false;
          }
        }
      }
  }

  function checkUncheckAvailability(e){
    let newData = [{...courses[0], open : e.target.checked}]
    setData(newData)
  }
  function updateDescription(e){
    console.log("There was a change in description");
    let descriptionElement=document.getElementById("descriptionHelp");
    let format =/[`@#$%^*_+\-=[\]{}"\\|~]/;
    if(descriptionElement!=null){
      if(format.test(descriptionRef.current.value)){
        let newData = [{...courses[0], description : e.target.value}]
        setData(newData)
        descriptionRef.current.classList.add('border');
        descriptionRef.current.classList.add('border-danger');
        descriptionElement.classList.remove('d-none');
        if(inputvalidators[3]===0){
          counterButton--;
          inputvalidators[3]=1;
        }
        subRef.current.disabled=true;
      }
      else{
        descriptionRef.current.classList.remove('border');
        descriptionRef.current.classList.remove('border-danger');
        descriptionElement.classList.add('d-none');
        let newData = [{...courses[0], description : e.target.value}]
        setData(newData)
        if(inputvalidators[3]===1){
          counterButton++;
          inputvalidators[3]=0;
        }
        if(counterButton===8){
          subRef.current.disabled=false;
        }
      }
    }
  }

  function updateStartDate(e){

    console.log("There was a change in startDate");
    let startDateElement=document.getElementById("startDateHelp");
    let format = /^[0-9-]+$/;
    if(startDateElement!=null){
      if(!format.test(startDateRef.current.value) ||(startDateRef.current.value.length!==10)){
        let newData = [{...courses[0], startDate : e.target.value}]
        setData(newData)
        startDateRef.current.classList.add('border');
        startDateRef.current.classList.add('border-danger');
        startDateElement.classList.remove('d-none');
        if(inputvalidators[4]===0){
          counterButton--;
          inputvalidators[4]=1;
        }
        subRef.current.disabled=true;
      }
      else{
        startDateRef.current.classList.remove('border');
        startDateRef.current.classList.remove('border-danger');
        startDateElement.classList.add('d-none');
        let newData = [{...courses[0], startDate : e.target.value}]
        setData(newData)
        if(inputvalidators[4]===1){
          counterButton++;
          inputvalidators[4]=0;
        }
        if(counterButton===8){
          subRef.current.disabled=false;
        }
      }
    }  
  }

  function updateEndDate(e){
    console.log("There was a change in endDate");
      let endDateElement=document.getElementById("endDateHelp");
      let format = /^[0-9-]+$/;
      if(endDateElement!=null){
        if(!format.test(endDateRef.current.value)||(endDateRef.current.value.length!==10)){
          let newData = [{...courses[0], endDate : e.target.value}]
          setData(newData)
          endDateRef.current.classList.add('border');
          endDateRef.current.classList.add('border-danger');
          endDateElement.classList.remove('d-none');
          if(inputvalidators[5]===0){
            counterButton--;
            inputvalidators[5]=1;
          }
          subRef.current.disabled=true;
        }
        else{
          endDateRef.current.classList.remove('border');
          endDateRef.current.classList.remove('border-danger');
          endDateElement.classList.add('d-none');
          let newData = [{...courses[0], endDate : e.target.value}]
          setData(newData)
          if(inputvalidators[5]===1){
            counterButton++;
            inputvalidators[5]=0;
          }
          if(counterButton===8){
            subRef.current.disabled=false;
          }
        }
      } 
  }

  function updateEarlyPrice(e){
    console.log("There was a change in Early Price");
    let earlyPriceElement=document.getElementById("earlyPriceHelp");
    let format = /^[0-9]+$/;
    if(earlyPriceElement!=null){
      if(!format.test(discPriceRef.current.value)){
        let newData = [{...courses[0], earlyPrice : e.target.value}]
        setData(newData)
        discPriceRef.current.classList.add('border');
        discPriceRef.current.classList.add('border-danger');
        earlyPriceElement.classList.remove('d-none');
        if(inputvalidators[6]===0){
          counterButton--;
          inputvalidators[6]=1;
        }
        subRef.current.disabled=true;
      }
      else{
        discPriceRef.current.classList.remove('border');
        discPriceRef.current.classList.remove('border-danger');
        earlyPriceElement.classList.add('d-none');
        let newData = [{...courses[0], earlyPrice : e.target.value}]
        setData(newData)
        if(inputvalidators[6]===1){
          counterButton++;
          inputvalidators[6]=0;
        }
        if(counterButton===8){
          subRef.current.disabled=false;
        }
      }
    }
  }

  function updateNormalPrice(e){
    console.log("There was a change in Normal Price");
      let normalPriceElement=document.getElementById("normalPriceHelp");
      let format = /^[0-9]+$/;

      if(normalPriceElement!=null){
        if(!format.test(normalPriceRef.current.value)){
          let newData = [{...courses[0], normalPrice : e.target.value}]
          setData(newData)
          normalPriceRef.current.classList.add('border');
          normalPriceRef.current.classList.add('border-danger');
          normalPriceElement.classList.remove('d-none');
          if(inputvalidators[7]===0){
            counterButton--;
            inputvalidators[7]=1;
          }
          subRef.current.disabled=true;
        }
        else{
          normalPriceRef.current.classList.remove('border');
          normalPriceRef.current.classList.remove('border-danger');
          normalPriceElement.classList.add('d-none');
          let newData = [{...courses[0], normalPrice : e.target.value}]
          setData(newData)
          if(inputvalidators[7]===1){
            counterButton++;
            inputvalidators[7]=0;
          }
          if(counterButton===8){
            subRef.current.disabled=false;
          }
        }
      }
  }

  return(
    <div className="bg-light border rounded mt-3">
    <div className=" col-11 container-fluid mt-5 mx-auto">
       <h1>Edit Course's Info</h1>
       <form onSubmit={(e)=>submit(e)}>
      
       <div className="form-group">
         <label htmlFor="title"  className="my-1">Title:</label>
         <input ref={titleRef}  type="text" className="form-control" id="title" value={courses[0].title} placeholder="Title" onChange={updateTitle} minLength="5" pattern="[\s\d a-zA-Z\-\_\,\.\΄\'\:\(\)]+$/u" required></input> 
         <small id="titleHelp" className="text-danger d-none">
            Please choose a valid title for the course.
         </small>    
       </div>
       <div className="form-group">
         <label htmlFor="duration"  className="my-1">Duration: </label>
         <input ref={durationRef} type="text" className="form-control" id="duration" placeholder="Duration" value={courses[0].duration} onChange = {updateDuration} minLength="5" pattern="[\s\d a-zA-Z\:\-\_]+" required></input>
         <small id="durationHelp" className="text-danger d-none">
            Please do not use any special characters other than "- , _ , :" in this field
         </small>  
       </div>
       <div className="form-group">
         <label htmlFor="imagePath"  className="my-1">Image path:</label>
         <input ref={imageRef} type="text" className="form-control" id="imagePath" placeholder="Image path" value={courses[0].imagePath} onChange = {updateImagePath} minLength="5" pattern="[a-zA-Z\d\:\-\_\/]+" required></input>
         <small id="imageHelp" className="text-danger d-none">
            Please do not use any special characters other than "- , _ , :, /" in this field
         </small>  
       </div>
       <div className="form-check my-2">
         <input  ref={inputRef} className="form-check-input " type="checkbox" checked={courses[0].open} id="bookable" onChange={checkUncheckAvailability}></input>
         <label className="form-check-label" htmlFor="bookable">Bookable</label>
       </div>
       <hr></hr>
       <h3>Instructors</h3>
       <div className="form-check">
         <input ref={inputRef2}  className="form-check-input" type="checkbox" value="got it" id="checkName1" onChange={checkInstructor1}></input>
         <label className="form-check-label" htmlFor="checkName1">Instructor 1</label>
       </div>
       <div className="form-check">
         <input ref={inputRef3} className="form-check-input" type="checkbox"  value="" id="checkName2" onChange={checkInstructor2}></input>
         <label className="form-check-label" htmlFor="checkName2">Instructor 2</label>
       </div>
       <hr></hr>
       <div className="form-group">
         <label htmlFor="description">Description:</label>
         <textarea ref={descriptionRef}  className="form-control" id="description" rows="3" value={courses[0].description} onChange = {updateDescription} minLength="5" pattern="[\p{Greek}\s\d a-zA-Z\-\_\,\.\΄\'\:\(\)]+$/u" required></textarea>
         <small id="descriptionHelp" className="text-danger d-none">
            Some special characters are not allowed in this field.
         </small>  
       </div>
       <hr></hr>
       <h3>Dates</h3>
       <div className="form-group">
         <label htmlFor="startDate">Start Date:</label>
         <input ref={startDateRef} type="text" className="form-control" id="startDate" placeholder="Start date" value={courses[0].startDate} onChange = {updateStartDate}  pattern="(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3}" required></input>
         <small id="startDateHelp" className="text-danger d-none">
            Please set a date with the following format dd-mm-yyyy
         </small>  
       </div>
       <div className="form-group">
         <label htmlFor="endDate">End Date:</label>
         <input ref={endDateRef} type="text" className="form-control" id="endDate" placeholder="End date" value={courses[0].endDate} onChange = {updateEndDate}  pattern="(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3}" required></input>
         <small id="endDateHelp" className="text-danger d-none">
            Please set a date with the following format dd-mm-yyyy
         </small>  
       </div>
       <hr></hr>
       <h3>Price</h3>
       <div className="form-group">
         <label htmlFor="earlyPrice">Early Bird:</label>
         <input ref={discPriceRef} type="number" className="form-control" id="earlyPrice" placeholder="0" value={courses[0].earlyPrice} onChange = {updateEarlyPrice}  pattern="[0-9]+"  required ></input>
         <small id="earlyPriceHelp" className="text-danger d-none">
            Only numbers are allowed in this field
         </small>  
       </div>
       <div className="form-group">
         <label htmlFor="normalPrice">Normal price:</label>
         <input ref={normalPriceRef} type="number" className="form-control" id="normalPrice" placeholder="0" value={courses[0].normalPrice} onChange = {updateNormalPrice}  pattern="[0-9]+" required ></input>
         <small id="normalPriceHelp" className="text-danger d-none">
            Only numbers are allowed in this field
         </small> 
       </div>
     <hr></hr>
     <div style={{height: '60px'}} className="py-2 px-4 justify-content-end mb-5">
       <button ref={subRef} style={{ float: 'right'}} disabled={false} type="submit" className="btn btn-primary text-white float-right" >Edit Course</button>
     </div> 
   </form>
     </div>
 </div>
  );
}

export default EditCourse;