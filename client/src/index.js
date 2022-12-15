import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store/index';
import {Provider} from 'react-redux';
import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();
axios.defaults.baseURL = "https://pi-food-production-c212.up.railway.app"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

