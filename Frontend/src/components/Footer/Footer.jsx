import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t mt-10 py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SLA Monitoring System. All rights reserved.
        </p>

        <p className="text-sm text-gray-500">
          Built by <span className="font-semibold">Abhishek Kanade</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
