import React from "react"
import { Link } from "react-router-dom"
import "./SideBar.scss"
import Nav from './Nav'

const SideBar = (props) => {

  const style = props.sidebar && {}
  return (
    <section className='sidebar' style={style}>
      <Nav sidebar={props.sidebar} setSidebar={props.setSidebar} origin='sidebar'/>
     
    </section>
  )
}

export default SideBar
