import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Tinder.css";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <div className="item">
    <img
      src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
  <div className="item">
    <img
      src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
  <div className="item">
    <img
      src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
];

const Gallery = () => {
  return <AliceCarousel autoWidth mouseTracking items={items} />;
};

export default Gallery;
