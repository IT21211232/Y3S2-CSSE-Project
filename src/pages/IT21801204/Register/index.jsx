import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import logoImageYellow from "../../../assets/logo/logoyellow.svg";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase"; // Firestore reference

const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false); // Loader state

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from submitting
    setLoading(true); // Show loader when registration starts

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user to Firestore with role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });

      alert("Success! User account created.");

      // Clear form states after successful registration
      setEmail("");
      setPassword("");
      setRole("USER");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false); // Hide loader once process finishes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dee140] w-full px-4">
      <div className="logo mb-10 text-center">
        <img
          className="w-32 mx-auto black-filter"
          src={logoImageYellow}
          alt="EcoBin Logo"
        />
        <p className="text-2xl font-bold">EcoBin</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Create your ID
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4 flex space-x-2">
            <input
              id="firstname"
              type="text"
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
              placeholder="Firstname"
            />
            <input
              id="lastname"
              type="text"
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
              placeholder="Lastname"
            />
          </div>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Track email input
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Track password input
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2">
              Select Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)} // Track role selection
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="COLLECTOR">Collector</option>
            </select>
          </div>
          <div className="flex items-center mb-4 text-sm">
            <input type="radio" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-black">
              By proceeding, you agree to the{" "}
              <a href="#" className="text-[#b7b935] underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full bg-[#dee140] text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-[#dee140] transition-colors"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Creating Account..." : "Sign up with email"}
            </button>
          </div>
        </form>
        <hr className="my-6" />
        <p className="text-center text-black mb-4">Or Signup with</p>
        <div className="flex flex-col sm:flex-row justify-around mb-4">
          <button className="flex items-center border-2 border-solid border-gray-200 p-2 rounded-lg hover:bg-gray-300 w-full sm:w-40 justify-center mb-2 sm:mb-0">
            <FontAwesomeIcon icon={faGoogle} className="text-black mr-2" />
            Google
          </button>
          <button className="flex items-center border-2 border-solid border-gray-200 p-2 rounded-lg hover:bg-gray-300 w-full sm:w-40 justify-center">
            <FontAwesomeIcon icon={faApple} className="text-black mr-2" />
            Apple
          </button>
        </div>
        <p className="text-center text-black text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#b7b935] font-bold">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
