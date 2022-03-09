import React from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";
import PageLayout from './PageLayout';
import Welcome from './Welcome';
import Home from './Home';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout/>} >
          <Route path="/home" element={<h1>Hello home</h1>}/>
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
  </React.StrictMode>,
  document.getElementById('root')
)
