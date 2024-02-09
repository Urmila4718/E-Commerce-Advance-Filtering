import React, { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Sidebar from "./Sidebar/Sidebar";
import Footwear from "./footer/footer"
import Card from "./components/Card";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data1, setdata1] = useState(null); // State to store the uploaded file

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
 
  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // const imagePaths = ["images\\1.jpg", "images/3.jpg", "images\\4.jpg", "images\\2.jpg"];
  const imagePathSet = new Set(data1);

  const filteredData1 = products.filter((item) => {
  // console.log("Processing item:", item);

  return imagePathSet.has(item.img)
});
  // console.log("Image Paths:", data1);
  // console.log(typeof data1);
  // console.log("Filtered Data:", filteredData);
  
  // console.log(filteredData);
  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query, data1) {
    let filteredProducts = products;
     
    if (data1)
    {
      filteredProducts = filteredData1;
      // alert('searched');
    }
    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
   
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        console.log("Selected Image:", e.target.result); // Add this line
        

      };
  
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedImage(null);
    }
    if (!selectedFile) {
      return;
    }
    
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace with the URL of your Flask backend
      const apiUrl = 'http://localhost:5000/upload';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Handle non-success status codes (e.g., 4xx or 5xx)
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }

      // Request was successful
      const data = await response.json();
      console.log('Success:', JSON.stringify(data));
      const modifiedImagePaths = data.map(path => path.replace(/\\/g, '/'));
      // alert(modifiedImagePaths)
      setdata1(modifiedImagePaths);
      console.log(modifiedImagePaths);
      console.log(typeof modifiedImagePaths);
      // alert(data);


    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error:', error);
    }
    
  };
  const result = filteredData(products, selectedCategory, query, data1);
 
  console.log(selectedImage)
  
  return (
    <>
      <Navigation query={query} handleInputChange={handleInputChange} handleFileChange={handleFileChange}
        selectedImage={selectedImage} />
      <Sidebar handleChange={handleChange} />
      <Products result={result} />
      {/* <Footwear/> */}
      
    </>
  );
}

export default App;
