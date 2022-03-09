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
   
    const CardExampleCard = (accountId) => (
        <Card onClick={(e)=>{console.log('clicked')}}>
          <Card.Content textAlign={'center'}>
            {/* <Card.Header>{svg(1)}</Card.Header> */}
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
                          Players
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

