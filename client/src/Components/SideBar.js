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

      {user && appWidth.current.clientWidth < 600 ? (
        <>
          <Nav
            user={user}
            sidebar={sidebar}
            setSidebar={setSidebar}
            origin="sidebar"
          />

          <div className="logout" onClick={handleLogout}>
            logout
            {console.log("logout")}
          </div>
        </>
      ) : user ? (
        <div className="logout" onClick={handleLogout}>
          logout
          {console.log("logout")}
        </div>
      ) : !user && appWidth.current.clientWidth < 600 ? (
        <>
          <Nav
            user={user}
            sidebar={sidebar}
            setSidebar={setSidebar}
            origin="sidebar"
          />
        </>
      ) : (
        !user && appWidth.current.clientWidth > 600 &&
        <Link to="/signin">lodgin</Link>
      )}
    </section>
  )
}

export default SideBar
