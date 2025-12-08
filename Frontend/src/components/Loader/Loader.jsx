import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="loader-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};

export default Loader;
