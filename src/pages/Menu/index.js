/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/no-redundant-roles */
import * as moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import React, { Component } from 'react'
import Swal from 'sweetalert2'

import 'react-day-picker/lib/style.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDayFrom: '',
      selectedDayTo: '',
      // hn: '19-24-251425',
      hn: localStorage.getItem('inputHN'),
      // hn: '55-19-001439',
      // hn: '',
      vn: '',
      doctype: '',
      orgid: localStorage.getItem('visitingorgs_uid')
    }
  }

  inputHN = ''
  inputVN = ''
  inputDOCTYPE = ''
  inputDATEFROM = ''
  inputDATETO = ''
  inputORGID = localStorage.getItem('visitingorgs_uid')

  handleDayChangeDayFrom(day) {
    this.setState({ selectedDayFrom: day })
  }

  handleDayChangeDayTo(day) {
    this.setState({ selectedDayTo: day })
    // console.log(day)
  }

  onChangeHN(event) {
    this.setState({hn: event.target.value})
  }

  onChangeVN(event) {
    this.setState({vn: event.target.value})
  }

  onChangeDocType(event) {
    this.setState({doctype: event.target.value})
  }

  btnSearch = () => {
    localStorage.setItem('inputHN', this.state.hn)
    if (this.state.selectedDayFrom === '') {
      localStorage.setItem('inputDATEFROM', new Date('2010-01-01').toISOString())
      localStorage.setItem('inputDATEFROMl', moment(new Date('2010-01-01').toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD'))
    } else {
      localStorage.setItem('inputDATEFROM', (this.state.selectedDayFrom.toISOString()))
      localStorage.setItem('inputDATEFROMl', moment(this.state.selectedDayFrom.toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD'))
    }
    if (this.state.selectedDayTo === '') {
      localStorage.setItem('inputDATETO', (new Date().toISOString()))
      localStorage.setItem('inputDATETOl', moment(new Date().toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD'))
    } else {
      localStorage.setItem('inputDATETO', (this.state.selectedDayTo.toISOString()))
      localStorage.setItem('inputDATETOl', moment(this.state.selectedDayTo.toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD'))
    }
    localStorage.setItem('inputVN', this.state.vn)
    localStorage.setItem('inputDOCTYPE', this.state.doctype)
    localStorage.setItem('inputORGID', this.state.orgid)
    this.inputHN = localStorage.getItem('inputORGID')
    this.inputHN = localStorage.getItem('inputHN')
    this.inputDATEFROM = localStorage.getItem('inputDATEFROM')
    this.inputDATETO = localStorage.getItem('inputDATETO')
    this.inputVN = localStorage.getItem('inputVN')
    this.inputDOCTYPE = localStorage.getItem('inputDOCTYPE')
    // console.log(this.inputDATEFROM)
    // console.log(this.inputDATETO)
    // console.log(this.inputORGID)
    fetch('http://127.0.0.1:1231/api/pGetDocType', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orgid: this.inputORGID, hn: this.inputHN, vn: this.inputVN, doctype: this.inputDOCTYPE, datefrom: this.inputDATEFROM, dateto: this.inputDATETO })
    })
      .then((res) => { return res.json() })
      .then(async (data) => {
        // console.log(data)
        // console.log(({ orgid: this.inputORGID, hn: this.inputHN, vn: this.inputVN, doctype: this.inputDOCTYPE, datefrom: this.inputDATEFROM, dateto: this.inputDATETO }))
        localStorage.setItem('Search', JSON.stringify(data))
        if (data.length > 0) {
          localStorage.setItem('HN', data[0].HN)
          localStorage.setItem('ParientName', data[0].ParientName)
          localStorage.setItem('PatientUID', data[0].PatientUID)
          localStorage.setItem('TypeName', data[0].TypeName)
          localStorage.setItem('TypeCode', data[0].TypeCode)
          localStorage.setItem('BirthDate', data[0].BirthDate)
          localStorage.setItem('Gender', data[0].Gender)
          localStorage.setItem('TitleName', data[0].TitleName)
          // console.log(JSON.parse(localStorage.getItem('Search')))
          // window.location.replace('type')
          window.location = '/type'
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Data not found!'
          })
        }
      })
  }

  render() {
    const { selectedDayFrom, selectedDayTo, hn, vn, doctype } = this.state
    return (
      <div className="container">
        <br />
        <aside className="">
          <div className="menu-label">
            <div className="field">
              <label className="label">Search</label>
            </div>
            Search Docscan From HN
          </div>
          <ul className="menu-list">
            <li>
              <div className="field">
                <label className="label">
                  {this.state.hn && <p> HN: {this.state.hn} </p>}
                  {!this.state.hn && <p> HN <big className="text-danger">*</big> </p>}
                </label>
                <div className="control">
                  <input className="input" onChange={this.onChangeHN.bind(this)} value={hn || ''} type="text" placeholder=""/>
                </div>
              </div>
            </li>
          </ul>
          <ul className="menu-list">
            <li>
              <div className="field">
                <label className="label">
                  {selectedDayFrom && <p>  Date From: {moment(selectedDayFrom.toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD')}</p>}
                  {!selectedDayFrom && <p>  Date From</p>}</label>
                <div className="control">
                  <DayPickerInput onDayChange={this.handleDayChangeDayFrom.bind(this)} inputProps={{ className: 'input' }} />
                </div>
              </div>
            </li>
          </ul>
          <ul className="menu-list">
            <li>
              <div className="field">
                <label className="label">
                  {selectedDayTo && <p>  Date to: {moment(selectedDayTo.toLocaleDateString(), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD')}</p>}
                  {!selectedDayTo && <p>  Date to</p>}</label>
                <div className="control">
                  <DayPickerInput onDayChange={this.handleDayChangeDayTo.bind(this)} inputProps={{ className: 'input' }} />
                </div>
              </div>
            </li>
          </ul>
          <ul className="menu-list">
            <li>
              <div className="field">
                <label className="label">VN</label>
                <div className="control">
                  <input className="input" onChange={this.onChangeVN.bind(this)} value={vn || ''} type="text" placeholder=""/>
                </div>
              </div>
            </li>
          </ul>
          <ul className="menu-list">
            <li>
              <div className="field">
                <label className="label">Doc Type</label>
                <div className="control">
                  <input className="input" onChange={this.onChangeDocType.bind(this)} value={doctype || ''} type="text" placeholder=""/>
                </div>
              </div>
            </li>
          </ul>
          <div className="buttons">
            <span className="button is-success is-fullwidth" onClick={this.btnSearch}>Search</span>
          </div>
        </aside>
      </div>
    )
  }
}

export default Menu
