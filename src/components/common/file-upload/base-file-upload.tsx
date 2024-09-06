import React from "react";

interface FileUploadProps {
  labelClass?: string;
}

export default function BaseFileUpload({ labelClass }: FileUploadProps) {
  return (
    <div className="relative w-full">
      <div className="items-center justify-center max-w-xl mx-auto">
        <label
          className={`flex justify-center w-full h-14 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-full appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${labelClass}`}
          id="drop"
        >
          <span className="flex items-center space-x-2">
            <img src="/icons/upload.png" alt="upload" />
            <span className="font-medium text-sm lg:text-medium text-center">
              Drop items here or
              <span className="font-extrabold ml-[4px]">Browse Files</span>
            </span>
          </span>
          <input
            type="file"
            name="file_upload"
            className="hidden"
            accept="image/png,image/jpeg"
          />
        </label>
      </div>
    </div>
  );
}
