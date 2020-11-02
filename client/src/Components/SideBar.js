import React from "react"
import { Link } from "react-router-dom"
import "./SideBar.scss"
import Nav from "./Nav"

const SideBar = (props) => {
  const { sidebar, setSidebar, user, handleLogout, appWidth } = props

  const style = sidebar && {}

  return (
    <section className="sidebar" style={style}>
      {console.log("logout", user, appWidth.current.clientWidth)}

      {appWidth.current.clientWidth < 900 && (
        <>
          <Nav
            user={user}
            sidebar={sidebar}
            setSidebar={setSidebar}
            origin="sidebar"
          />
        </>
      )}

      {user ? (
        <div className="logout" onClick={handleLogout}>
          logout
          {console.log("logout")}
        </div>
      ) : (
        <Link to="/signin">login</Link>
      )}
    </section>
  )
}

export default SideBar
