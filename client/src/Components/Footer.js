import React from "react"
import { Link } from "react-router-dom"
import "./footer.scss"

const Footer = () => {
  return (
    <footer>
      <div>
        <a href="https://mickroth.com/about" target="_blank">
          Site by Mick Roth &copy; 2020
        </a>
        <a href="https://github.com/mickmed" target="_blank">
          github
        </a>
        <Link to="/about">about this site</Link>
        <a href="https://mickroth.com/about" target="_blank">
          about mick roth{" "}
        </a>
      </div>
      <div>
        <a
          href="https://www.nutritionix.com/business/api"
          target="_blank"
          className="attribution"
        >
          Powered by Nutritionix
        </a>
      </div>
    </footer>
  )
}

export default Footer
