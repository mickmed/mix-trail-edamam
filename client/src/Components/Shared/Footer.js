import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div>
        <a
          href="https://mickroth.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          Site by Mick Roth &copy; 2020
        </a>
        <a
          href="https://github.com/mickmed"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <Link to="/about">about this site</Link>
        <a
          href="https://mickroth.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          about mick roth{" "}
        </a>
      </div>
      <div>
        <a
          href="https://www.nutritionix.com/business/api"
          target="_blank"
          className="attribution"
          rel="noopener noreferrer" 
        >
          Powered by Nutritionix
          <img
            src="https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png"
            alt="icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
