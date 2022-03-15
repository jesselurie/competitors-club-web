import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Button,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
/**
 * Memo
 * Buyin
 * Total Stake
 */
const styles = {
    memo: {
        color: '#EEEEEE',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 0.02,
        textTransform: 'uppercase',
        wordBreak:"break-all",
    },
    stake: {
        color: '#A01C0E',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 36,
        letterSpacing: 0.02,
    },
    totalStake: {
        color: 'rgba(238, 238, 238, 0.6)',
        fontFamily: 'Montserrat',
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: 23,
        letterSpacing: 0.02,
    }
};

export function FinisheButton(props) {
    const contextRef = createRef()
    return (
    <div ref={contextRef}>            
       <Grid>
        <Grid.Row columns={2}>
            <Grid.Column textAlign='center'  >
                <Button color="#2B2B35">Force Quit</Button>
            </Grid.Column>
            <Grid.Column textAlign='center'>
                <Button color="red">Finish</Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
    )
}

export function CreateButton(props) {
    const contextRef = createRef()
    return (
    <div ref={contextRef}>            
        <Button color="red">Start</Button>    
    </div>
    )
}


export function JoinButtons(props) {
    const contextRef = createRef()
    return (
               
        <div ref={contextRef}>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign='center' width={2} >
                            <Button color="#2B2B35">Deny</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={2}>
                            <Button color="red">Join</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
    )
}

// --- COMPETE ---
//       CREATE GAME 
//       FINISH GAME 
//       JOIN GAME 
//         0: NEW GAME 
//             - Create game
//         1: OPERATOR
//             - Waiting for everyone to accept
//             - Everyone accepted, create podium and submit results 
//         2: COMPETITOR
//             - Invited to a game 
//             - Waiting for everyone to accept 
//             - Waiting for operator to finish
export default function Main(props) {
    const contextRef = createRef()
    const {action} = props
    if(action == 0) {
        return (
            <div ref={contextRef}>
             <CreateButton/>
            </div>
        )
    }
    if (action ==2) {
        return (
            <div ref={contextRef}>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign='center' width={2} >
                            <Button color="#2B2B35">Deny</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={2}>
                            <Button color="red">Join</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
    if (action ==1) {
        return(
            <div ref={contextRef}>
                <FinisheButton/>
            </div>
        )
    }

    // return (
    // <div ref={contextRef}>
    //     {/* <Container> */}
    //         <Grid>
    //             <Grid.Row columns={2}>
    //                 <Grid.Column textAlign='center' width={2} >
    //                     <Button color="#2B2B35">Deny</Button>
    //                 </Grid.Column>
    //                 <Grid.Column textAlign='center' width={2}>
    //                     <Button color="red">Accept</Button>
    //                 </Grid.Column>
    //             </Grid.Row>
    //         </Grid>
    //     {/* </Container> */}
    // </div>
    // )
}
