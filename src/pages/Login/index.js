// eslint-disable-next-line jsx-a11y/href-no-hash
import React, { Component } from 'react'
import Swal from 'sweetalert2'

import './index.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // username: 'somsak.nu',
      // password: 'abc@123'
      username: null,
      password: null
    }
  }
  loginusername = ''
  onChangeUsername(event) {
    this.setState({ username: event.target.value })
  }
  loginpassword = ''
  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }
  visitingorgsname = []
  logIn = () => {
    if (this.state.username != null || this.state.password != null || this.state.username !== undefined || this.state.password !== undefined) {
      fetch('http://10.100.20.155:5555/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'access-control-allow-origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: this.state.username, password: this.state.password })
      })
        .then(function(response) {
          if (!response.ok) {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
          return response.json()
        })
        .then(async (data) => {
          // console.log(data)
          this.visitingorgsname = []
          if (data.visitingorgs !== undefined) {
            data.visitingorgs.forEach((user) => {
              if (user !== undefined) {
                this.visitingorgsname.push(user.name)
              }
            })
          }
          if (data.name !== undefined) {
            const { value: orgs } = await Swal.fire({
              title: 'Select field validation',
              input: 'select',
              inputOptions: this.visitingorgsname,
              inputPlaceholder: 'Select a Business Unit',
              showCancelButton: true
            })
            let val = this.visitingorgsname[orgs]
            if (orgs) {
              localStorage.setItem('username', data.name)
              localStorage.setItem('visitingorgs_name', val)
              localStorage.setItem('visitingorgs_uid', data.visitingorgs[orgs].uid)
              localStorage.setItem('visitingorgs_id', data.visitingorgs[orgs]._id)
              localStorage.setItem('loginuser', JSON.stringify(data))
              window.location.replace('/')
            }
          } else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        })
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
  render() {
    return (
      <div className="has-text-centered">
        <section className="hero is-info">
          <div className="container">
            <div className="login-page">
              <div className="form">
                <img src={process.env.PUBLIC_URL + '/images/LOGO.png'} width="100" height="100" className="d-inline-block align-top" alt="" />
                <br />
                <br />
                <div className="menu-label">
                  <div className="field">
                    <label className="label">Doc Scan Login</label>
                  </div>
                </div>
                <form className="login-form">
                  <input type="text" onChange={this.onChangeUsername.bind(this)} placeholder="username" />
                  <input type="password" onChange={this.onChangePassword.bind(this)} placeholder="password" />
                </form>
                <button onClick={this.logIn}>login</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Login
