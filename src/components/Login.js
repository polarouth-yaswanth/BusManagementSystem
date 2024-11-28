import React, { useState, useContext, useEffect } from "react";
import AccountContext from "../context/AccountContext";
import { useNavigate } from "react-router-dom"; // For handling redirects
import './Login.css'; // Import the Login styles

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility for password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Toggle visibility for confirm password field
  const [error, setError] = useState("");  // State for displaying error messages
  const navigate = useNavigate(); // To redirect the user after successful login/registration

  const { signup, authenticate, getSession } = useContext(AccountContext);

  useEffect(() => {
    // Check if a user session exists on page load, if yes redirect
    getSession()
      .then(session => {
        console.log("Session:", session);
        navigate("/admin"); // Redirect to the dashboard or home if user is logged in
      })
      .catch(err => {
        console.log("No session found", err);
      });
  }, [getSession, navigate]);

  const handleClick = () => setRegistered(false);
  const secondClick = () => setRegistered(true);

  const handleRegistration = async (event) => {
    event.preventDefault();

    // Validate that passwords match
    if (password !== cpassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate the email format (basic validation)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if the password is strong enough (optional)
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      const data = await signup(email, name, password);
      console.log("Registered Successfully", data);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError("Failed to register. " + err.message);  // Display error message
    }
  };

  const handleCancel = () => {
    setEmail("");
    setName("");
    setPassword("");
    setCPassword("");
    setRegistered(false); // Reset to Login view
    setError(""); // Reset error message
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      const data = await authenticate(email, password); // Assuming this returns some user data
      console.log("Login data:", data); // You can log data to check what you are getting
  
      // If authentication is successful, redirect to the admin dashboard
      navigate("/admin"); // Redirect to admin dashboard after successful login
    } catch (err) {
      setError("Failed to login. " + err.message); // Display error message
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle visibility for confirm password
  };

  return (
    <div className="col-md-4 text-center my-3 margin">
      <h3>{!registered ? "Login Here" : "Signup Here"}</h3>
      <form className="my-3" id="login-form">
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        
        {registered && (
          <div className="input-group col-md-4 my-4">
            <div className="input-group flex-nowrap">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)} 
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        )}

        <div className="input-group col-md-4 my-4">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-regular fa-envelope custom-icon"></i>
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>

        <div className="input-group col-md-4 my-4">
          <div className="input-group flex-nowrap">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)} 
              type={showPassword ? "text" : "password"}  
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="addon-wrapping"
            />
            <span className="input-group-text" id="addon-wrapping" onClick={togglePasswordVisibility}>
              <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}></i>
            </span>
          </div>
          {!registered && (
            <h6 className="my-2 mx-2 login-signup">Forget Password?</h6>
          )}
        </div>

        {registered && (
          <div className="input-group col-md-4 my-4">
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <i className="fa-solid"></i>
              </span>
              <input
                value={cpassword}
                onChange={(event) => setCPassword(event.target.value)} 
                type={showConfirmPassword ? "text" : "password"}  
                className="form-control"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="addon-wrapping"
              />
              <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                <i className={`fa-solid fa-eye${showConfirmPassword ? "-slash" : ""}`}></i>
              </span>
            </div>
          </div>
        )}

        {registered && (
          <h6 className="login-signup" onClick={handleClick}>
            Already a user? Login
          </h6>
        )}
        {!registered && (
          <h6 className="login-signup" onClick={secondClick}>
            New user? Signup
          </h6>
        )}

        <div className="col-12">
          <button
            type="button"
            className="btn btn-secondary my-3 mx-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary my-3"
            onClick={!registered ? handleLogin : handleRegistration}
          >
            {!registered ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
