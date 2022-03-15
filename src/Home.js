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
import {useSelector,useDispatch} from 'react-redux';
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
    const [account,selectedGame,game] = useReduxState();
    console.log("account: ",account);
    console.log("selectedGame: ",selectedGame)
    console.log("GAME: ", game);
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
    // if (account == undefined){
    //     return (
    //         <></>
    //     )
    // }
    return (
        <div ref={contextRef}>
            <Grid stackable celled columns='equal' style={{backgroundColor:'#1E1E27'}}>
                <Grid.Row columns={3}>
                    <Grid.Column >
                        <Players
                            action={selectedGame}
                            game={game}
                        />    
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <EntryFee entryFee={10}/>   
                        <Trophy/> 
                        <Memo memo={'THIS STRING IS 256 CHARACTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}/>  
                        <Actions action={selectedGame}/>
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
