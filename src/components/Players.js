import React, { createRef,useState } from 'react'
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
    Placeholder,
    Table,
    Label,
    Menu,
    Sticky
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import { ReactSVG } from 'react-svg'
import './players.css';

// import ScrollMenu from 'react-horizontal-scrolling-menu';
// import './podium.css';
/**
 * Title
 * Podium
 * Add Place
 * Edit Place
 */

const rowStyles = {
  width: 343,
  height: 86,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
};

const pendingStyle = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#A01C0E',
}

const joinedStyle = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#207420',
}

const playersStyle = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 18,
  color: '#EEEEEE',
}

const data = [ 
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@Pikachu',
    isPending:true,
  },
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@Ghost',
    isPending:false,
  },
  {
    accountId: '15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq',
    username: '@NinjaTurtle',
    isPending:false,
  },
];

export default function Main(props) {
    const contextRef = createRef()  
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null);

    const PlayerModal = () => {
      return (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>Edit Competitor</Modal.Header>
          <Modal.Content >
            <Identicon
            value={data[selectedIndex].accountId}
            size={36}
            theme={'polkadot'}/> 
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
    
    const row = (accountId,username,isPending,index) => {
      return (
      <Table.Row style={rowStyles} onClick={(e)=>{ 
        //set current index to edit 
          setSelectedIndex(index);
          setOpen(true);
        }}>
        <Table.Cell  textAlign={'left'} onClick={(e)=>{console.log('clicked icon for copying: ',index)}}> 
          <Identicon
          value={accountId}
          size={36}
          theme={'polkadot'}/>     
        </Table.Cell>
        <Table.Cell textAlign={'center'} onClick={(e)=>{console.log('clicked username for editing:', index)}}>{username}</Table.Cell>
        <Table.Cell  textAlign={'right'} onClick={(e)=>{console.log('clicked the ribbon for placing: ',index)}}>
          <ReactSVG 
             src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
          />
           {isPending? (<p style={pendingStyle}>Pending</p>): <p style={joinedStyle}>Joined</p>} 
        </Table.Cell>
      </Table.Row>
      );
    }
    
    const TableExamplePagination = () => (
      <div style= {{backgroundColor:'#1E1E27',height: 343, width:350}}>               
        <Table  unstackable fixed singleLine role="grid" aria-labelledby="header">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'left'} onClick={(e)=>{console.log('clicked the filter')}} colSpan="3" id="header"> 
              <ReactSVG 
                src={`${process.env.PUBLIC_URL}/assets/filter.svg`}
              />
              </Table.HeaderCell>
             <Table.HeaderCell colSpan="3" id="header" textAlign={'center'}>  Players </Table.HeaderCell>
            <Table.HeaderCell  colSpan="3" id="header" textAlign={'right'} onClick={(e)=>{console.log('clicked the add')}}>
                <ReactSVG 
                  src={`${process.env.PUBLIC_URL}/assets/add-item.svg`}
                />
            </Table.HeaderCell> 
          </Table.Row>
          
        </Table.Header>
          <Table.Body>
            {data.map((player,index)=>{
              return row(player.accountId,player.username,player.isPending,index);
            })}
          </Table.Body>
          
        </Table>
         </div>
    )
    return (
    <div ref={contextRef}>
      <PlayerModal/>
     {TableExamplePagination()}
    </div>
    )
}

      {/* scrolling style={{display: 'inline-flex', overflow: 'scroll'}} */}
                  {/* style={{display: 'inline-flex', overflow: 'scroll',width:'100%'}} */}

                //   <List vertical divided relaxed style={{height:343,width:346,backgroundColor:'white'}}>
                //   {listItemv2("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                // </List>    