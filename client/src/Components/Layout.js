import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Layout.scss"
// import Nav from "./Nav"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./SideBar"
import Search from "./Search"

const Layout = (props) => {
  const {
    handleLogout,
    user,
    appWidth,
    sidebar,
    setSidebar,
    children,
    recipes,
    handleChange,
    searchString
  } = props
  const history = useHistory()

  

  return (
    <div className="layout">
      <Header
        appWidth={appWidth}
        sidebar={sidebar}
        setSidebar={setSidebar}
        user={user}
        handleChange={handleChange}
        searchString={searchString}
      />

      {sidebar && (
        <Sidebar
          user={user}
          sidebar={sidebar}
          setSidebar={setSidebar}
          handleLogout={handleLogout}
          appWidth={appWidth}
        />
      )}

      <div className="layout-children" onClick={() => setSidebar()}>
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
