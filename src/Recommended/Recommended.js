import Button from "../components/Button";
import "./Recommended.css";
import React  from 'react';

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        {/* <h2 className="recommended-title">Recommended</h2> */}
        <div className="recommended-flex">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {/* <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Nike" title="Nike" />
          <Button onClickHandler={handleClick} value="Adidas" title="Adidas" />
          <Button onClickHandler={handleClick} value="Puma" title="Puma" />
          <Button onClickHandler={handleClick} value="Vans" title="Vans" /> */}
        </div>
      </div>
    </>
  );
};

export default Recommended;
