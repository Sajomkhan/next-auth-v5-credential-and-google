"use client";
import { logout } from "@/actions/authActions";

const Logout = () => {
  return (
    <div
      onClick={()=>logout()}
      className="bg-gray-800 text-white px-3 py-1 cursor-pointer rounded-sm"
    >
      Logout
    </div>
  );
};

export default Logout;
