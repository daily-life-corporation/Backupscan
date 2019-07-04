/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react'

import Login from '../Login'
import Menu from '../Menu'
import Navbar from '../Navbar'

import './index.css'
import iconFolder from './folder.svg'

class Type extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: JSON.parse(localStorage.getItem('Search')) || ''
    }
  }
  componentWillMount() {
    (!this.state.type && window.location.replace('error'))
  }
  onClick = (e) => {
    localStorage.setItem('e', e)
    fetch('http://127.0.0.1:1231/api/docscan', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orgid: localStorage.getItem('visitingorgs_uid'), hn: localStorage.getItem('PatientUID'), vn: localStorage.getItem('inputVN'), doctype: e, datefrom: localStorage.getItem('inputDATEFROM'), dateto: localStorage.getItem('inputDATETO') })
    })
      .then((res) => { return res.json() })
      .then(async (data) => {
        // console.log(data)
        // console.log({ orgid: localStorage.getItem('visitingorgs_uid'), hn: localStorage.getItem('PatientUID'), vn: localStorage.getItem('inputVN'), doctype: e, datefrom: localStorage.getItem('inputDATEFROM'), dateto: localStorage.getItem('inputDATETO') })
        localStorage.setItem('SearchTYPE', JSON.stringify(data))
        window.location = '/list'
      })
  }
  render() {
    const { type } = this.state
    const { hn, vn, ParientName, BirthDate, Gender } = this.state
    // console.log(localStorage.getItem('username'))
    return (
      <div className="bg-light">
        <div>
          <Navbar />
          <div className="d-flex bd-highlight">
            <div className="p-2 flex-shrink-0 bd-highlight bd-sidebar bg-white shadow rounded">
              <div className="container">
                <Menu />
              </div>
            </div>
            <div className="p-2 w-100 bd-highlight">
              <div>
                {localStorage.getItem('username') ? <div className="has-text-centered">
                  <section className="">
                    <div className="container">
                      <div className="shadow-sm p-3 bg-white rounded">
                        <b>
                          {!hn && <div> <b>Hi! {localStorage.getItem('username')} </b> <b className="text-warning"> @ </b> {localStorage.getItem('visitingorgs_name')} </div>}
                          {/* {hn && <small> <b> H.N. </b> {hn} <b className="text-warning">|</b> </small>} */}
                          {ParientName && <small> <b> NAME </b> {ParientName} <b className="text-warning">|</b> </small>}
                          {vn && <small> <b> VN </b> {vn} <b className="text-warning">|</b> </small>}
                          {/* {TypeName && <small> <b> DOC TYPE </b> {TypeName} <b className="text-warning">|</b> </small>} */}
                          {BirthDate && <small> <b> BirthDate </b> {BirthDate.toString().slice(0, 10)} <b className="text-warning">|</b> </small>}
                          {/* {datefrom && <small> <b> Date From </b> {Date(datefrom).toString().slice(0, 10)} <b className="text-warning">|</b> </small>}
                          {dateto && <small> <b> Date To </b> {Date(dateto).toString().slice(0, 10)} <b className="text-warning">|</b> </small>} */}
                          {Gender && <small> <b> Gender </b> {Gender} </small>}
                        </b>
                      </div>
                      <br/>
                      <div className="row">
                        {type.map((item, key) => (
                          <div key={key} className="col-lg-3" >
                            <small className="title">
                              <a onClick={() => this.onClick(item.TypeCode)}>
                                <div className="row">
                                  <div className="col-12">
                                    {/* <small className="far fa-folder icon-folder-size  text-dark"></small> */}
                                    <img src={iconFolder} width="100" />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <small><center className="text-dark">{item.TypeName}</center></small>
                                  </div>
                                </div>
                              </a>
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div> : <Login/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Type
