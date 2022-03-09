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

export function CreateButton(props) {
    const contextRef = createRef()
    return (
    <div ref={contextRef}>            
        <Button color="red">Create A Competition</Button>    
    </div>
    )
}

export default function Main(props) {
    const contextRef = createRef()
    return (
    <div ref={contextRef}>
        {/* <Container> */}
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign='center' width={2} >
                        <Button color="#2B2B35">Deny</Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center' width={2}>
                        <Button color="red">Accept</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        {/* </Container> */}
    </div>
    )
}
