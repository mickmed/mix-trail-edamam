import React from "react"
import "./layout.scss"
import Nav from "./Nav"
import Footer from "./Footer"

const Layout = (props) => {
  const { handleChange } = props

  return (
    <div className="layout">
      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
