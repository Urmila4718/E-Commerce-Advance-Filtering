import "./Category.css";
import Input from "../../components/Input";
import React from "react";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="shoes"
          title="Shoes"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="furniture"
          title="Furniture"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="watch"
          title="Watch"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="apparel"
          title="Apparel"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="electronics"
          title="Electronics"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
