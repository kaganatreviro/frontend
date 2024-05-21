/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface ImageUploaderProps {
  onUpload: (file: string | null) => void;
  image: string | null;
  defaultValue?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  image,
  defaultValue,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (defaultValue) {
      setSelectedImage(null);
      onUpload(defaultValue);
    }
  }, [defaultValue, onUpload]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      onUpload(imageUrl);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    onUpload(null);
  };

  return (
    <div className="w-[200px]">
      {selectedImage || image ? (
        <div className="relative flex">
          <img
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : image || "" // Добавляем || '' для обработки случая, когда image === null
            }
            alt="Uploaded Image"
            className="w-[200px] h-[200px] rounded-md"
          />
          <button
            className="absolute top-0 right-0  w-10 h-10 bg-white border border-[#FB7E00] rounded-full flex items-center justify-center -mt-2 -mr-2 focus:outline-none"
            onClick={handleImageRemove}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="w-6 h-6 text-[#FB7E00]"
            />
          </button>
        </div>
      ) : (
        <label
          htmlFor="upload-input"
          className="w-[200px] h-[200px] rounded-md cursor-pointer text-lg text-[#FB7E00] flex flex-col justify-center items-center border-2 border-dashed border-[#FB7E00]"
        >
          <FontAwesomeIcon icon={faImage} className="w-20 h-20 mb-4" />
          <div className="text-center">Click to upload your image</div>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
