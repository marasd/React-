import React, {useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import {Link} from  "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CoursesDetails = (props) => {
  const [myCourse, setMyCourse] = useState(props.location.course)
  const [instructors, setInstructors]=useState(props.location.instructors);
  let history = useHistory();
  

  useEffect(() => {
    console.log("refresh")
    if(JSON.parse(window.localStorage.getItem('course'))!= null){
      console.log("refresh course")
      setMyCourse(JSON.parse(window.localStorage.getItem('course')));
    }

    if(JSON.parse(window.localStorage.getItem('instructors'))!== null){
      console.log("refresh instructor")
      setInstructors(JSON.parse(window.localStorage.getItem('instructors'))); 
    }else if(instructors !== null){
      let instData=[];
      instructors.map(innerData =>{
      for(let i=0; i<myCourse.instructors.length; i++){  
          if(myCourse.instructors[i]===innerData.id){
          instData.push(innerData);   
          }           
        }
      return 0
      })
      setInstructors(instData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('course', JSON.stringify(myCourse));
  }, [myCourse]);

  useEffect(() => {
    window.localStorage.setItem('instructors', JSON.stringify(instructors));
  },[instructors]);

  async function deleteCourse(){
     await axios.delete(`http://localhost:3001/courses/${myCourse.id}`)
     console.log("deleted")
     history.push('/')
     return 1
  }

  {if(myCourse && myCourse !== 5){
    return(
      <div  className="mt-4 ">
            <Card  className="col-7  mb-4 pb-4 mx-auto">
                <CardTitle id="cardtitle" className="p-2" tag="h1">{myCourse.title} ({myCourse.id})</CardTitle> 
                <div className="col-9 mx-auto">
                    <CardImg top height="500px" width="100%" src={myCourse.imagePath} alt="Course's image" />
                </div> 
                <hr></hr>
            <CardBody>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <div>
                  <div className="text-dark col-12 d-inline-flex flex-row justify-content-between">
                    <h4 className="col-4">Price: {myCourse.price.normal}&#8364;   </h4>
                    <h4 className="col-4">Duration: {myCourse.duration}</h4>
                  </div>
                  <div className="text-dark col-12 d-inline-flex flex-row justify-content-between">
                      <h4 className="col-4">Bookable:{myCourse.open? <span style={{color: 'green'}}>&#10003;</span> : <span>&#10060;</span>}</h4>
                      <h4 className="col-4">Dates: {myCourse.dates.start_date} - {myCourse.dates.end_date} </h4>
                  </div>
                </div>
              </CardSubtitle>
              <CardText  className="col-12 mt-4" dangerouslySetInnerHTML={{ __html: myCourse.description }}></CardText>
              <div className="text-dark col-12 d-inline-flex flex-row ">
                <Link to={{pathname: "/edit_course", course:myCourse, instructors:instructors}}>
                  <button  type="button" className="btn btn-info float-right text-white">Edit</button>
                </Link> 
                <button  type="button" onClick={deleteCourse} className="mx-1 btn btn-danger float-right text-white">Delete</button>
              </div>
              <h3>Instructors</h3> 
                  {instructors && instructors.map( post => {
                    return(<div key={post.id}>
                        <h3>{post.name.first} {post.name.last} ({post.dob})</h3> 
                        <p>Email: <span className="text-primary">{post.email}</span> | <a href={post.linkedin} className="no-decoration">LinkedIn</a> </p>
                        <p>{post.bio}</p>
                    </div>);
                  })} 
            </CardBody>
          </Card>
      </div> 
    )
  }else{
    return(
      <div className=" bg-light border rounded p-5 mt-4">
        <h2>No Course was selected!</h2>
        <h5>Please access this page by using the appropriate link.</h5>
     </div> 
    );
  }}

}


export default CoursesDetails;
