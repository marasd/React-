import React, {useState, useEffect } from 'react';
import styles from './Courses.module.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Link} from  "react-router-dom";

function Courses(props) {
  
  const [courses, setCourses]= useState(props.location.courses);
  const [instructors, setInstructors]=useState(props.location.instructors);

  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('courses'))!= null){
      setCourses(JSON.parse(window.localStorage.getItem('courses')));
    }
    if(JSON.parse(window.localStorage.getItem('instructorsOfCourses'))!= null){
      setInstructors(JSON.parse(window.localStorage.getItem('instructorsOfCourses'))); 
    }
    
  }, []);

  useEffect(() => {
    window.localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    window.localStorage.setItem('instructorsOfCourses', JSON.stringify(instructors));
  },[instructors]);

  return (
    <div className={styles.CoursesPage}>
      <h2 className="mt-4 text-secondary">All Courses</h2>
      <div className="row ">
        
        {courses && courses.map( post => {
          return<Card key={post.id} className="col-3 bg-light mb-4 pb-4 mx-5">
                <CardTitle id="cardtitle" className="p-2" tag="h5">{post.title}</CardTitle>  
                <CardImg top width="100%" src={post.imagePath} alt="Course's image" />
                <CardBody>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                     <div>
                        <div>Price:<span className="text-dark">{post.price.normal}&#8364; </span> | Bookable:{post.open? <span style={{color: 'green'}}>&#10003;</span> : <span>&#10060;</span>}</div>
                        <div className="my-3">Duration: <span className="text-dark">{post.duration}</span></div>
                        <div>Dates: <span className="text-dark">{post.dates.start_date} - {post.dates.end_date} </span></div>
                      </div>
                    </CardSubtitle>
                    <Link to={{pathname: "/courses_details", course: post, instructors:instructors}}><button style={{ float: 'right'}}  type="button"  onClick={window.localStorage.clear()} className="btn btn-info float-right text-white">View details</button> </Link>
                 </CardBody>
                 </Card>
                }
          )
        }
      </div>
    </div>
  );

}


export default Courses;
