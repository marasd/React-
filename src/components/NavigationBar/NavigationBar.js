import React, {useState, useEffect} from 'react';
import {  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem} from 'reactstrap';
import axios from 'axios';
import {Link} from  "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [instructors, setInstructors]= useState(null);
  const [courses, setCourses]= useState(null);

  useEffect( () => {
    //Creates a promise, makes an object which gets the data, then turns the json file into an object. 
    async function fetchData (){
      const request=await axios.get('http://localhost:3001/courses')
        setCourses(request.data);
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
      <Navbar   className="container-fluid bg-dark" light expand="md">
        <NavbarBrand className="text-decoration-none text-white hover-text-dark"  href="/">Code.Hub Dashboard</NavbarBrand>
        <NavbarToggler className="bg-white"  onClick={toggle} />
        <Collapse  isOpen={isOpen} navbar>
          <Nav className="col-12 justify-content-end " navbar>
            <NavItem>
              <Link  className="text-secondary text-decoration-none text-height-3 hover-overlay" to={{pathname: "/courses", courses: courses, instructors:instructors}}>Courses</Link>
            </NavItem>
            <NavItem>
              <Link className="text-secondary text-decoration-none mx-2 "   to={{pathname:"/add_course"}} >Add new Course</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
};


export default NavigationBar;
