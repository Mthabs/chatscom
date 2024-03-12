import React from 'react';
import "./header.css"
import {Link, NavLink, useHistory} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import AxiosServices from "../../Config/AxiosServices";
import {setSession} from "../../lib/utils";

const Header = () => {
    const {setIsAuthenticated, user, setUser} = useAuth()
    const history = useHistory();

    const logout = async () => {
        try {
            AxiosServices.post("/dj-rest-auth/logout/", {})
                .then(response => {
                    console.log(response)
                    setSession(null);
                    setIsAuthenticated(false)
                    setUser(null)
                    history.push("/")
                }).catch((error) => {
                console.log(error)
                setSession(null);
                setIsAuthenticated(false)
                setUser(null)
                history.push("/")
            })
        } catch (error) {
            console.log(error)
            setSession(null);
            setIsAuthenticated(false)
            setUser(null)
            history.push("/")
        }
    }

    return (
        <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center">
                <h1 className="logo mr-auto"><NavLink to="/">ChatsCom</NavLink></h1>

                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li>
                            <NavLink exact activeClassName="active" className="nav-link scrollto" to="/feed/home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active" className="nav-link scrollto"
                                     to="/feed/videos">
                                Videos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active"
                                     className="nav-link scrollto"
                                     to="/feed/photos">
                                Photos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active"
                                     className="nav-link scrollto"
                                     to="/feed/friends">
                                friends
                            </NavLink>
                        </li>
                    </ul>
                    {/*<i className="bi bi-list mobile-nav-toggle"></i>*/}
                </nav>

                <Dropdown className="edit">
                    <Dropdown.Toggle variant="" id="dropdown-basic" className="get-started-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="ml-1">
                            <circle cx="12" cy="8" r="5"></circle>
                            <path d="M20 21a8 8 0 0 0-16 0"></path>
                        </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        align="right"
                        style={{
                            width: "226px"
                        }}
                    >
                        <div
                            className="d-flex flex-column"
                            style={{
                                padding: ".25rem 1.5rem"
                            }}
                        >
                            {user?.username && <p className="font-medium">{"@ " + user?.username}</p>}
                            {user?.email && (
                                <p className="w-[200px] truncate text-sm text-muted-foreground">
                                    {user?.email}
                                </p>
                            )}
                        </div>
                        <Dropdown.Divider/>
                        <Dropdown.Item as={Link} to="/feed/home">
                            <i className="bi bi-house-door mr-2 font-weight-bold" color="#000"/>
                            Home
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to="/feed/profile">
                            <i className="bi bi-person-plus mr-2 font-weight-bold" color="#000"/>
                            Profile
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to="/feed/photos">
                            <i className="bi bi-image mr-2 font-weight-bold" color="#000"/>
                            Photos
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to="/feed/videos">
                            <i className="bi bi-camera-video mr-2 font-weight-bold" color="#000"/>
                            Videos
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to="/feed/friends">
                            <i className="bi bi-person-plus mr-2 font-weight-bold" color="#000"/>
                            Friends
                        </Dropdown.Item>

                        <Dropdown.Divider/>

                        <Dropdown.Item onClick={logout}>
                            <i className="bi bi-box-arrow-right font-weight-bold mr-2" color="#000"/>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;