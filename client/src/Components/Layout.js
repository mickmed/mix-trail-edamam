import React from "react"
import "./Layout.scss"
// import Nav from "./Nav"
import Footer from "./Footer"
import Nav from "./Nav"

const Layout = (props) => {
  // const { handleChange } = props

  return (
    <div className="layout">
      <Nav />

      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout



