/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/no-redundant-roles */
import * as moment from 'moment'
import React, { Component } from 'react'
import Swal from 'sweetalert2'

class ALinkOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    localStorage.clear()
    const { match: { params } } = this.props
    // console.log(params)
    // console.log(params.username)
    fetch('http://10.100.20.155:5555/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: params.username, password: params.password })
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
        localStorage.setItem('username', data.name)
        // console.log(data)
        // console.log(params.orgid)
        data && data.visitingorgs.forEach((element, index) => {
          element.uid === params.orgid && localStorage.setItem('visitingorgs_name', element.name)
        })
        // console.log(localStorage.getItem('visitingorgs_name'))
        !data.error
          ? fetch('http://127.0.0.1:1231/api/pGetDocType', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'access-control-allow-origin': '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orgid: params.orgid, hn: params.hn, vn: '', doctype: '', datefrom: '2010-01-01', dateto: moment(new Date()).format('YYYY-MM-DD') })
          })
            .then((res) => { return res.json() })
            .then(async (data) => {
              // console.log(data)
              // console.log(({ orgid: params.orgid, hn: params.hn, vn: '', doctype: '', datefrom: '2010-01-01', dateto: moment(new Date()).format(('YYYY-MM-DD')) }))
              localStorage.setItem('Search', JSON.stringify(data))
              if (data.length > 0) {
                localStorage.setItem('HN', data[0].HN)
                localStorage.setItem('inputVN', '')
                localStorage.setItem('ParientName', data[0].ParientName)
                localStorage.setItem('PatientUID', data[0].PatientUID)
                localStorage.setItem('TypeName', data[0].TypeName)
                localStorage.setItem('TypeCode', data[0].TypeCode)
                localStorage.setItem('BirthDate', data[0].BirthDate)
                localStorage.setItem('Gender', data[0].Gender)
                localStorage.setItem('TitleName', data[0].TitleName)
                localStorage.setItem('visitingorgs_uid', params.orgid)
                localStorage.setItem('inputDATEFROM', new Date('2010-01-01').toISOString())
                localStorage.setItem('inputDATETO', new Date().toISOString())
                // console.log(JSON.parse(localStorage.getItem('Search')))
                window.location.replace('/type')
                // window.location = '/type'
              } else {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Your session has been expired, please log in again!'
                }).then((result) => { result.value && window.location.replace('/login') })
              }
            })
          : Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Your session has been expired, please log in again!'
          }).then((result) => { result.value && localStorage.clear(); window.location.replace('/login') })
      })
  }
  render() {
    return (
      <div className="has-text-centered">
        <section className="hero is-info">
          <div className="container">
            <h1 className="title">Welcome To Link Page</h1>
            <h2 className="page-title">Search Doc Scan</h2>
          </div>
        </section>
      </div>
    )
  }
}

export default ALinkOut
