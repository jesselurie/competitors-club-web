import React, { Component, useState } from 'react'
import { Menu,Image,Container, Grid } from 'semantic-ui-react'
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Main({children}) {
  const [activeItem, setActiveItem] = useState('home');
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  

  // state = { activeItem: 'home' }

  const handleItemClick = (e, { name }) => { 
    setActiveItem(name);
    navigate("/"+name);
    //Link to the name
  }

  
    // const { activeItem } = this.state

    return (
      // <Container>
        <Grid>
          <Grid.Column>
        <Menu vertical inverted widths={4} style={{backgroundColor:'#11111E'}}>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          >
              <Image
                  src={`${process.env.PUBLIC_URL}/assets/home.svg`}
                  size="tiny"
                  fluid
              />
              
          </Menu.Item>
          <Menu.Item
            name='tokens'
            active={activeItem === 'tokens'}
            onClick={handleItemClick}
          >
              <Image
                  src={`${process.env.PUBLIC_URL}/assets/tokens.svg`}
                  size="tiny"
                  fluid
              />
          </Menu.Item>
          <Menu.Item
            name='trophies'
            active={activeItem === 'trophies'}
            onClick={handleItemClick}>
            <Image
                  src={`${process.env.PUBLIC_URL}/assets/trophy.svg`}
                  size="tiny"
                  fluid
            />
          </Menu.Item>
          <Menu.Item
            name='competitions'
            active={activeItem === 'competitions'}
            onClick={handleItemClick}
          >
              <Image
                  src={`${process.env.PUBLIC_URL}/assets/dice.svg`}
                  size="tiny"
                  fluid
              />
          </Menu.Item>
        </Menu>
        </Grid.Column>
        </Grid>
      // </Container>
    )
}
