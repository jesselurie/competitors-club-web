import React, { createRef } from 'react'
import {
    Grid,
    List,
    Image,
    Card, 
    Icon, 
    Button,
    Header,
    Modal,
    Container,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
// import ScrollMenu from 'react-horizontal-scrolling-menu';
// import './podium.css';
/**
 * Title
 * Podium
 * Add Place
 * Edit Place
 */
const styles = {
   title: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: 0.02,
   }
};


function ModalExample() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
  
export default function Main(props) {
    const contextRef = createRef()
    const svg = (place) =>{
        return (
            <svg width="100" height="100" viewBox="0 0 180 180" enableBackground="new 0 0 180 180" >
                <path fill={rndMathColor(place)} d="M124.6,90.1l4.2-0.3l0.1-4.3l4.2-0.9l-0.5-4.3l4.1-1.4l-1-4.2l3.9-1.9l-1.5-4l3.6-2.3l-2-3.8l3.3-2.8l-2.5-3.5l2.9-3.2l-2.9-3.2l2.5-3.5l-3.3-2.8l2-3.8l-3.6-2.4l1.5-4l-3.9-1.9l1-4.2l-4.1-1.4l0.5-4.3l-4.2-0.9l-0.1-4.3l-4.3-0.3l-0.6-4.3l-4.3,0.2l-1.1-4.2L114.4,9l-1.6-4l-4.1,1.3l-2.1-3.7l-3.9,1.8L100,0.8l-3.7,2.3l-3-3.1L90,2.7L86.7,0l-3,3.1L80,0.8l-2.6,3.4l-3.9-1.8l-2.1,3.7L67.3,5l-1.6,4l-4.2-0.8l-1.1,4.2L56,12.1l-0.6,4.3l-4.3,0.3L51.1,21l-4.2,0.9l0.5,4.3l-4.1,1.4l1,4.2l-3.9,1.9l1.5,4l-3.6,2.3l2,3.8l-3.3,2.8l2.5,3.5l-2.9,3.2l2.9,3.2l-2.5,3.5l3.3,2.8l-2,3.8l3.6,2.4l-1.5,4l3.9,1.9l-1,4.2l4.1,1.4l-0.5,4.3l4.2,0.9l0.1,4.3l4.3,0.3l-30.6,73.9l27.5-11.4L63.6,180L90,116.3l26.4,63.7l11.4-27.5l27.5,11.4L124.6,90.1z M90,18.9c19.1,0,34.5,15.5,34.5,34.6C124.5,72.5,109.1,88,90,88c-19.1,0-34.5-15.5-34.5-34.6C55.5,34.4,70.9,18.9,90,18.9z"/>
            </svg>
        )
    }

    const ordinal_suffix_of = (i)=> {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max).toString();
    }
    
    
    const rndMathColor = () => {
        return "rgb("+getRandomInt(255) + "," + getRandomInt(255) + "," + getRandomInt(255) + ")"
    }

    const CardExampleCard = (accountId) => (
        <Card onClick={(e)=>{console.log('clicked')}}>
          <Card.Content textAlign={'center'}>
            <Card.Header>{svg(1)}</Card.Header>
                <Card.Meta>
                    <Identicon
                        value={accountId}
                        size={36}
                        theme={'polkadot'}
                    />
                </Card.Meta>
             <Card.Description>
                 {ModalExample()}
            </Card.Description>
          </Card.Content>
        </Card>
      )
      
    const listItem = (accountId) => {
        return (
            <List.Item textAlign={'center'}>
                <List.Content>
                    {CardExampleCard(accountId)}
                </List.Content>
            </List.Item>
        )
    }

    return (
    <div ref={contextRef}>
      <Container>
        <Grid>
            <Grid.Row columns={1}>
                  <Grid.Column width={4} >
                      <p style={styles.title}>
                          Podium
                      </p>
                  </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                  <Grid.Column>
                  {/* scrolling style={{display: 'inline-flex', overflow: 'scroll'}} */}
                      <List horizontal ordered divided animated style={{display: 'inline-flex', overflow: 'scroll',width:'100%'}}  >
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                          {listItem("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                      </List>
                  </Grid.Column>
            </Grid.Row>
        </Grid>
       </Container>
    </div>
    )
}

