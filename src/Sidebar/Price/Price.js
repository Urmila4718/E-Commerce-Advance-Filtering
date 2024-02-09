import Input from "../../components/Input";
import "./Price.css";
import React from "react";

const Price = ({ handleChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title price-title">Price</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value={50}
          title="$0 - 50"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={100}
          title="$50 - $100"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={150}
          title="Over $100"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
