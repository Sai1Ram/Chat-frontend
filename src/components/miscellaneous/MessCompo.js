import React from "react";

const MessCompo = ({ left, right, message }) => {
  return (
    <>
      <div className={` p-3 rounded-lg ${left ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13'}`}>
        <div className={`flex flex-row items-center ${right ? 'justify-start flex-row-reverse' : ''}`}>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            A
          </div>
          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <div>{message}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessCompo;

