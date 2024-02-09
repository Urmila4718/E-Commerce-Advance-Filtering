import "./footwear.css";
import React  from 'react';

const Footer = ({ handleClick }) => {
  return (
    <>
      <section>
        <div className="footwear-flex">
        <div className="container">
            <footer className="py-3 my-4">
               <div>
                <div></div>
                <h2>Subscribe to our emails</h2><br/>
                  <input id="email" type="email"></input ><br/>
               
               </div>
                <p className="text-center text-body-secondary">© 2023 Company, Inc</p>
            </footer>
</div>
        </div>
      </section>
    </>
  );
};

export default Footer;
