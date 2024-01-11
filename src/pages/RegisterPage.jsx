import { useState } from "react";
import facade from "../util/apiFacade";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (username.length < 3 || password.length < 3) {
      setRegisterError("Username and password must be at least 3 characters long");
      return;
    }

    try {
      // Register user
      await facade.register(loginCredentials.username,
        loginCredentials.password);
      // Navigate to the desired page after successful login
      navigate('/');
    } catch (error) {
      if (error.status === 409) {
        setRegisterError("Username already exists");
      } else {
        setRegisterError("Registration failed");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <form className="register-form" onChange={onChange}>
          <h2 className="register-form-header">Sign up here</h2>
          <label>
            <input
              type="text"
              placeholder="Username"
              id="username"
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              placeholder="Password"
              id="password"
            />
          </label>
          <br />
          {registerError && <div className="loginError">{registerError}</div>}
          <button onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
};


export default RegisterPage;