import React, { } from "react"
import "./Layout.scss"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./SideBar"

const Layout = (props) => {
  const {
    handleLogout,
    user,
    appWidth,
    sidebar,
    setSidebar,
    children,
   
    handleChange,
    searchString
  } = props


  

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
