import React, { createRef, useEffect } from 'react'
import {
    Container
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Memo from './components/Memo';
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
            <Container style={{backgroundColor:'#11111E',width:'100%'}}>
              <Memo/>
            </Container>
        </div>
    )
}
