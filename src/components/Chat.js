import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Button,
  Modal,
  TextArea,
  Table
} from 'semantic-ui-react'
import { ReactSVG } from 'react-svg'
import 'semantic-ui-css/semantic.min.css'

const styles = {
  
};

const payoutRowStyles = {
  width: '100%',
  height: 50,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 22,
  color: '#EEEEEE',
};

const dataChat = [ 
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@Pikachu',
    message: 'Hi! I would like everyone to join before 11am PCT! Thanks! ',
    date: 'Yesterday at 1:30 pm'
  },
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@Ghost',
    message: 'Hi! Joining!',
    date: 'Yesterday at 1:30 pm'
  },
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@NinjaTurtle',
    message: 'Hi! Going to start the game soon!!',
    date: 'Yesterday at 1:30 pm'
  },
];

export default function Main(props) {
    const contextRef = createRef()
    
    const chatRow = (accountId,username,message,date,index) => {
        return (
        <Table.Row style={payoutRowStyles} onClick={(e)=>{ 
          //  set current index to edit 
          //  setSelectedIndex(index);
          //  setOpen(true);
          }}>
          <Table.Cell  textAlign={'left'}> 
            <ReactSVG 
               src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
            />    
            {username}
          </Table.Cell>
          <Table.Cell textAlign={'center'}>{message}</Table.Cell>
          <Table.Cell textAlign={'center'}>{date}</Table.Cell>
        </Table.Row>
        );
      }
  
    const ChatTable = () => (
      // <div style= {{backgroundColor:'#373747',height: 214, width:544}}>               
        <Table unstackable fixed singleLine  style= {{backgroundColor:'#11111E',height: 376, width:'100%'}} >
          <Table.Body>
            {dataChat.map(({accountId,username,message,date},index)=>{
              return chatRow(accountId,username,message,date,index);
            })}
          </Table.Body>
        </Table>
        //  </div>
    )

    return (
      <div ref={contextRef}>
        {/* style= {{backgroundColor:'#1E1E27',width:'100%'}} */}
        {/* <Container > */}
          <Grid stretched   style={{ backgroundColor: '#11111E' }}>
            <Grid.Row>
              <Grid.Column>
                {/* <Container style={{height:376}}> */}
                  {ChatTable()}
                {/* </Container> */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column width={12}>
                <TextArea style={{resize: 'none'}} placeholder={'Enter a Message'} ></TextArea>
                {/* <ReactSVG 
                    src={`${process.env.PUBLIC_URL}/assets/chat-icon.svg`}
                />  */}
              </Grid.Column>
              <Grid.Column width={2}>
                <ReactSVG 
                    src={`${process.env.PUBLIC_URL}/assets/chat-icon.svg`}
                />  
              </Grid.Column>
            </Grid.Row>
          </Grid>
        {/* </Container> */}
      </div>
    )
}
