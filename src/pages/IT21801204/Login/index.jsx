import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import logoImageYellow from "../../../assets/logo/logoyellow.svg";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dee140] w-full px-4">
      <div className="logo mb-10 text-center">
        <img
          className="w-32 mx-auto black-filter"
          src={logoImageYellow}
          alt=""
        />
        <p className="text-2xl font-bold">EcoBin</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login to your account
        </h2>
        <form>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140] text-sm sm:text-base"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-[#dee140] text-sm sm:text-base"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between mb-4 text-sm sm:text-base">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-black text-sm sm:text-base">
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-[#dee140] text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-[#dee140] transition-colors"
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

LoginPage.propTypes = {};

export default LoginPage;
