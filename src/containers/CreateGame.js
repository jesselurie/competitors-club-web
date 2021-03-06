import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Memo from '../components';

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

export default function Main(props) {
    const contextRef = createRef()
    const {memo,stake,totalStake} = props;
    return (
    <div ref={contextRef}>
        {/* <Container> */}
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={12}>
                    </Grid.Column>
                    <Grid.Column textAlign='left' width={4}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <p style={styles.totalStake}>
                            {totalStake} CCLUB Total Stake In This Competition
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        {/* </Container> */}
    </div>
    )
}
