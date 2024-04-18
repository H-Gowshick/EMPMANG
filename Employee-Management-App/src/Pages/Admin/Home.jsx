import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If token does not exist, navigate to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center ">
        <animated.div style={fadeIn} className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            <span className="text-indigo-600">Welcome</span> to Admin Panel
          </h1>
          <img
            src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-caller-clipart-employee-telephone-calling-character-with-glasses-icon-flat-inscri-png-image_11055795.png"
            alt="Welcome Image"
            className="rounded-full w-40 h-40 object-cover mx-auto mb-8"
          />
        </animated.div>
      </div>
    </>
  );
};

export default HomePage;
