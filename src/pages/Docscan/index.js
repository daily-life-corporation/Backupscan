/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react'

import Login from '../Login'
import Menu from '../Menu'
import Navbar from '../Navbar'

class Docscan extends Component {
  render() {
    localStorage.removeItem('HN')
    localStorage.removeItem('ParientName')
    localStorage.removeItem('TypeName')
    localStorage.removeItem('BirthDate')
    localStorage.removeItem('Gender')
    localStorage.removeItem('inputVN')
    localStorage.removeItem('inputDOCTYPE')
    localStorage.removeItem('inputDATEFROM')
    localStorage.removeItem('inputDATETO')
    localStorage.removeItem('TitleName')
    localStorage.removeItem('Search')
    // console.log(localStorage.getItem('inputORGID'))
    return (
      <div>
        { localStorage.getItem('username')
          ? <div className="bg-light">
            <div>
              <Navbar />
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-shrink-0 bd-highlight bd-sidebar bg-white shadow rounded">
                  <div className="container">
                    <Menu />
                  </div>
                </div>
                <div className="p-2 w-100 bd-highlight">
                  <div className="has-text-centered">
                    <section className="hero is-info">
                      <div className="container">
                        <h2 className="page-title">Hi! {localStorage.getItem('username')}</h2>
                        <h1 className="title">Welcome To Doc Scan HomePage</h1>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <Login />
        }
      </div>
    )
  }
}

export default Docscan
