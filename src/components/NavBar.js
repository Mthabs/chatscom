import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const NavBar = () => {

  const navigate = useHistory();

  const[auth, setAuth] = useState(false);
  const[user, setUser] = useState(null);
  useEffect(()=>{
    setAuth(JSON.parse(sessionStorage.getItem("loggedIn")));
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [])

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
   sessionStorage.clear();
    navigate.push("/signin")
    document.location.reload()
  };

  const handleClick = (path) =>{
    navigate.push(path)
    document.location.reload();
  }
 
  const loggedInIcons = (
    <>
   
      <NavLink className={styles.NavLink} to="" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      {auth && <NavLink
        className={styles.NavLink}
        to={""}
        onClick={()=>{handleClick(`/profile/${user.id}`)}}
      >
        {user.profile_picture && <Avatar src={user.profile_picture} text="Profile" height={40} />}
        {!user.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" text="Profile" height={40} />}
      </NavLink>}
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to=""
        onClick={()=>{handleClick("/signin")}}
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to=""
        className={styles.NavLink}
        activeClassName={styles.Active}
        onClick={()=>{handleClick("/signup")}}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="" 
        onClick={()=>{handleClick("/")}}
        >
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {auth && <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to=""
              onClick={()=>{handleClick("/")}}
            >
              <i className="fas fa-home"></i>Home
            </NavLink>}
            {auth &&<NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to=""
              onClick={()=>{handleClick("/friends")}}
            >
              <i className="fas fa-user-friends"></i>Friends
            </NavLink>}
            {auth ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;