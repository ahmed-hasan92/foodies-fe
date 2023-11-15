import React from "react";

const ChefItem = () => {
  return (
    <div className="bg-white py-[30px] gap-[20px] w-[350px] flex flex-row justify-center items-center rounded-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)]">
      <div className="h-[80px] w-[80px] border border-solid-[2px] border-white rounded-full overflow-hidden ">
        {/* <img className="object-cover" src={profileImageUrl} alt="Profile" /> */}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-[#333333] font-bold flex gap-[5px]">
          Name:
          <span className="font-normal">
            {/* {isLoading ? "loading..." : data?.name} */}
          </span>
        </div>
        <div className="text-[#333333] font-bold flex gap-[5px]">
          Username:
          <span className="font-normal">
            {/* {isLoading ? "loading..." : data?.username} */}
          </span>
        </div>
        <div className="pt-[5px]">
          <button
            type="button"
            className="px-2 py-1 bg-[#CFCFCF] text-white rounded-md hover:bg-[#b73232] hover:text-white hover:font-bold transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefItem;
