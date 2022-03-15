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
import { editPlaceSelector, gameSelector,accountSelector,fullAccountSelector} from './redux/orm/selectors';

import {useSelector,useDispatch} from 'react-redux';
import { onboardingSelector} from './redux/orm/selectors';
import { createUser } from './redux/orm/models';
import {selectAccount} from './redux/reducers/selectedAccountReducer';
import {setCurrentGameVieId} from  './redux/reducers/currentGameVieIdReducer';
import { useReduxState } from './modules'

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
    const dispatch = useDispatch();
    const [account,selectedGame] = useReduxState();
    // console.log("account: ",account);
    // console.log("selectedGame: ",selectedGame)
    // const [competitor,vie,wins,accountData,isOperator] = useCompetition();
    // const { keyringState,apiState} = useSubstrateState();
    // const {state: { keyring, currentAccount }} = useSubstrate();
    // const username = useSelector(state => state.selectedAccount);
    // const account = useSelector(state => accountSelector(username)(state));      
    // const onboarding = useSelector(state=>onboardingSelector(state));
    // console.log('ONBOARDING:',onboarding);
    // console.log('ACCOUNT:',account);
    // console.log('USERNAME: ', username);
    
    const contextRef = createRef()
    
    // useEffect(()=>{
    //     if (keyringState == 'READY' && apiState == 'READY') {
    //         console.log(competitor,vie,wins,accountData, isOperator);
    //         console.log('CURRENT ACCOUNT: ', currentAccount.address);
    //         dispatch(createUser(currentAccount.address,"12/34/56"));
    //         dispatch(selectAccount(currentAccount.address));
    //         dispatch(setCurrentGameVieId("0x00000000000000000000000000000000"));
    //     }
    // },[currentAccount]);

    return (
        <div ref={contextRef}>
            <Grid stackable celled columns='equal' style={{backgroundColor:'#1E1E27'}}>
                <Grid.Row columns={3}>
                    <Grid.Column >
                        <Players/>    
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <EntryFee entryFee={10}/>   
                        <Trophy/> 
                        <Memo memo={'THIS STRING IS 256 CHARACTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}/>  
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
