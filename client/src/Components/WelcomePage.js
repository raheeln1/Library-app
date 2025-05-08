import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// import "./Welcome.css"; // ✅ نضيف ملف CSS خاص

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content text-center">
        <h1>📚 Welcome to My Personal Library</h1>
        <p>Organize and track your reading journey with ease.</p>
        <div className="mt-4">
          <Link to="/login">
            <Button color="primary" className="me-3">Login</Button>
          </Link>
          <Link to="/register">
            <Button color="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
