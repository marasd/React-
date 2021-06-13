import React, {useState, useEffect } from 'react';
import {Link} from  "react-router-dom";
import axios from 'axios';

function DashBoard() {

  const [courses, setCourses]= useState(null);
  const [stats, setStats]= useState(null);
  const [initialCourses, setInitialCourses]= useState(null);
  const [instructors, setInstructors]= useState(null);

  useEffect( () => {
    //Creates a promise, makes an object which gets the data, then turns the json file into an object. 
    async function fetchData (){
      const request=await axios.get('http://localhost:3001/stats')
        setStats(request.data)
      }
      fetchData();
  }, []);

  useEffect( () => {
    //Creates a promise, makes an object which gets the data, then turns the json file into an object. 
   
    async function fetchData (){
      const request=await axios.get('http://localhost:3001/courses')
        // console.log(data);
        if(request.data.length>5){
          setInitialCourses(request.data);
          let data=request.data
          let tempArray=[];
          tempArray=[data[data.length - 1], data[data.length - 2], data[data.length - 3], data[data.length - 4], data[data.length - 5]];
          setCourses(tempArray);
        }
        else{
          setInitialCourses(request.data);
          setCourses(request.data);
        }

      }
    fetchData();
  }, []);
  
  useEffect( () => {

    async function fetchData (){
      const request=await axios.get('http://localhost:3001/instructors')
        setInstructors(request.data);
      }
      fetchData();
  }, []);

   return (
     <div>
        <div className=" bg-light border rounded p-5 mt-4">
          <h2>Welcome to Code.Hub Dashboard!</h2>
          <h5>Manage everything and have fun!</h5>
        </div> 
        <div className="col-12 d-inline-flex flex-row justify-content-between my-4">
          {/* An den exei data mhn to tre3eis */}
          {stats && stats.map( post => {
            return <div key={post.id} style={{width: '240px'}} className="border border-solid rounded py-2 px-3 ">
            <p className="text-secondary my-2 font-weight-bolder" >
               <strong>{post.title.toUpperCase()}: </strong><span className="h-25 border rounded bg-secondary text-white px-1 align-items-start"><small>{post.amount}</small></span>
            </p>
            </div>
          })} 
        </div>
        <div>
          <div className=" bg-light border rounded py-2 px-4 ">
            <h5>Last 5 Courses</h5>
          </div> 
          <table className="table text-secondary my-0">
            <tbody>  
              <tr className="border rounded ">
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Bookable</th>
                    <th scope="col">Price</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
              </tr>
              {/* An den exei data mhn to tre3eis */}
              {courses && courses.map( post => {
              return <tr key={post.id} className="border rounded ">
                  <th scope="row">&#8505;</th>
                  <td>{post.title}</td>
                  <td >{post.open? <span style={{color: 'green'}}>&#10003;</span> : <span>&#10060;</span>}</td>
                  <td>{post.price.normal}&#8364;</td>
                  <td>{post.dates.start_date} - {post.dates.end_date} </td>
                  <td> <Link to={{pathname: "/courses_details", course: post, instructors:instructors}}><button  type="button" onClick={window.localStorage.clear()} className="btn btn-info float-right text-white">View details</button> </Link></td>
                </tr>
              })} 
            </tbody>
          </table>
          <div style={{height: '60px'}} className="bg-light border rounded py-2 px-4 justify-content-end">
          <Link to={{pathname: "/courses", courses: initialCourses, instructors:instructors}}>
            <button style={{ float: 'right'}} type="button" onClick={window.localStorage.clear()} className="btn btn-primary text-white float-right">View All</button>
          </Link>
          </div> 
          <div className=" bg-light border rounded py-2 px-4 ">
            <h5>Instructors</h5>
          </div> 
          <table className="table text-secondary my-0">
            <tbody>  
              <tr className="border rounded ">
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">e-mail</th>
                    <th scope="col">Bio</th>
                    <th scope="col">LinkedIn</th>
              </tr>
              {/* An den exei data mhn to tre3eis */}
              {instructors && instructors.map( inst => {
              return <tr key={inst.id} className="border rounded ">
                  <th scope="row">&#8505;</th>
                  <td>{inst.name.first}  {inst.name.last}</td>
                  <td >{inst.email}</td>
                  <td>{inst.bio}</td>
                  <td><a href={inst.linkedin}>{inst.linkedin}</a></td>
                </tr>
              })} 
            </tbody>
          </table>
          <div style={{height: '60px'}} className="bg-light border rounded py-2 px-4 justify-content-end mb-5">
          <Link to={{pathname: "/instructors", instructors:instructors}}>
            <button style={{ float: 'right'}} type="button" onClick={window.localStorage.clear()} className="btn btn-primary text-white float-right mx-1">View Instructors</button>
          </Link>
          <Link to={{pathname: "/add_instructor"}}>
            <button style={{ float: 'right'}} type="button" onClick={window.localStorage.clear()} className="btn btn-danger text-white float-right mr-3">Add Instructor</button>
          </Link>
          </div>
        </div>
    </div>
   );
}


export default DashBoard;
