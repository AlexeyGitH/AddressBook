
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'

import Dashboards from './components/Dashboards.jsx' // изменили путь

ReactDOM.render(
  <Provider store={store}>
    <Dashboards />
  </Provider>,
  document.getElementById('react-app')
)

