import bgImage from "../assets/img.webp";
import { useState } from "react";


import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export default function SignupPage({ onBackToLogin }) {

  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      
      await setDoc(doc(db, "users", userCred.user.uid), {
        firstName,
        lastName,
        email,
        role: "user",
        createdAt: new Date()
      });
       
      await updateProfile(userCred.user, {
      displayName: `${firstName} ${lastName}`
    });

      alert("Registration successful!");
      onBackToLogin();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-[#fff0cc]/55 backdrop-blur-[2px]"></div>

      {/* Form Box */}
      <div className="bg-[#fff8e8] p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md 
                      border border-[#e8c483] relative z-10 
                      hover:shadow-[0_0_22px_rgba(217,119,6,0.28)] 
                      transition duration-300">

        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#3a2c16] tracking-tight">
          Register Account
        </h2>

        <label className="text-sm font-medium text-[#5a4633]">First Name</label>
        <input
          type="text"
          className="w-full border border-[#e2c28e] p-3 rounded-xl mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="text-sm font-medium text-[#5a4633]">Last Name</label>
        <input
          type="text"
          className="w-full border border-[#e2c28e] p-3 rounded-xl mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="text-sm font-medium text-[#5a4633]">Email</label>
        <input
          type="email"
          className="w-full border border-[#e2c28e] p-3 rounded-xl mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium text-[#5a4633]">Password</label>
        <input
          type="password"
          className="w-full border border-[#e2c28e] p-3 rounded-xl mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 Only changed onClick */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-[#c96c04] to-[#e88c14] text-white py-3 rounded-xl text-sm font-semibold hover:brightness-110 transition-all shadow-md"
        >
          REGISTER
        </button>

        <p className="text-center mt-5 text-sm text-[#4a3d2a]">
          Already have an account?{" "}
          <span
            onClick={onBackToLogin}
            className="text-[#d97706] font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
}
