import React, { Component } from 'react'
import { Menu,Image } from 'semantic-ui-react'

export default class MenuExampleInvertedPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted pointing vertical >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
            <Image
                src={`${process.env.PUBLIC_URL}/assets/home.svg`}
                size="medium"
                fluid
            />
            
        </Menu.Item>
         <Menu.Item
          name='tokens'
          active={activeItem === 'tokens'}
          onClick={this.handleItemClick}
        >
            <Image
                src={`${process.env.PUBLIC_URL}/assets/tokens.svg`}
                size="medium"
                fluid
            />
        </Menu.Item>
        <Menu.Item
          name='trophies'
          active={activeItem === 'trophies'}
          onClick={this.handleItemClick}>
          <Image
                src={`${process.env.PUBLIC_URL}/assets/trophy.svg`}
                size="medium"
                fluid
           />
        </Menu.Item>
        <Menu.Item
          name='competitions'
          active={activeItem === 'competitions'}
          onClick={this.handleItemClick}
        >
             <Image
                src={`${process.env.PUBLIC_URL}/assets/dice.svg`}
                size="medium"
                fluid
            />
        </Menu.Item>
      </Menu>
    )
  }
}
