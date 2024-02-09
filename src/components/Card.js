import React from "react";

const Card = ({ img, title, newPrice }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section>
          <a>{newPrice}</a>
          </section>
          
           
        </div>
      </section>
    </>
  );
};

export default Card;
