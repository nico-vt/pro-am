import React from 'react'
import { createRoot } from 'react-dom/client'
import store from './core/data/redux/store'
import { base_path } from './environment'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Feature from './feature-module/feature'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import 'aos/dist/aos.css';
import '../src/style/scss/main.scss'
import '../src/style/css/feather.css'

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import "./i18n";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store} >
        <BrowserRouter basename={base_path}>
          <Feature />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
)
