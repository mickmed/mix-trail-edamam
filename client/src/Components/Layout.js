import React from "react"
import "./Layout.scss"
// import Nav from "./Nav"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./SideBar"

const Layout = (props) => {
  // const { handleChange } = props

  return (
    <div className="layout">
      {console.log(props)}
      <Header appWidth={props.appWidth} sidebar={props.sidebar} setSidebar={props.setSidebar} />
      {props.sidebar && <Sidebar sidebar={props.sidebar} setSidebar={props.setSidebar} />}
      <div className="layout-children" onClick={()=>props.setSidebar()}>{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
