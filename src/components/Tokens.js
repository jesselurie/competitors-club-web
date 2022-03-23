import React, { createRef, useState } from 'react'
import {
  Grid,
  Button,
  Modal,
  Table,
  Input,
  Header,
  Icon,
  Segment,
  Container,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon'
import { ReactSVG } from 'react-svg'
import { isValidAddressPolkadotAddress,toBalance } from '../utils/index'
import { addCompetitor, removeCompetitor } from '../redux/orm/models/competitor'
import { useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setPlaceAccountId, resetPlace } from '../redux/orm/models/place'
import { useReduxState } from '../modules'
import {Transfer} from '../Transfer';
import { formatBalance } from '@polkadot/util'
import { TxButton } from '../substrate-lib/components'
import './tokens.css'

// import ScrollMenu from 'react-horizontal-scrolling-menu';
// import './podium.css';
/**
 * Title
 * Account Balance
 * Send Token
 * Transactions
 */

const styles = {
  grid: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 38,
    textTransform: 'uppercase',
    color: '#EEEEEE',
    backgroundColor: '#11111E',
    // height: 1000
  },
  title: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 38,
    textTransform: 'uppercase',
    color: '#EEEEEE',
  },
  hero: {
    // width: 1092,
    // height: 150,
    background:
      'linear-gradient(180deg, #213830 0%, #213830 0.01%, #1C342C 100%)',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
  },
  accountBalanceTitle: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'rgba(238, 238, 238, 0.9)',
  },
  accountBalanceAmount: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 38,
    textTransform: 'uppercase',
    color: '#FDFCFC',
  },
  send: {
    background: '#A01C0E',
    borderRadius: 58,
    width: 243,
    height: 56,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 22,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  newPlayerModalStyle: {
    width: 400,
    height: 450,
    borderRadius: 10,
    backgroundColor: '#11111E',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 18,
    color: '#EEEEEE',
  },
  status: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'bold',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.02,
    // textTransform: 'uppercase',
    wordBreak: 'break-all',
  },
}

export default function Main(props) {
  const dispatch = useDispatch()
  const contextRef = createRef()
  const [account] = useReduxState()
  const [openTransactionModal, setOpenTransactionModal] = React.useState(false)

  const { action, game } = props

  const TransactionModal = () => {
    const [playerAccountId, setPlayerAccountId] = useState(null)
    const [tokenAmount, setTokenAmount] = useState(0)
    const [status, setStatus] = useState(null)
    // const [valid, setValid] = useState(false)
    return (
      <Modal
        closeIcon={{
          style: { top: '1.0535rem', right: '1rem', color: 'grey' },
          name: 'close',
        }}
        onClose={() => setOpenTransactionModal(false)}
        onOpen={() => setOpenTransactionModal(true)}
        open={openTransactionModal}
        // size={'small'}
        style={styles.newPlayerModalStyle}
      >
        <Modal.Content style={{ backgroundColor: '#1E1E27' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">SEND TOKEN</Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Input
                  iconPosition="left"
                  onChange={(e, data) => {
                    setPlayerAccountId(data.value)
                    // if (isValidAddressPolkadotAddress(playerAccountId)) {
                    //     //   dispatch(addCompetitor(playerAccountId, game.vieId))
                    //     // Send transaction
                    //     setValid(true)
                    //   }else {
                    //       setValid(false)
                    //   }
                  }}
                  placeholder={"AccountId"}
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
                <Input iconPosition="left" placeholder="Amount" type={'number'}  onChange={(e, data) => {
                    setTokenAmount(toBalance(data.value))
                    console.log(tokenAmount)
                  }}>
                  <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/cclub-red.svg`}
                  />
                  <input />
                </Input>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                   <p style={styles.status}>{status}</p>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>

        <Modal.Actions style={{ backgroundColor: '#1E1E27' }}>
          <Button color="grey" onClick={() => setOpenTransactionModal(false)}>
            Cancel
          </Button>
          <TxButton
              label="Start"
              type="SIGNED-TX"
              setStatus={setStatus}
            //   disabled={!valid}
              attrs={{
                palletRpc: 'balances',
                callable: 'transfer',
                //stake,podium,competitors,memo
                inputParams: [playerAccountId,tokenAmount],
                paramFields: [true,true],
              }}
            />
          {/* <Button
            content="Send"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              if (isValidAddressPolkadotAddress(playerAccountId)) {
                //   dispatch(addCompetitor(playerAccountId, game.vieId))
                // Send transaction
                setOpenTransactionModal(false)
              } else {
                  alert('Invalid competitor account ID')
              }
              
            }}
            color="red"
          /> */}
        </Modal.Actions>
      </Modal>
    )
  }

  return (
    <div ref={contextRef}>
    <Container style={{backgroundColor:'#11111E',height:1000}} fluid>
      <TransactionModal />
      <Grid textAlign="center" style={styles.grid} verticalAlign={'middle'} 
         stackable
         // celled
         columns="equal"
        //  style={{ backgroundColor: '#11111E', height: 1000}}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1 style={styles.title}>{'Transactions'}</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched columns={3} style={styles.hero}>
          <Grid.Column textAlign="left">
            <ReactSVG
              src={`${process.env.PUBLIC_URL}/assets/cclub-yellow.svg`}
            />
          </Grid.Column>
          <Grid.Column textAlign="left">
            <h1 style={styles.accountBalanceTitle}>{'Account Balance'}</h1>
            <p style={styles.accountBalanceAmount}>
              {formatBalance(
                account?.accountData?.data?.free,
                    { withSi: false, forceUnit: '-' },
                    12
                  )}{' '}{'CCLUB'}{' '}
              
            </p>
          </Grid.Column>
          <Grid.Column textAlign="middle">
            <Button style={styles.send} onClick={() => setOpenTransactionModal(true)}>{'SEND TOKEN'}</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    </div>
  )
}
