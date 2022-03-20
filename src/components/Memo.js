import React, { createRef, useState} from 'react'
import {
  Grid,
  Button,
  Modal,
  TextArea
} from 'semantic-ui-react'
import { ReactSVG } from 'react-svg'
import {addMemo} from '../redux/orm/models/game';
import 'semantic-ui-css/semantic.min.css'
import { useDispatch } from 'react-redux'; 
import {hexToAscii} from '../utils';

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
        fontSize: 14,
        // letterSpacing: 0.02,
        // textTransform: 'uppercase',
        wordBreak:"break-all",
    },
    editMemo: {
      // color: '#EEEEEE',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 14,
      // letterSpacing: 0.02,
      // textTransform: 'uppercase',
      wordBreak:"break-all",
  },
    memoModalTitle: {
        color: '#EEEEEE',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 22,
    }
  
};

//Create a new memo or render an existing memo. 
export default function Main(props) {
    const dispatch = useDispatch()
    const contextRef = createRef()
    const [open, setOpen] = React.useState(false)
    const {game,action} = props;
  
    const MemoModal = () => {
      const [editMemo, setEditMemo] = useState(game.memo);
        return (
          <Modal
            closeIcon={{ style: { top: '1.0535rem', right: '1rem',color:'#2B2B35' }, name: 'close' }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            // size={'small'}
            style={styles.modalStyle}
          >
            <Modal.Content style={{backgroundColor:'#1E1E27'}}>
              <Grid stretched>
                <Grid.Row verticalAlign='top'>
                    <Grid.Column textAlign='center'>
                        <h1 style={styles.memoModalTitle}>Memo</h1>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column >
                    <TextArea placeholder={game.memo} style={styles.editMemo} rows={6} onChange={(e,data)=>{setEditMemo(data.value)}}/>
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
                   dispatch(addMemo(editMemo,game.vieId))
                  setOpen(false)
                }}
                color='red'
              />
            </Modal.Actions>          
          </Modal>
        )
      }
    return (
    <div ref={contextRef}>
        <MemoModal/>
          <Grid textAlign='center'>
              <Grid.Row columns={2}>
                  <Grid.Column textAlign='center' width={12}>
                      <p style={styles.memo}>
                        {/* {game.memo} */}
                        {/* {action !== 0 && (hexToAscii(game.memo))} */}
                        {/* {action === 0 && game.memo} */}
                        {/* {action == 0 && (game?.memo)} */}
                        {game.memo  && action !==0 &&  (hexToAscii(game.memo))}
                        {game.memo !== "" && action ===0 &&  game.memo}
                      </p>
                  </Grid.Column>
                  <Grid.Column textAlign='center' width={4}>
                    {action == 0 && ( <ReactSVG 
                    onClick={(e)=>{setOpen(true)}}
                      src={`${process.env.PUBLIC_URL}/assets/edit-icon.svg`}
                  /> )}
                  </Grid.Column>
              </Grid.Row>
          </Grid>
    </div>
    )
}
