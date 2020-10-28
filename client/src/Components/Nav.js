import React, { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import "./Nav.scss"

const Nav = (props) => {
  const history = useHistory()
  const { sidebar, setSidebar, origin, user } = props

  let links = ["recipes", "calculate", "about"]

  const closeModal = (link) => {
    origin === "sidebar" && setSidebar(!sidebar)

    link =
      link === "recipes"
        ? "recipes"
        : link === "calculate"
        ? "recipes/new"
        : link === "about" && "about"

    history.push(`/${link}`)
  }
 
  return (
    <nav>
       {console.log(user)}
      {links.map((link, idx) => (
        // link = link === 'account' && <ion-icon name="person-outline"></ion-icon>
        <a className="menu-items" key={idx} onClick={() => closeModal(link)}>
          {link}
        </a>
      ))}

      {console.log(user !== null && user.username)}
        

      {/* {!user ? (
        <Link to="/signin">
          <div className="menu-items">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </Link>
      ) : (
        <Link>
          <div className="username" onClick={() => setSidebar(!sidebar)}>
            {user.username.charAt(0)}
          </div>
        </Link>
      )} */}
      
    </nav>
  )
}

export default Nav
