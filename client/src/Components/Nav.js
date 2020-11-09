import React from "react"
import { useHistory, Link } from "react-router-dom"
import "./Nav.scss"

const Nav = (props) => {
  const history = useHistory()
  const { sidebar, setSidebar, origin, user } = props

  let links = ["recipes", "calculate", "about"]

  const closeModal = (link) => {
    origin === "sidebar" && setSidebar(!sidebar)

    history.push(`/${link}`)
  }

  return (
    <nav onClick={closeModal}>
      {console.log(links)}
      {links.map((link, idx) => {
        // link = link === 'account' && <ion-icon name="person-outline"></ion-icon>
        let routeName =
          link === "recipes"
            ? "recipes"
            : link === "calculate"
            ? user
              ? "recipes/new"
              : "signin"
            : link === "about" && "about"

            console.log(routeName)
        return (
          <Link to={routeName} key={idx} className='menu-items'>
            {link}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
