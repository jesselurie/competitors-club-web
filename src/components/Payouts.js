import React, { createRef,useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactSVG } from 'react-svg'
import {
    Grid,
    Button,
    Modal,
    Container,
    Table,
    Input
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {addSpot,updatePayout, removeSpot} from '../redux/orm/models/place'
import './payouts.css';

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
  width: 675,
  height: 567,
  borderRadius:10,
  backgroundColor:'#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
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

const addFromAddressBook = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 22,
  color: '#A01C0E',
};

export default function Main(props) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPayoutIndex, setSelectedPayoutIndex] = useState(0);
    const [openNewPlayerModal, setOpenNewPlayerModal] = React.useState(false)
    const [selectedPayout, setSelectedPayout] = useState(null)

    // const [selectedIndex, setSelectedIndex] = useState(0);
    const contextRef = createRef()  
    const {game,action} = props
    // console.log(game,action);

    const NewPayoutModal = () => {
      const [newPlace, setNewPlace] = useState(null);
      const [newPayout, setNewPayout] = useState(null);
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
                    New Payout
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row verticalAlign='center' >
                <Grid.Column textAlign='middle'>
                <Input type='number' iconPosition='left' placeholder='Place' onChange={(e,data)=>{setNewPlace(data.value)}}>
                  <ReactSVG 
                        src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
                  />
                  <input />
                </Input>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row verticalAlign='center' >
                <Grid.Column textAlign='middle'>
                <Input type='number' iconPosition='left' placeholder='Payout'  onChange={(e,data)=>{setNewPayout(data.value)}}>
                  <ReactSVG 
                        src={`${process.env.PUBLIC_URL}/assets/cclub-red.svg`}
                  />
                  <input />
                </Input>
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
              onClick={() =>  { 
                Number(newPayout) > 0 ? dispatch(addSpot(newPlace,newPayout,game.vieId)): alert('Payout needs to be greater than 0');
                setOpenNewPlayerModal(false)
              }}
              color='red'
            />
          </Modal.Actions>          
        </Modal>
      )
    }

    const PayoutModal = () => {
      const [editPlace, setEditPlace] = useState(selectedPayout?.spot);
      const [editPayout, setEditPayout] = useState(selectedPayout?.payout);
      return (
        <Modal
          closeIcon={{ style: { top: '1.0535rem', right: '1rem',color:'#2B2B35' }, name: 'close' }}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          style={modalStyle}
        >
          <Modal.Content style={{backgroundColor:'#1E1E27'}}>
             <Grid>
                <Grid.Row >
                    <Grid.Column textAlign='center'>
                     Edit Payout
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column textAlign='center'>
                  <ReactSVG 
                      src={`${process.env.PUBLIC_URL}/assets/trash.svg`}
                      onClick={()=>{
                        dispatch(removeSpot(selectedPayout?.id));
                        setOpen(false)
                      }}
                    />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='center' >
                  <Grid.Column textAlign='middle'>
                  <Input iconPosition='left' placeholder={selectedPayout?.spot} disabled>
                    <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
                    />
                    <input />
                  </Input>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='center' >
                  <Grid.Column textAlign='middle'>
                  <Input iconPosition='left'  placeholder={selectedPayout?.payout} onChange={(e,data)=>{setEditPayout(data.value)}}>
                    <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/cclub-red.svg`}
                    />
                    <input />
                  </Input>
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
              onClick={() => { 
                Number(editPayout) !== 0 ? dispatch(updatePayout(editPayout,selectedPayout.id)): alert('Payout needs to be greater than 0');
                setOpen(false) 
              }}
              color='red'
            />
          </Modal.Actions>          
        </Modal>
      )
    }
    
    const row = (place,index) => {
      const {spot,payout, accountId,id} = place;
      return (
      <Table.Row style={rowStyles} onClick={(e)=>{ 
        //set current index to edit 
          setSelectedIndex(index);
          setOpen(true);
          setSelectedPayout(place);
        }}>
        <Table.Cell width={4} onClick={(e)=>{console.log('clicked icon for copying: ',index)}}> 
          {spot}
        </Table.Cell>
        <Table.Cell width={4}  textAlign={'center'} onClick={(e)=>{console.log('clicked username for editing:', index)}}>{payout}</Table.Cell>
        
      </Table.Row>
      );
    }
    
    const PayoutsTable = () => (
       <Container >
        <Table  unstackable fixed singleLine role="grid" aria-labelledby="header">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'left'} onClick={(e)=>{setOpenNewPlayerModal(true)}} colSpan="3" id="header"> 
              <ReactSVG 
                src={`${process.env.PUBLIC_URL}/assets/add-icon.svg`}
              />
              </Table.HeaderCell>
             <Table.HeaderCell colSpan="3" id="header" textAlign={'center'}>Payouts</Table.HeaderCell>
            <Table.HeaderCell  colSpan="3" id="header" textAlign={'right'} onClick={(e)=>{console.log('clicked filter')}}>
                <ReactSVG 
                  src={`${process.env.PUBLIC_URL}/assets/filter.svg`}
                />
            </Table.HeaderCell> 
          </Table.Row>
          
        </Table.Header>
          <Table.Body>
            {game?.podium?.map((place,index)=>{
              return row(place,index);
            })}
          </Table.Body>
          
        </Table>
        </Container>
    )

    return (
    <div ref={contextRef}>
      <PayoutModal/>
      <NewPayoutModal/>
     {PayoutsTable()}
    </div>
    )
}