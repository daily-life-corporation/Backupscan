/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {}
  onClick() {
    localStorage.clear(); window.location.replace('/login')
  }
  render() {
    return (
      <div className="has-text-centered">
        <section className="hero is-info">
          <div className="container">
            <h1 className="title">404 Page Not Found</h1>
            <h2 className="page-title">ขออภัยไม่พบเว็บไซต์ที่คุณต้องการ</h2>
            <div className="navbar-item text-dark  shadow-sm bg-white rounded" onClick={() => this.onClick() }>
              <div className="text-justify text-right col-lg-5"> คลิกที่นี่เพื่อกลับสู่หน้าหลัก และหน้าเริ่มต้นใช้งาน </div>
              <div className="col-lg-2">
                <img src={process.env.PUBLIC_URL + '/images/LOGO.png'} width="30" height="30" className="d-inline-block align-top" alt="" />
                {/* &nbsp;&nbsp;&nbsp;DOCSCAN */}
              </div>
              <div className="text-justify text-left col-lg-5"> Click here to return to the main page and start page.</div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Navbar
