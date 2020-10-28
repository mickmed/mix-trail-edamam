import React from "react"
import { useHistory, Link } from "react-router-dom"
import "./Header.scss"
import Nav from "./Nav"
const Header = (props) => {
  const appWidth = props.appWidth.current && props.appWidth.current.clientWidth
  const { user, sidebar, setSidebar } = props
  const history = useHistory()

  // const style = appWidth < 600 ? { position: "relative", top: "100%" } : {}

  return (
    <header>
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
        <p className="attribution">Powered by Nutritionix</p>
      </Link>

      {appWidth > 600 ? (
        <Nav sidebar={sidebar} setSidebar={setSidebar} user={user} />
      ) : user ? (
        <Link>
          <div
            className="username"
           
            onClick={() => setSidebar(!sidebar)}
          >
            {user.username.charAt(0)}
          </div>
        </Link>
      ) : (
        <div className="burger" onClick={() => props.setSidebar(!sidebar)}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
      )}

      {!user &&
        
            <Link to="/signin">
              <div className="menu-items">
                <ion-icon name="person-outline"></ion-icon>
              </div>
            </Link>
          }
    </header>
  )
}

export default Header
