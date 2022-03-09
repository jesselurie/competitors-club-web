import React, { createRef } from 'react'
import {
    Grid,
    List,
    Image,
    Card, 
    Icon, 
    Button,
    Header,
    Modal,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import Menu from './Menu';
// import ScrollMenu from 'react-horizontal-scrolling-menu';
// import './podium.css';
/**
 * Title, Account ID
 * Menu: Home, Tokens, Trophies, Competitions
 * Create Competition
 * 
 */
const styles = {
   title: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 44,
    letterSpacing: 0.02,
   }
};
  
export default function Main(props) {
    const contextRef = createRef()
    return (
        <div ref={contextRef}>
        <Grid>
            <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>
                        <p style={styles.title}>
                            Welcome
                        </p>
                    </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign={'center'}>
                    <Menu/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign={'center'}>
                    <Button color="red">Create A Competition</Button>    
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
        </div>
    )
}

