import React from "react";

const Input = ({ name, onChange }) => {
  return (
    <div className="flex justify-center ">
      <h1 className="w-[25%]">{name}</h1>
      <input
        onChange={onChange}
        className="w-[70%] border pl-2 border-black rounded-md"
        placeholder={name}
      />
    </div>
  );
};

export default Input;
