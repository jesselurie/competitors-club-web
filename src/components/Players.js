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
    Sticky, Input, Segment
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon'
import { ReactSVG } from 'react-svg'
import {isValidAddressPolkadotAddress} from '../utils/index';
import {addCompetitor,removeCompetitor} from '../redux/orm/models/competitor';
import {useSelector,useDispatch, connect} from 'react-redux';
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

const dataPayouts = [ 
  {
    place: 1,
    payout: 30,
  },
  {
    place: 2,
    payout: 20,
  },
  {
    place: 3,
    payout: 1,
  },
  {
    place: 3,
    payout: 1,
  }, {
    place: 3,
    payout: 1,
  }, {
    place: 3,
    payout: 1,
  },
];
const newPlayerModalStyle = {
  width: 400,
  height: 450,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
};
const modalStyle = {
  // width: 675,
  // height: 567,
  // width: 400,
  // height: 567,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
};

const payoutRowStyles = {
  // width: '100%',
  // height: 50,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 22,
  color: '#EEEEEE',
};

const addFromAddressBook = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 22,
  color: '#A01C0E',
};

export default function Main(props) {
    const dispatch = useDispatch();
    const contextRef = createRef()  
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPayoutIndex, setSelectedPayoutIndex] = useState(0);
    const [openNewPlayerModal, setOpenNewPlayerModal] = React.useState(false)
    // const [playerAccountId,setPlayerAccountId] = useState(null);

    const {action, game} = props;

    const payoutRow = (place,payout,index) => {
      return (
      <Table.Row style={payoutRowStyles} onClick={(e)=>{ 
        //set current index to edit 
          // setSelectedIndex(index);
          // setOpen(true);
        }}>
        <Table.Cell  textAlign={'left'}> 
          <ReactSVG 
             src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
          />   
        </Table.Cell>
        <Table.Cell textAlign={'center'}>{payout}</Table.Cell>
      </Table.Row>
      );
    }

    const PayoutTable = () => (
      // <div style= {{backgroundColor:'#373747',height: 214, width:544}}>          <Table  stackable fixed singleLine  style= {{backgroundColor:'#373747',height: 214, width:544}}>             
        <Table unstackable>
          <Table.Body>
            {dataPayouts.map((place,index)=>{
              return payoutRow(place.place,place.payout,index);
            })}
          </Table.Body>
        </Table>
        //  </div>
    )

    const NewPlayerModal = () => {
      const [playerAccountId,setPlayerAccountId] = useState(null);
      return (
        <Modal
          closeIcon={{ style: { top: '1.0535rem', right: '1rem',color:'#2B2B35' }, name: 'close' }}
          onClose={() => setOpenNewPlayerModal(false)}
          onOpen={() => setOpenNewPlayerModal(true)}
          open={openNewPlayerModal}
          // size={'small'}
          style={newPlayerModalStyle}
        >
          <Modal.Content style={{backgroundColor:'#1E1E27'}}>
             <Grid>
                <Grid.Row >
                    <Grid.Column textAlign='center'>
                     New Competitor
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='center' >
                  <Grid.Column textAlign='middle'>
                  <Input iconPosition='left' onChange={(e,data)=>{setPlayerAccountId(data.value)}}>
                    <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/user-icon.svg`}
                    />
                    <input />
                  </Input>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='center' >
                  <Grid.Column textAlign='middle'>
                  <Input iconPosition='left' placeholder='Nickname'>
                    <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/user-icon.svg`}
                    />
                    <input />
                  </Input>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='center'>
                  <Grid.Column width={2}>
                    <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/add-icon.svg`}
                    /> 
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p style={addFromAddressBook}>Add From Address Book</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </Modal.Content>
     
          <Modal.Actions  style={{backgroundColor:'#1E1E27'}}>
            <Button color='grey' onClick={() => setOpenNewPlayerModal(false)}>
              Cancel
            </Button>
            <Button
              content="Done"
              labelPosition='right'
              icon='checkmark'
              onClick={() => { 
                if (isValidAddressPolkadotAddress(playerAccountId)){
                  dispatch(addCompetitor(playerAccountId,game.vieId));
                }else {
                  alert('Invalid competitor account ID')
                }
                setOpenNewPlayerModal(false)
              }}
              color='red'
            />
          </Modal.Actions>          
        </Modal>
      )
    }

    const PlayerModal = () => {
      return (
        <Modal
          closeIcon={{ style: {color:'#2B2B35' }, name: 'close' }}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size={'small'}
          style={modalStyle}
        >
          <Modal.Content style={{backgroundColor:'#1E1E27'}}>
            <Grid>
              <Grid.Row columns={3} verticalAlign={'top'}> 
                <Grid.Column textAlign='right'>
                  <ReactSVG 
                    src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
                  />
                </Grid.Column>
                <Grid.Column textAlign='middle'>
                  <Identicon
                    value={data[selectedIndex].accountId}
                    size={36}
                    theme={'polkadot'}/>  
                </Grid.Column>
                <Grid.Column  textAlign='middle'>
                  <ReactSVG 
                      src={`${process.env.PUBLIC_URL}/assets/trash.svg`}
                    />
                </Grid.Column>
              </Grid.Row> 
             <Grid.Row verticalAlign='middle'>
                <Grid.Column textAlign='center' >
                  Pending
                </Grid.Column>
              </Grid.Row>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width={12}textAlign='center' >
                  <p style={{"wordBreak":"break-all"}}>{data[selectedIndex].accountId}</p>
                </Grid.Column>
                 <Grid.Column width={4} >
                <ReactSVG 
                      src={`${process.env.PUBLIC_URL}/assets/copy-to-clipboard.svg`}
                    />
                </Grid.Column>
              </Grid.Row> 
              <Grid.Row>
                <Grid.Column textAlign='center'> 
                  Set a Place
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                 {PayoutTable()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
     
          <Modal.Actions  style={{backgroundColor:'#1E1E27'}}>
            <Button color='grey' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Done"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              color='red'
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
      // <div style= {{backgroundColor:'#1E1E27',height: 343, width:350}}>       
      // style= {{backgroundColor:'#1E1E27',height: 343, width:350}}        
      //  <Container>
        <Table  unstackable fixed singleLine role="grid" aria-labelledby="header">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'left'} onClick={(e)=>{console.log('clicked the filter')}} colSpan="3" id="header"> 
              <ReactSVG 
                src={`${process.env.PUBLIC_URL}/assets/filter.svg`}
              />
              </Table.HeaderCell>
             <Table.HeaderCell colSpan="3" id="header" textAlign={'center'}>  Players </Table.HeaderCell>
            <Table.HeaderCell  colSpan="3" id="header" textAlign={'right'} onClick={(e)=>{setOpenNewPlayerModal(true)}}>
               {action == 0 && ( <ReactSVG 
                  src={`${process.env.PUBLIC_URL}/assets/add-item.svg`}
                />)}
               
            </Table.HeaderCell> 
          </Table.Row>
          
        </Table.Header>
          <Table.Body>
            {game?.competitors?.map((player,index)=>{
              return row(player.accountId,player.username,player.isPending,index);
            })}
          </Table.Body>
          
        </Table>
        // </Container>
        //  </div>
    )
    return (
    <div ref={contextRef}>
      <PlayerModal/>
      <NewPlayerModal/>
     {TableExamplePagination()}
    </div>
    )
}

      {/* scrolling style={{display: 'inline-flex', overflow: 'scroll'}} */}
                  {/* style={{display: 'inline-flex', overflow: 'scroll',width:'100%'}} */}

                //   <List vertical divided relaxed style={{height:343,width:346,backgroundColor:'white'}}>
                //   {listItemv2("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
                // </List>    