import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

export default function ImageComponent({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      {images && images.length
        ? images.map((image, index) => (
            <Carousel.Item key={image.id}>
              <a
                key={index}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </a>
              <Carousel.Caption>
                <h3>{`Slide ${index + 1}`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        : "No imafe found,"}
    </Carousel>
  );
}
