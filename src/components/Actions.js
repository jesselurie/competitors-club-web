/* global BigInt */
import React, { createRef, useEffect, useState } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Button,
} from 'semantic-ui-react'
import { TxButton } from '../substrate-lib/components'
import 'semantic-ui-css/semantic.min.css'
import { useValidateCompetition } from '../modules';
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

export function FinishButton(props) {
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
    const {game} = props    
    const [setSubmit,valid,competitors,podium,stake, memo] = useValidateCompetition(game)
    const [status,setStatus] = useState(null)
    //Check the state of the game before managing the submission here
    const contextRef = createRef()
    // console.log("SUB: ",{stake,podium,competitors,memo})
    useEffect(()=>{
        setSubmit(true)
        console.log("COMPETITORS: ",competitors)
        console.log("PODIUM: ",podium)
        console.log("STAKE: ",stake)
        console.log("MEMO: ",memo)
    },[])

    const toBalance = (value) =>{ 
        var balance = BigInt(value);
        var multiplier = BigInt(1000000000000);
        var total = balance * multiplier;
        return total.toLocaleString('fullwide',{useGrouping:false});
      }

    const sumPlaces = () => {
        let sum = 0;
    
        for (let i = 0; i < game.podium.length; i++) {
            sum += Number(game.podium[i].payout);
        }
        return sum;
    }
    
    const totalStaked = () => {
        return (game.competitors.length +1) * game.stake;
    }
    
    const checkValidPlaces = ()=>{
        if (sumPlaces() !== totalStaked()){
          return false
        }
        return true
    }

    return (
        <div ref={contextRef}>            
            <TxButton
                label="Start"
                type="SIGNED-TX"
                setStatus={setStatus}
                // disabled={valid}
                attrs={{
                palletRpc: 'vies',
                callable: 'vie',
                //stake,podium,competitors,memo
                inputParams: [{
                stake:toBalance(game.stake),
                podium:game.podium.map((p)=>{
                    return {
                      payout: toBalance(p.payout),
                      spot: p.spot
                    };
                  }),
                competitors:game.competitors.map((c)=>{
                    return c.accountId
                  }),
                memo: game.memo}],
                paramFields: [true],
                }}
            />
            {status}
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
    const {action, game} = props
    if(action == 0) {
        return (
            <div ref={contextRef}>
                <CreateButton
                    game={game}
                />
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
                <FinishButton/>
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
