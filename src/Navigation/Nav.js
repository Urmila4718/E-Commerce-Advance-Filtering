import {
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineSearch,
} from "react-icons/ai";
import "./Nav.css";
import React from "react";
import { useState } from "react";

const iconStyle = {
  cursor: "pointer", // Change cursor to a pointer hand on hover
};
const Nav = ({ handleInputChange, query, handleFileChange,selectedImage }) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <nav>
      {/* <div>
      <img
          src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/nfjpjdprdvrgzzzifq4b"
          style={{ width: "100px", padding: "9px 0px" }}></img>
      </div> */}
      <div className="container">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Catalog</a></li>
            <li><a href="#">Contact</a></li>
            <li>
              <div style={{ backgroundColor: "#f7f6f6" }}>
                <input
                className='search-input'
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter your search shoes."
              />
            </div>
            </li>
            <li>
              <div style={{ backgroundColor: "#f7f6f6" }}>
                <button type="button" style={{ border: "none"}}>
                  <label htmlFor="fileInput">
                  <i className="fa fa-camera" style={{ fontSize: "18px" }}></i>
                  </label>
                </button>
              </div>
            </li>
           <li>
           <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange}/>
            {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    style={{ width: '60px',height:'60px'}}
                  />
                )}
          </li>
          </ul>
        </div>
      <div>
        <a href="#" onClick={toggleInputVisibility}>
          <AiOutlineSearch className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
