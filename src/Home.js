import React, { createRef, useEffect } from 'react'
import {
    Container, Grid
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import Memo from './components/Memo';
import Players from './components/Players'
import EntryFee from './components/EntryFee'
import Memo from './components/Memo'
import Trophy from './components/Trophy'
import Payouts from './components/Payouts'
import Chat from './components/Chat'
import Actions from './components/Actions';
import {useCompetition} from './substrate-lib/useCompetition';
import { useSubstrate, useSubstrateState } from './substrate-lib';

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
    const [competitor,vie,wins,accountData,isOperator] = useCompetition();
    const { keyringState,apiState} = useSubstrateState();
    const {state: { keyring, currentAccount }} = useSubstrate();
    // Get the list of accounts we possess the private key for
   

    

    const contextRef = createRef()
    //Render props from redux
    //Add api for inital state request
    useEffect(()=>{
        // if (keyringState == 'READY') {
        //     const keyringOptions = keyring.getPairs().map(account => ({
        //         key: account.address,
        //         value: account.address,
        //         text: account.meta.name.toUpperCase(),
        //         icon: 'user',
        //     }))
        //     const initialAddress = keyringOptions.length > 0 ? keyringOptions[0].value : ''
        //     console.log("ACCOUNT ID: ",keyring.getPair(initialAddress).address)
        //   }
        if (keyringState == 'READY' && apiState == 'READY') {
            console.log(competitor,vie,wins,accountData, isOperator);
        }
        
    },[]);

    return (
        <div ref={contextRef}>
            <Grid stackable celled columns='equal' style={{backgroundColor:'#1E1E27'}}>
                <Grid.Row columns={5}>
                    <Grid.Column >
                        <Players/>    
                    </Grid.Column>
                    <Grid.Column >
                        <EntryFee entryFee={10}/>   
                    </Grid.Column>
                    <Grid.Column>
                        <Trophy/> 
                        <Memo memo={'THIS STRING IS 256 CHARACTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}/>  
                    </Grid.Column>
                    <Grid.Column>
                       <Actions action={'start'}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Payouts/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Chat/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
