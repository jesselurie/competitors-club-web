import React from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";
import PageLayout from './PageLayout';
import Home from './Home';
import { Provider } from 'react-redux';
import {PersistGate } from 'redux-persist/lib/integration/react';
import store, {persistor} from './redux/store';

const Root = (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout/>} >
            <Route path="/home" element={<Home/>}/>
            <Route path="/tokens" element={<h1>Hello tokens</h1>}/>
            <Route path="/trophies" element={<h1>Hello trophies</h1>}/>
            <Route path="/competitions" element={<h1>Hello competitions</h1>}/>
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
)
