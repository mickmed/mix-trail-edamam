import React from "react"
import { useHistory, Link } from "react-router-dom"
import "./Header.scss"
import Nav from './Nav'
const Header = (props) => {
  const appWidth = props.appWidth.current && props.appWidth.current.clientWidth
  const history = useHistory()
  let style =
    appWidth && appWidth < 600 ? { display: "none" } : { display: "flex" }
  let links = ["my recipes", "create a recipe", "about"]

 

  return (
    <header>
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
      <p className='attribution'>Powered by Nutritionix</p>

      </Link>
      <div
        className="menu-items"
        style={
          appWidth && appWidth < 600 ? { display: "none" } : { display: "flex" }
        }
      >

      <Nav style={
          appWidth && appWidth > 600 ? { display: "none" } : { display: "flex" }
        } sidebar={props.sidebar} setSidebar={props.setSidebar} />

  
      </div>


      <div
        className="burger"
        onClick={()=>props.setSidebar(!props.sidebar)}
        style={
          appWidth && appWidth < 600
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <ion-icon name="menu-outline"></ion-icon>
      </div>
    </header>
  )
}

export default Header
