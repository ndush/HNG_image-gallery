import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import Dropzone from "react-dropzone";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ImageGallery = ({ user }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, "images");
        const imagesList = await listAll(storageRef);

        const imageURLs = await Promise.all(
          imagesList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const name = item.name;
            const tags = [`tag_${name}`]; 
            return { url, name, tags };
          })
        );
        setImages(imageURLs);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleDrop = async (acceptedFiles) => {
    try {
      const storageRef = ref(storage, "images");

      await Promise.all(
        acceptedFiles.map(async (file) => {
          const imageRef = ref(storageRef, file.name);
          await uploadBytes(imageRef, file);
          const url = await getDownloadURL(imageRef);

          const name = file.name;
          const tags = [`tag_${name}`]; 
          setImages((prevImages) => [...prevImages, { url, name, tags }]);
        })
      );
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSearch = () => {
    const filteredImages = images.filter((image) =>
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setImages(filteredImages);
  };

  const drag = (e, imageName) => {
    e.dataTransfer.setData("text", imageName);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    const imageName = e.dataTransfer.getData("text");
    const target = e.target;

    if (target.classList.contains("image-card")) {
      const updatedImages = [...images];
      const sourceIndex = images.findIndex((image) => image.name === imageName);
      const targetIndex = Array.from(target.parentNode.children).indexOf(
        target
      );

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [draggedImage] = updatedImages.splice(sourceIndex, 1);
        updatedImages.splice(targetIndex, 0, draggedImage);
        setImages(updatedImages);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <ClipLoader
          color="#00BFFF"
          loading={loading}
          css={override}
          size={100}
        />
      ) : user ? (
        <div className="image-grid" onDragOver={allowDrop} onDrop={drop}>
          {images.map((image) => (
            <div
              key={image.name}
              className="image-card"
              draggable="true"
              onDragStart={(e) => drag(e, image.name)}
            >
              <img src={image.url} alt={image.name} className="card-image" />
              <div className="image-tags">
                {image.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Please log in or register to use drag-and-drop.</div>
      )}

      {user && (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>
                <b>Drag & drop images here or click to select</b>
              </p>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  user: PropTypes.object,
};

export default ImageGallery;
