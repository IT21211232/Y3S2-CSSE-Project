import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import logoImageYellow from "../../../assets/logo/logoyellow.svg";
import { db, auth } from "../../../config/firebase";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("USER"); // New state for role selection
  const [loading, setLoading] = useState(false); // State for loader

  useEffect(() => {
    redirect();
  }, []);

  const redirect = () => {
    const storedRole = localStorage.getItem("role");

    if (storedRole === "ADMIN") {
      console.log("Login as admin");
      navigate("/assigncollectors");
      // Add navigation for admin
    } else if (storedRole === "USER") {
      console.log("Login as user");
      navigate("/user/dashboard");
      // Add navigation for user
    } else if (storedRole === "COLLECTOR") {
      console.log("Login as COLLECTOR");
      navigate("/viewdata");
      // Add navigation for collector
    } else {
      localStorage.setItem("role", "PUBLIC");
      navigate("/login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const storedRole = userDoc.data().role;

        localStorage.setItem("role", storedRole);

        // Navigate based on the selected role and stored role
        if (storedRole === selectedRole) {
          alert("Login successful!");
          redirect();
        } else {
          alert("Selected role does not match your stored role.");
        }
      } else {
        alert("User role not found.");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Invalid credentials, please try again.");
      } else {
        console.error("Login error:", error);
        alert(error.message);
      }
    } finally {
      setLoading(false); // Hide loader
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
          Login to your account
        </h2>
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="loader animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <form onSubmit={handleLogin} className={loading ? "opacity-50" : ""}>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140] text-sm sm:text-base"
              placeholder="Email"
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140] text-sm sm:text-base"
              placeholder="Password"
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          {/* Role selection dropdown */}
          <div className="mb-6">
            <label htmlFor="role" className="block mb-2">
              Select Role:
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140]"
              disabled={loading} // Disable dropdown while loading
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="COLLECTOR">Collector</option>
            </select>
          </div>
          <div className="flex justify-between mb-4 text-sm sm:text-base">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" disabled={loading} />
              Remember me
            </label>
            <a
              href="#"
              className="text-black text-sm sm:text-base"
              disabled={loading}
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-[#dee140] text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-[#dee140] transition-colors"
              disabled={loading} // Disable button while loading
            >
              Login
            </button>
          </div>
        </form>
        <hr className="my-6" />
        <p className="text-center text-black mb-4">Or login with</p>
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
        <p className="text-center text-black text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#b7b935] font-bold">
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
