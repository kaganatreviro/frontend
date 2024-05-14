/* eslint-disable */
import React, { useState } from "react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      onUpload(file); // Call the onUpload callback with the uploaded file
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div>
      {image ? (
        <div>
          <img src={URL.createObjectURL(image)} alt="Uploaded Image" />
          <button onClick={handleImageRemove}>Remove Image</button>
        </div>
      ) : (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;