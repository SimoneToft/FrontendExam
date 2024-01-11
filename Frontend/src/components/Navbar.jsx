import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import facade from '../util/apiFacade';
import SearchComponent from "./Search";



function Navbar() { 

    const init = { username: '', password: '' };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const performLogin = (evt) => {
        evt.preventDefault();
        facade.login(
          loginCredentials.username,
          loginCredentials.password,
          () => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
            setLoginError(null);
          },
          (error) => {
            console.error('Login failed:', error);
            // Set an error state to display an error message
            setLoginError('Invalid username or password');
            }
        );
      };
    
    const performLogout = () => {
        facade.logout(() => {
          setIsLoggedIn(false);
          setUserRole(null);
          
          // Redirect to the homepage after logout
          navigate('/');
      });
    };
    const onChange = (evt) => {
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: evt.target.value,
      });
    };
    const toggleLoginModal = () => {
        setLoginError(null);
      setShowLoginModal(!showLoginModal);      
    };

        const funFactsList = [
          'Did you know that fish can recognize their owners?',
          'The Clownfish is immune to the stinging tentacles of sea anemones.',
          'Seahorses are the only fish species in which the males give birth.',
          'Fun fact, blue-tang clan',
          'omg jeg elsker fisk!!!',
        ];
      
        const [currentFunFactIndex, setCurrentFunFactIndex] = useState(0);
      
        useEffect(() => {
          const intervalId = setInterval(() => {
            // Change the fun fact every 10 seconds
            setCurrentFunFactIndex((prevIndex) =>
              prevIndex === funFactsList.length - 1 ? 0 : prevIndex + 1
            );
          }, 10000);
      
          return () => clearInterval(intervalId); // Cleanup the interval on component unmount
        }, [funFactsList.length]);

    return (
        <div id="page">
            <header>
                <div className="header_background">
                <img className="bubble bubble_left" src="src\assets\images\bubbles.gif" width="10%" height="190" ></img>
                <img className="bubble bubble_right" src="src\assets\images\bubbles.gif" width="10%" height="190" ></img>
                    <div className="container">
                        <div className="row justify-content-md-center header_inner">
                            <div className="col logo-col">
                            <div className="logo-link">
                            <NavLink to="/">
                                <div className="logo ">
                                    <img src="src\assets\images\logo.gif"></img>
                                </div>
                                
                            </NavLink>
                            </div></div>
                            <div className="col-5">
                                
                            <div className="search_and_nav">
                               <SearchComponent />
                                <nav className="navigation">
                                    <ul className="nav_list">
                                        <NavLink to="fish"><li className="nav-item">Fish</li></NavLink>
                                        <NavLink to="invertebrates"><li className="nav-item">Invertebrates</li></NavLink>
                                        <NavLink to="supplies"><li className="nav-item">Supplies</li></NavLink>
                                        <NavLink to="tanks"><li className="nav-item">Tanks</li></NavLink>
                                        <NavLink to="quiz"><li className="nav-item">Quiz</li></NavLink>
                                    </ul>
                                </nav>
                            </div>
                            </div>
                            <div className="col">                           
                                    <div className="header_buttons">
                                {isLoggedIn && facade.getUserRoles() === 'user' && (
                                    <NavLink to="user">
                                    <button className="header_button">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__button-icon" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
                                        <span className="button_text">Profile</span>
                                    </button>
                                    </NavLink>
                                )}
                                {isLoggedIn && facade.getUserRoles() === 'admin' && (
                                    <NavLink to="admin">
                                    <button className="header_button">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" className="header__button-icon" viewBox="0 0 640 512"><path d="M144 160A80 80 0 1 0 144 0a80 80 0 1 0 0 160zm368 0A80 80 0 1 0 512 0a80 80 0 1 0 0 160zM0 298.7C0 310.4 9.6 320 21.3 320H234.7c.2 0 .4 0 .7 0c-26.6-23.5-43.3-57.8-43.3-96c0-7.6 .7-15 1.9-22.3c-13.6-6.3-28.7-9.7-44.6-9.7H106.7C47.8 192 0 239.8 0 298.7zM320 320c24 0 45.9-8.8 62.7-23.3c2.5-3.7 5.2-7.3 8-10.7c2.7-3.3 5.7-6.1 9-8.3C410 262.3 416 243.9 416 224c0-53-43-96-96-96s-96 43-96 96s43 96 96 96zm65.4 60.2c-10.3-5.9-18.1-16.2-20.8-28.2H261.3C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7H455.2c-2.1-5.2-3.2-10.9-3.2-16.4v-3c-1.3-.7-2.7-1.5-4-2.3l-2.6 1.5c-16.8 9.7-40.5 8-54.7-9.7c-4.5-5.6-8.6-11.5-12.4-17.6l-.1-.2-.1-.2-2.4-4.1-.1-.2-.1-.2c-3.4-6.2-6.4-12.6-9-19.3c-8.2-21.2 2.2-42.6 19-52.3l2.7-1.5c0-.8 0-1.5 0-2.3s0-1.5 0-2.3l-2.7-1.5zM533.3 192H490.7c-15.9 0-31 3.5-44.6 9.7c1.3 7.2 1.9 14.7 1.9 22.3c0 17.4-3.5 33.9-9.7 49c2.5 .9 4.9 2 7.1 3.3l2.6 1.5c1.3-.8 2.6-1.6 4-2.3v-3c0-19.4 13.3-39.1 35.8-42.6c7.9-1.2 16-1.9 24.2-1.9s16.3 .6 24.2 1.9c22.5 3.5 35.8 23.2 35.8 42.6v3c1.3 .7 2.7 1.5 4 2.3l2.6-1.5c16.8-9.7 40.5-8 54.7 9.7c2.3 2.8 4.5 5.8 6.6 8.7c-2.1-57.1-49-102.7-106.6-102.7zm91.3 163.9c6.3-3.6 9.5-11.1 6.8-18c-2.1-5.5-4.6-10.8-7.4-15.9l-2.3-4c-3.1-5.1-6.5-9.9-10.2-14.5c-4.6-5.7-12.7-6.7-19-3l-2.9 1.7c-9.2 5.3-20.4 4-29.6-1.3s-16.1-14.5-16.1-25.1v-3.4c0-7.3-4.9-13.8-12.1-14.9c-6.5-1-13.1-1.5-19.9-1.5s-13.4 .5-19.9 1.5c-7.2 1.1-12.1 7.6-12.1 14.9v3.4c0 10.6-6.9 19.8-16.1 25.1s-20.4 6.6-29.6 1.3l-2.9-1.7c-6.3-3.6-14.4-2.6-19 3c-3.7 4.6-7.1 9.5-10.2 14.6l-2.3 3.9c-2.8 5.1-5.3 10.4-7.4 15.9c-2.6 6.8 .5 14.3 6.8 17.9l2.9 1.7c9.2 5.3 13.7 15.8 13.7 26.4s-4.5 21.1-13.7 26.4l-3 1.7c-6.3 3.6-9.5 11.1-6.8 17.9c2.1 5.5 4.6 10.7 7.4 15.8l2.4 4.1c3 5.1 6.4 9.9 10.1 14.5c4.6 5.7 12.7 6.7 19 3l2.9-1.7c9.2-5.3 20.4-4 29.6 1.3s16.1 14.5 16.1 25.1v3.4c0 7.3 4.9 13.8 12.1 14.9c6.5 1 13.1 1.5 19.9 1.5s13.4-.5 19.9-1.5c7.2-1.1 12.1-7.6 12.1-14.9v-3.4c0-10.6 6.9-19.8 16.1-25.1s20.4-6.6 29.6-1.3l2.9 1.7c6.3 3.6 14.4 2.6 19-3c3.7-4.6 7.1-9.4 10.1-14.5l2.4-4.2c2.8-5.1 5.3-10.3 7.4-15.8c2.6-6.8-.5-14.3-6.8-17.9l-3-1.7c-9.2-5.3-13.7-15.8-13.7-26.4s4.5-21.1 13.7-26.4l3-1.7zM472 384a40 40 0 1 1 80 0 40 40 0 1 1 -80 0z" /></svg>
                                        <span className="button_text">Admin</span>
                                    </button>
                                    </NavLink>
                                )}
                                {isLoggedIn && (
                                <NavLink to="cart">    
                                <button className="header_button">
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="header__button-icon" viewBox="0 0 576 512"><path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                                    <span className="button_text">Cart</span>
                                </button>
                                </NavLink>
                                )}
                                <button className="header_button" onClick={isLoggedIn ? performLogout : toggleLoginModal}>
                                    {isLoggedIn ? <svg xmlns="http://www.w3.org/2000/svg" className="header__button-icon" viewBox="0 0 576 512"><path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="header__button-icon" viewBox="0 0 576 512"><path d="M180.5 141.5C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1 379.6c-12.5 7.3-28.4 5.3-38.7-4.9S-3 348.7 4.2 336.1L50 256 4.2 175.9c-7.2-12.6-5-28.4 5.3-38.6s26.1-12.2 38.7-4.9l89.7 52.3c12.2-14.6 26.5-29.4 42.7-43.1zM448 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>}
                                    <span className="button_text">{isLoggedIn ? 'Log out' : 'Log in'}</span>
                                </button>
                                 {showLoginModal && (
                                <div className="login-modal">
                                    <div className="arrow"></div>
                                    <form className="login_form" onChange={onChange}>
                                        <input placeholder="User Name" id="username" />
                                        <input placeholder="Password" id="password" type="password" />     
                                        {loginError && <div className="loginError">{loginError}</div>} 
                                        <div>                                             
                                        <button onClick={performLogin}>Login</button>
                                        <NavLink to="register">
                                        <button onClick={toggleLoginModal}>Sign up</button>
                                        </NavLink>
                                        </div>    
                                    </form>
                                </div>
                            )}
                            </div>
                           
                        </div>
                            </div>
                        </div>

                            
                        
                </div>
                <div className="under_header_background">
                    <div className="container">
                        <ul className="under_header">
                            <li>{funFactsList[currentFunFactIndex]}</li>
                        </ul>
                    </div>
                </div>
            </header>
            <div>
    </div>
        </div>
    );
}


export default Navbar;
