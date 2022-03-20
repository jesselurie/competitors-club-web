import React, { createRef } from 'react'
import {
  Container,
} from 'semantic-ui-react'
import { ReactSVG } from 'react-svg'
import 'semantic-ui-css/semantic.min.css'

const styles = {
    
  
};

//Create a new memo or render an existing memo. 
export default function Main(props) {
    const contextRef = createRef()
    // style={{backgroundColor:'#11111E'}}

    return (
    <div ref={contextRef}>
        <Container style= {{backgroundColor:'#11111E',height: 185, width:177}}>
        <ReactSVG 
             src={`${process.env.PUBLIC_URL}/assets/trophy-icon.svg`}
          />   
        </Container>
    </div>
    )
}
