import React from 'react'
import {
  Dimmer,
  Loader,
  Grid,
  Message
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Outlet } from "react-router-dom";
import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'
import { Provider } from 'react-redux';
import {PersistGate } from 'redux-persist/lib/integration/react';
import store, {persistor} from './redux/store';
import Topbar from './components/Topbar';
import { useLiveData, useReduxState } from './modules';
import { useSelector} from 'react-redux';
import { accountSelector } from './redux/orm/selectors';

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [liveData] = useLiveData();
  const [account,selectedGame,game] = useReduxState();

  // const username = useSelector(state => state.selectedAccount);
  // const account = useSelector(state => accountSelector(username)(state));  
  // const selectedGame = useSelector(state=>state.isNewOrOperatorOrCompetitor);
  // console.log('account: ',account);
  // console.log('selectedGame: ',selectedGame);

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  } 
  
  return (
    <>
      <Topbar/>      
      <DeveloperConsole />
    </>
  )
}

export default function PageLayout({children}) {
  return (
    <SubstrateContextProvider>
       <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Main />
            <Outlet />
          </PersistGate>
        </Provider>
    </SubstrateContextProvider>
  )
}
