import React, {useState} from 'react'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Sidebar>
)

const VerticalSidebar = ({ animation, direction, visible,handleItemClick, activeItem }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='a'   name='home' onClick={handleItemClick}>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/home.svg`}
        size="tiny"
        fluid
      />
      Home
    </Menu.Item>
    <Menu.Item as='a'  name='tokens' onClick={handleItemClick}>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/tokens.svg`}
        size="tiny"
        fluid
      />
      Tokens
    </Menu.Item>
    <Menu.Item as='a'  name='trophies' onClick={handleItemClick}>
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

function SidebarExampleTransitions() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const [activeItem, setActiveItem] = useState('home');

  // state = { activeItem: 'home' }

  const handleItemClick = (e, { name }) => { 
    setActiveItem(name);
    navigate("/"+name);
    //Link to the name
  }

  return (
    <div>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
            handleItemClick={handleItemClick}
            activeItem={activeItem}
          />
        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic style={{height:400}}>
            {/* <Button primary>Add Document</Button> */}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default SidebarExampleTransitions