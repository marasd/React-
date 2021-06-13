
import styles from './Instructors.module.css';
import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
function Instructors(props){
 
  const [instructors, setInstructors]=useState(props.location.instructors);
  let history = useHistory();

  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('instructorsOfInstructors'))!= null){
      setInstructors(JSON.parse(window.localStorage.getItem('instructorsOfInstructors'))); 
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('instructorsOfInstructors', JSON.stringify(instructors));
  },[instructors]);

  async function deleteInstructor(inst){
   
    await axios.delete(`http://localhost:3001/instructors/${inst.id}`)
    console.log("deleted")
    history.push('/')
    return 1
 }
  

  function goBack(){
    history.push('/')
  }

  return(
    <div className={styles.CoursesPage}>
    <h2 className="mt-4 text-secondary">All Instructors</h2>
    <div className="row mt-4 col-10  mx-auto ">
      {instructors && instructors.map( inst => {
        return<Card key={inst.id} className="col-5 bg-light mb-4 pb-4 mx-5">
              <CardTitle id="cardtitle" className="p-2" tag="h5">{inst.name.first}  {inst.name.last}</CardTitle>  
              {/* <CardImg top width="100%" src={post.imagePath} alt="Course's image" /> */}
              <CardBody>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                   <div>
                      <div>Gender:<span className="text-dark"> {inst.gender} </span></div>
                      <div className="my-3">E-mail: <span className="text-dark">{inst.email}</span></div>
                      <div>DOB: <span className="text-dark">{inst.dob}</span></div>
                      <br></br>
                      <div>BIO: <span className="text-dark">{inst.bio}</span></div>
                      <br></br>
                      <div>Hobbies: {inst.hobbies.map(hobby =>{return <span key={hobby} className="text-dark"> {hobby} </span>})}</div>
                      <br></br>
                      <div>LinkedIn: <a href={inst.linkedin} className="text-primary">{inst.linkedin}</a></div>
                    </div>
                    <button type="button" onClick={()=> deleteInstructor(inst)} className="btn btn-danger text-white">Delete</button>
                  </CardSubtitle>
               </CardBody>
               </Card>
              }
        )
      }
    </div >
    <div className="col-10">
      <button style={{ float: 'right'}} type="button" onClick={goBack} className="btn btn-info btn-primary float-right text-white">Back to Dashboard</button>
    </div>
  </div>
  )
}


export default Instructors;