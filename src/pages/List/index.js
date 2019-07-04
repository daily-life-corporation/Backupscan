import * as moment from 'moment'
import React, { Component } from 'react'
import ReactPanZoom from 'react-image-pan-zoom-rotate'
import Swal from 'sweetalert2'

import Login from '../Login'
import Menu from '../Menu'
import Navbar from '../Navbar'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: JSON.parse(localStorage.getItem('SearchTYPE')) || '',
      img: '',
      TypeName: localStorage.getItem('TypeName')
    }
  }
  componentWillMount() {
    (!this.state.type && window.location.replace('error'))
    // console.log(this.state.type)
    // console.log(moment(this.state.type[0].DocUploadedDttm).format('DD/MM/YYYY HH:mm:ss'))
    // this.scanneddocumentuid()
  }
  scanneddocumentuid = (e) => {
    this.setState({ img: '' })
    fetch('http://127.0.0.1:1231/api/ScannedDocumentUID', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ scanneddocumentuid: e })
    })
      .then((res) => { return res.json() })
      .then(async (data) => {
        // console.log(data.Data)
        this.setState({ img: data })
        // localStorage.setItem('ScannedDocument', JSON.stringify(data)) JSON.parse(localStorage.getItem('ScannedDocument'))
      })
  }
  btnDelete = (e) => {
    // console.log(e)
    // this.reloadAPI()
    // console.log({ orgid: localStorage.getItem('visitingorgs_uid'), hn: localStorage.getItem('PatientUID'), vn: localStorage.getItem('inputVN'), doctype: localStorage.getItem('e'), datefrom: localStorage.getItem('inputDATEFROM'), dateto: localStorage.getItem('inputDATETO') })
    Swal.fire({
      title: `Are you sure delete ${e.DocumentName}?`,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 690
    }).then((result) => {
      if (result.value) {
        fetch('http://127.0.0.1:1231/api/ScannedDocumentDelete', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ scanneddocumentuid: e.DocumentUID })
        })
          .then((res) => { return res.json() })
          .then(async (data) => {
            // console.log(data.UpdateStatus)
            data.UpdateStatus === 1 ? Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then((result) => {
              result.value && this.reloadAPI()
            }) : Swal.fire(
              'Oops...!',
              'Your file is not deleted..',
              'error'
            ).then((result) => {
              result.value && this.reloadAPI()
            })
          })
      }
    })
  }
  reloadAPI = () => {
    fetch('http://127.0.0.1:1231/api/docscan', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orgid: localStorage.getItem('visitingorgs_uid'), hn: localStorage.getItem('PatientUID'), vn: localStorage.getItem('inputVN'), doctype: localStorage.getItem('e'), datefrom: localStorage.getItem('inputDATEFROM'), dateto: localStorage.getItem('inputDATETO') })
    })
      .then((res) => { return res.json() })
      .then(async (data) => {
        // console.log(data)
        // console.log({ orgid: localStorage.getItem('visitingorgs_uid'), hn: localStorage.getItem('PatientUID'), vn: localStorage.getItem('inputVN'), doctype: e, datefrom: localStorage.getItem('inputDATEFROM'), dateto: localStorage.getItem('inputDATETO') })
        localStorage.setItem('SearchTYPE', JSON.stringify(data))
        // window.location = '/list'
        window.location.replace('/list')
      })
  }
  render() {
    const { type, img, TypeName } = this.state
    // console.log()
    const arr = type.length ? type.map((item, index) => (
      <tr key={index}>
        <td data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.scanneddocumentuid(item.DocumentUID)}><b><abbr className="text-muted">{index + 1}</abbr></b></td>
        <td data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.scanneddocumentuid(item.DocumentUID)}><b><abbr className="text-muted">{type[index].DocumentName}</abbr></b></td>
        <td data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.scanneddocumentuid(item.DocumentUID)}><b><abbr className="text-muted">{type[index].PatientVisitID}</abbr></b></td>
        <td data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.scanneddocumentuid(item.DocumentUID)}><b><abbr className="text-muted">{moment(this.state.type[index].DocUploadedDttm).format('DD/MM/YYYY HH:mm:ss')}</abbr></b></td>
        <td data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.scanneddocumentuid(item.DocumentUID)}><b><abbr className="text-muted">{type[index].DocUploadedFrom && (moment(this.state.type[index].DocUploadedFrom).format('DD/MM/YYYY HH:mm:ss'))}</abbr></b></td>
        <td>
          <a onClick={() => this.btnDelete(item)}>
            <i className="fas fa-trash-alt" ></i>
          </a>
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
              <div className="modal-content">
                {img && <div className="modal-body">
                  <div className="col-12 text-center flex-column flex-md-row bd-navbar "><a className="btn btn-info shadow rounded" href={'data:image/png;base64,' + img.Data} download={type[index].DocumentName} > Download </a></div>
                  <ReactPanZoom
                    alt="HN image"
                    image={'data:image/jpeg;base64,' + img.Data}
                  />
                </div>
                }
              </div>
            </div>
          </div>
        </td>
      </tr>
    )) : <tr>
      <td colSpan="6"><div className="col-12 text-center flex-column flex-md-row bd-navbar hero"> <h1><b> Data not found! </b></h1> </div></td>
    </tr>
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
                  <div className="">
                    <div className="container">
                      <div className="shadow-sm p-3 bg-white rounded"> <b className=""> <abbr className="text-muted"> { localStorage.getItem('HN') } </abbr>  <b className="text-warning"> / </b> <abbr className="text-muted">{TypeName}</abbr> </b> </div> <br />
                      <table className="table table-striped shadow-sm p-3 bg-white rounded">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Document Name</th>
                            <th scope="col">Visit ID</th>
                            <th scope="col">Uploaded Date</th>
                            <th scope="col">Uploaded From</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {arr}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <Login/>
        }
      </div>
    )
  }
}

export default Home
