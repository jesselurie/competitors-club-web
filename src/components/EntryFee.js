import React, { createRef, useState } from 'react'
import { Grid, Button, Input, Modal, Label } from 'semantic-ui-react'
import { ReactSVG } from 'react-svg'
import 'semantic-ui-css/semantic.min.css'
import { addStake } from '../redux/orm/models'
import { useDispatch } from 'react-redux'
import { formatBalance } from '@polkadot/util'
import {toBalance} from '../utils'
/**
 * Memo
 * Buyin
 * Total Stake
 *
 * Actions: Create, Edit, Display
 */
const styles = {
  memo: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 22,
    // letterSpacing: 0.02,
    // textTransform: 'uppercase',
    // wordBreak:"break-all",
  },
  stake: {
    color: '#A01C0E',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    // letterSpacing: 0.02,
  },
  entryFee: {
    color: 'rgba(238, 238, 238, 0.6)',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 26,
    letterSpacing: 0.03,
  },
  edit: {
    color: '#A01C0E',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    // lineHeight: 31,
    letterSpacing: 0.03,
  },
  modalStyle: {
    width: 675,
    height: 567,
    borderRadius: 10,
    backgroundColor: '#1E1E27',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 18,
    color: '#EEEEEE',
  },
}

//Create a new memo or render an existing memo.
export default function Main(props) {
  const dispatch = useDispatch()
  const contextRef = createRef()
  const [open, setOpen] = React.useState(false)
  const { game, action } = props
  // console.log(game);
  // console.log('ENTRY: ',game?.stake)
  const EntryFeeModal = () => {
    const [editEntryFee, setEditEntryFee] = useState(game.stake)
    return (
      <Modal
        closeIcon={{
          style: { top: '1.0535rem', right: '1rem', color: '#2B2B35' },
          name: 'close',
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // size={'small'}
        style={styles.modalStyle}
      >
        <Modal.Content style={{ backgroundColor: '#1E1E27' }}>
          <Grid>
            <Grid.Row verticalAlign="top">
              <Grid.Column textAlign="center">Entry Fee</Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Input
                  labelPosition="right"
                  type="number"
                  placeholder={formatBalance(
                    game?.stake,
                    { withSi: false, forceUnit: '-' },
                    12
                )}
                  onChange={(e, data) => {
                    setEditEntryFee(toBalance(data.value))
                  }}
                >
                  <Label basic>
                    <ReactSVG
                      src={`${process.env.PUBLIC_URL}/assets/cclub-red.svg`}
                    />
                  </Label>
                  <input />
                  {/* <Label>.00</Label> */}
                </Input>
              </Grid.Column>
            </Grid.Row>
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
            onClick={() => {
              // console.log(editEntryFee, game.vieId)
              dispatch(addStake(editEntryFee, game.vieId))
              setOpen(false)
            }}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    )
  }
  return (
    <div ref={contextRef}>
      <EntryFeeModal />
      <Grid textAlign="center" >
        <Grid.Row>
          <Grid.Column textAlign="center" width={4}>
            <p style={styles.memo}>Entry Fee</p>
          </Grid.Column>
          <Grid.Column  textAlign="right" >
            {action == 0 && (
              <ReactSVG
                onClick={e => {
                  setOpen(true)
                }}
                src={`${process.env.PUBLIC_URL}/assets/edit-icon.svg`}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <p style={styles.entryFee}>{
                formatBalance(
                  game.stake,
                  { withSi: false, forceUnit: '-' },
                  12
              )
              // game.stake
            }</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
