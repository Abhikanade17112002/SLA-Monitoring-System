// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white/5 backdrop-blur-xl border-t border-white/10 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row 
                      items-center justify-between gap-4 text-gray-400">

        <p className="text-sm">
          © {new Date().getFullYear()} 
          <span className="text-blue-400 font-semibold ml-1">
            SLA Monitor
          </span>
          . All rights reserved.
        </p>

        <p className="text-sm">
          Built with ❤️ by 
          <span className=" font-semibold ml-1 text-black-400 transition">
            Abhishek Kanade
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
