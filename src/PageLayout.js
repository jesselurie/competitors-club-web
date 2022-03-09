import React, { createRef,useState } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Menu,
  Image,
  Segment,
  Sidebar
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Outlet } from "react-router-dom";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TemplateModule from './TemplateModule'
import Transfer from './Transfer'
import Upgrade from './Upgrade'
import Create from './Create';
import Welcome from './components/Welcome';
// import Menu from './components/Menu';
// import Sidebar from './components/Sidebar';
import { SI } from '@polkadot/util/format/si';

const VerticalSidebar = ({ animation, direction, visible,handleItemClick, activeItem }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    // vertical
    visible={visible}
    width='very wide'
  >
    <Menu.Item as='a'   name='home' onClick={handleItemClick}   active={activeItem === 'home'}>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/home.svg`}
        size="tiny"
        fluid
      />
      Home
    </Menu.Item>
    <Menu.Item as='a'  name='tokens' onClick={handleItemClick} active={activeItem === 'tokens'}>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/tokens.svg`}
        size="tiny"
        fluid
      />
      Tokens
    </Menu.Item>
    <Menu.Item as='a'  name='trophies' onClick={handleItemClick} active={activeItem === 'trophy'}>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/trophy.svg`}
        size="tiny"
        fluid
      />
      Trophies
    </Menu.Item>
  </Sidebar>
)

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_ANIMATION':
      return { ...state, animation: action.animation, visible: !state.visible }
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}


function Main() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  })
  const { apiState, apiError, keyringState } = useSubstrateState()
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

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()
  const { animation, dimmed, direction, visible } = state
  
  return (

  <div ref={contextRef} >
    <Sticky context={contextRef}>
      <AccountSelector />
    </Sticky>
    <Grid stackable columns="equal">
      <Grid.Row  stretched >
            <BlockNumber />
            <BlockNumber finalized />
      </Grid.Row>
    </Grid>
    <Menu inverted widths={4} style={{backgroundColor:'#11111E'}}>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          >
              <Image
                  src={`${process.env.PUBLIC_URL}/assets/home.svg`}
                  size="tiny"
                  // fluid
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
                  // fluid
              />
          </Menu.Item>
          <Menu.Item
            name='trophies'
            active={activeItem === 'trophies'}
            onClick={handleItemClick}>
            <Image
                  src={`${process.env.PUBLIC_URL}/assets/trophy.svg`}
                  size="tiny"
                  // fluid
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
                  // fluid
              />
          </Menu.Item>
        </Menu>
    <DeveloperConsole />
  </div> 
  )
}

export default function PageLayout({children}) {
  return (
    <SubstrateContextProvider>
      <Main />
      <Outlet />
    </SubstrateContextProvider>
  )
}
