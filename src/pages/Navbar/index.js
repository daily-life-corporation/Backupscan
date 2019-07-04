/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react'
import Swal from 'sweetalert2'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hn: localStorage.getItem('HN'),
      ParientName: localStorage.getItem('ParientName'),
      TypeName: localStorage.getItem('TypeName'),
      BirthDate: localStorage.getItem('BirthDate'),
      Gender: localStorage.getItem('Gender'),
      vn: localStorage.getItem('inputVN'),
      doctype: localStorage.getItem('inputDOCTYPE'),
      datefrom: localStorage.getItem('inputDATEFROM'),
      dateto: localStorage.getItem('inputDATETO'),
      TitleName: localStorage.getItem('TitleName'),
      search: JSON.parse(localStorage.getItem('Search'))
    }
  }
  componentDidMount() {
    this.inputHN = localStorage.getItem('inputHN')
    this.inputDATEFROM = localStorage.getItem('inputDATEFROM')
    this.inputDATETO = localStorage.getItem('inputDATETO')
    this.inputVN = localStorage.getItem('inputVN')
    this.inputDOCTYPE = localStorage.getItem('inputDOCTYPE')
    // console.log(this.inputHN)
    // console.log(this.state.hn)
    // console.log(this.state.search)
    // this.setState({ hn: this.state.search.HN || '', ParientName: this.state.search.ParientName || '', TypeName: this.state.search.TypeName || '', BirthDate: this.state.search.BirthDate || '', Gender: this.states.search.Gender || '' })
  }
  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to log out?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log Out'
    }).then((result) => {
      if (result.value) {
        localStorage.clear()
        window.location.replace('/')
      }
    })
  }
  onClick() {
    window.location = '/'
  }
  render() {
    const { hn, vn, ParientName, BirthDate, Gender, TitleName } = this.state
    return (
      <nav className="navbar navbar-light flex-column flex-md-row bd-navbar shadow-sm bg-white rounded">
        <div className="navbar-brand" onClick={() => this.onClick() }>
          <div className="navbar-item">
            <img src={process.env.PUBLIC_URL + '/images/LOGO.png'} width="30" height="30" className="d-inline-block align-top" alt="" />
            &nbsp;&nbsp;&nbsp;DOCSCAN
          </div>
        </div>
        <h4 className="navbar-text has-text-centered">
          {!hn && <div> <b>Hi! {localStorage.getItem('username')} <b className="text-warning"> @ </b>{localStorage.getItem('visitingorgs_name')}</b> </div>}
          {/* {hn && <small> <b> H.N. </b> {hn} <b className="text-warning">|</b> </small>} */}
          {TitleName && <small>{TitleName} </small>}
          {ParientName && <small> <b> </b>{ParientName} <b className="text-warning">|</b> </small>}
          {vn && <small> <b> VN </b> {vn} <b className="text-warning">|</b> </small>}
          {/* {TypeName && <small> <b> DOC TYPE </b> {TypeName} <b className="text-warning">|</b> </small>} */}
          {BirthDate && <small> <b> BirthDate </b> {BirthDate.toString().slice(0, 10)} <b className="text-warning">|</b> </small>}
          {/* {datefrom && <small> <b> Date From </b> {Date(datefrom).toString().slice(0, 10)} <b className="text-warning">|</b> </small>}
          {dateto && <small> <b> Date To </b> {Date(dateto).toString().slice(0, 10)} <b className="text-warning">|</b> </small>} */}
          {Gender && <small> <b> Gender </b> {Gender} </small>}
          {Gender && <small>  <b className="text-warning">|</b>  <b> </b> {localStorage.getItem('visitingorgs_name')} </small>}
        </h4>
        <a className="navbar-item" onClick={this.logOut}>
          <i className="fas fa-sign-out-alt text-dark"></i>
        </a>
      </nav>
    )
  }
}

export default Navbar
