/* eslint-disable */
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setUploadedImage(file);
      setIsLoading(true);
      onUpload(file);
    },
    [onUpload]
  );

  const resetImage = () => {
    if (!isLoading) {
      setUploadedImage(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="dropzone w-[200px] h-[200px]  flex items-center justify-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {uploadedImage ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="object-cover w-[200px] h-[200px] rounded-full"
          />
          <button
            className="absolute bottom-0 right-[10px] w-14 h-14 bg-white border border-[#FB7E00] rounded-full flex items-center justify-center -mt-2 -mr-2 focus:outline-none"
            onClick={resetImage}
          >
            <FontAwesomeIcon
              icon={faUpload}
              className="w-10 h-10 text-[#FB7E00]"
            />
          </button>
        </div>
      ) : (
        <div className="w-[200px] h-[200px] rounded-md cursor-pointer text-lg text-[#FB7E00] flex flex-col justify-center items-center border-2 border-dashed border-[#FB7E00]">
          <FontAwesomeIcon icon={faImage} className="w-20 h-20 mb-4" />
          <div className="text-center">Click to upload your image</div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;