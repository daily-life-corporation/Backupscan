/* eslint-disable jsx-a11y/href-no-hash */
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(< AppWithRouter />, document.getElementById('root'))
registerServiceWorker()
