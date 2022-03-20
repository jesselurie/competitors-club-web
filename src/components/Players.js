import React, { createRef, useState } from 'react'
import {
  Grid,
  Button,
  Modal,
  Table,
  Input,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon'
import { ReactSVG } from 'react-svg'
import { isValidAddressPolkadotAddress } from '../utils/index'
import {
  addCompetitor,
  removeCompetitor,
} from '../redux/orm/models/competitor'
import {  useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setPlaceAccountId, resetPlace } from '../redux/orm/models/place'

import './players.css'

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
  borderRadius: 10,
  backgroundColor: '#373747',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
}

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

const newPlayerModalStyle = {
  width: 400,
  height: 450,
  borderRadius: 10,
  backgroundColor: '#11111E',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
}
const modalStyle = {
  // width: 675,
  // height: 567,
  // width: 400,
  // height: 567,
  borderRadius: 10,
  backgroundColor: '#11111E',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  color: '#EEEEEE',
}

const payoutRowStyles = {
  // width: '100%',
  // height: 50,
  borderRadius: 10,
  backgroundColor: '#1E1E27',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 22,
  color: '#EEEEEE',
}

const addFromAddressBook = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 22,
  color: '#A01C0E',
}

export default function Main(props) {
  const dispatch = useDispatch()
  const contextRef = createRef()
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedPayoutIndex, setSelectedPayoutIndex] = useState(0)
  const [openNewPlayerModal, setOpenNewPlayerModal] = React.useState(false)

  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const { action, game } = props

  const payoutRow = (placeId, spot, payout, index) => {
    return (
      <Table.Row
        style={payoutRowStyles}
        onClick={e => {
          console.log('SELECTED PLAYER: ', selectedPlayer)
          if (selectedPlayer.place == spot) {
            //check if other player has already been placed
            // remove other player with same place and set the current selected one
            dispatch(
              resetPlace({
                accountId: selectedPlayer.accountId,
                placeId,
                spot,
                payout,
                vieId: game.vieId,
              })
            )
          } else {
            dispatch(
              setPlaceAccountId({
                accountId: selectedPlayer.accountId,
                placeId,
                spot,
                payout,
                vieId: game.vieId,
              })
            )
          }
          setOpen(false)
        }}
      >
        <Table.Cell textAlign={'left'}>
          <ReactSVG src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`} />
          {spot}
        </Table.Cell>
        <Table.Cell textAlign={'center'}>{payout}</Table.Cell>
      </Table.Row>
    )
  }

  const PayoutTable = () => (
    // <div style= {{backgroundColor:'#373747',height: 214, width:544}}>          <Table  stackable fixed singleLine  style= {{backgroundColor:'#373747',height: 214, width:544}}>
    <Table unstackable>
      <Table.Body>
        {game?.podium?.map(({ spot, payout, id }, index) => {
          return payoutRow(id, spot, payout, index)
        })}
      </Table.Body>
    </Table>
    //  </div>
  )

  const NewPlayerModal = () => {
    // const [playerAccountId,setPlayerAccountId] = useState(null);
    const [playerAccountId, setPlayerAccountId] = useState(null)
    return (
      <Modal
        closeIcon={{
          style: { top: '1.0535rem', right: '1rem', color: 'grey' },
          name: 'close',
        }}
        onClose={() => setOpenNewPlayerModal(false)}
        onOpen={() => setOpenNewPlayerModal(true)}
        open={openNewPlayerModal}
        // size={'small'}
        style={newPlayerModalStyle}
      >
        <Modal.Content style={{ backgroundColor: '#1E1E27' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">New Competitor</Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Input
                  iconPosition="left"
                  onChange={(e, data) => {
                    setPlayerAccountId(data.value)
                  }}
                >
                  <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/user-icon.svg`}
                  />
                  <input />
                </Input>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Input iconPosition="left" placeholder="Nickname">
                  <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/user-icon.svg`}
                  />
                  <input />
                </Input>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
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

        <Modal.Actions style={{ backgroundColor: '#1E1E27' }}>
          <Button color="grey" onClick={() => setOpenNewPlayerModal(false)}>
            Cancel
          </Button>
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              if (isValidAddressPolkadotAddress(playerAccountId)) {
                dispatch(addCompetitor(playerAccountId, game.vieId))
              } else {
                alert('Invalid competitor account ID')
              }
              setOpenNewPlayerModal(false)
            }}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    )
  }

  const PlayerModal = () => {
    return (
      <Modal
        closeIcon={{ style: { color: 'grey' }, name: 'close' }}
        onClose={() => {
          setOpen(false)
          setCopiedToClipboard(false)
        }}
        onOpen={() => {
          setOpen(true)
          setCopiedToClipboard(false)
        }}
        open={open}
        size={'small'}
        style={modalStyle}
      >
        <Modal.Content style={{ backgroundColor: '#1E1E27' }}>
          <Grid>
            <Grid.Row verticalAlign={'top'}>
              {/* <Grid.Column textAlign='right'>
                  <ReactSVG 
                    src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
                  />
                </Grid.Column> */}
              <Grid.Column textAlign="center">
                {action == 0 && (
                  <ReactSVG
                    onClick={e => {
                      dispatch(removeCompetitor(selectedPlayer?.accountId))
                      setOpen(false)
                      setCopiedToClipboard(false)
                    }}
                    src={`${process.env.PUBLIC_URL}/assets/trash.svg`}
                  />
                )}
              </Grid.Column>
 
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Identicon
                  value={selectedPlayer?.accountId}
                  size={36}
                  theme={'polkadot'}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                {selectedPlayer?.isPending ? (
                  <p style={pendingStyle}>Pending</p>
                ) : (
                  <p style={joinedStyle}>Joined</p>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={12} textAlign="center">
                <p style={{ wordBreak: 'break-all' }}>
                  {selectedPlayer?.accountId}
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                <CopyToClipboard
                  text={selectedPlayer?.accountId}
                  onCopy={() => setCopiedToClipboard(true)}
                >
                  {copiedToClipboard == false ? (
                    <ReactSVG
                      src={`${process.env.PUBLIC_URL}/assets/copy-to-clipboard.svg`}
                    />
                  ) : (
                    <ReactSVG
                      src={`${process.env.PUBLIC_URL}/assets/checkmark.svg`}
                    />
                  )}
                </CopyToClipboard>
              </Grid.Column>
            </Grid.Row>
            {action == 1 && (
              <>
                <Grid.Row>
                  <Grid.Column textAlign="center">Set a Place</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{PayoutTable()}</Grid.Column>
                </Grid.Row>
              </>
            )}
          </Grid>
        </Modal.Content>

        <Modal.Actions style={{ backgroundColor: '#1E1E27' }}>
          <Button color="grey" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    )
  }

  const row = (player, index) => {
    const { accountId, username, isPending, staked, place } = player
    return (
      <Table.Row
        key={username}
        style={rowStyles}
        onClick={e => {
          setSelectedPlayer(player)
          setSelectedIndex(index)
          setOpen(true)
        }}
      >
        <Table.Cell textAlign={'left'} onClick={e => {}}>
          <Identicon value={accountId} size={36} theme={'polkadot'} />
        </Table.Cell>
        <Table.Cell textAlign={'right'} onClick={e => {}}>
          {place && place}
          {/* {!player.place && ('no place')} */}
        </Table.Cell>
        <Table.Cell textAlign={'center'} onClick={e => {}}>
          {username}
        </Table.Cell>
        {/* <Table.Cell  textAlign={'right'} onClick={(e)=>{}}>
          <ReactSVG 
             src={`${process.env.PUBLIC_URL}/assets/empty-ribbon.svg`}
          />
          </Table.Cell> */}
        <Table.Cell textAlign={'right'} onClick={e => {}}>
          {!staked ? (
            <p style={pendingStyle}>Pending</p>
          ) : (
            <p style={joinedStyle}>Joined</p>
          )}
        </Table.Cell>
      </Table.Row>
    )
  }

  const PlayersTable = () => (
    <Table unstackable fixed singleLine role="grid" aria-labelledby="header" style={{backgroundColor:'#11111E'}}>
      <Table.Header style={{backgroundColor:'#11111E'}}>
        <Table.Row key={0}>
          <Table.HeaderCell
            textAlign={'left'}
            onClick={e => {
              console.log('clicked the filter')
            }}
            colSpan="3"
            id="header"
            style={{backgroundColor:'#11111E'}}
          >
            <ReactSVG src={`${process.env.PUBLIC_URL}/assets/filter.svg`} />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3" id="header" textAlign={'center'} style={{backgroundColor:'#11111E', color:'white'}}>
            {' '}
            Players{' '}
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan="3"
            id="header"
            textAlign={'right'}
            onClick={e => {
              setOpenNewPlayerModal(true)
            }}
            style={{backgroundColor:'#11111E', color:'white'}}
          >
            {action == 0 && (
              <ReactSVG src={`${process.env.PUBLIC_URL}/assets/add-item.svg`} />
            )}
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row key={1}>
          <Table.HeaderCell
            textAlign={'left'}
            onClick={e => {
              console.log('clicked the filter')
            }}
            colSpan="3"
            id="header"
            style={{backgroundColor:'#11111E', color:'white'}}
          >
            {'Account Id'}
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3" id="header" textAlign={'center'} 
           style={{backgroundColor:'#11111E', color:'white'}}
           >
            {' '}
            {'Place'}
            {' '}
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan="3"
            id="header"
            textAlign={'right'}
            onClick={e => {
              setOpenNewPlayerModal(true)
            }}
            style={{backgroundColor:'#11111E', color:'white'}}
          >
           {'Status'}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {game?.competitors?.map((player, index) => {
          return row(player, index)
        })}
      </Table.Body>
    </Table>
  )

  return (
    <div ref={contextRef}>
         <PlayerModal />
      <NewPlayerModal />
      <Grid textAlign="center" >
      <Grid.Row>
          <Grid.Column>

      {PlayersTable()}
          </Grid.Column>
        </Grid.Row>

      </Grid>
      
    </div>
  )
}

{
  /* scrolling style={{display: 'inline-flex', overflow: 'scroll'}} */
}
{
  /* style={{display: 'inline-flex', overflow: 'scroll',width:'100%'}} */
}

//   <List vertical divided relaxed style={{height:343,width:346,backgroundColor:'white'}}>
//   {listItemv2("15ARHHGKk5mW6ne99nyqTjFsaQVitTdvbb4yMmbPmqwfKtdq")}
// </List>
