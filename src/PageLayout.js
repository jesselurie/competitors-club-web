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
import Topbar from './components/Topbar';
import { useLiveData, useReduxState } from './modules';


function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [liveData] = useLiveData();
  // const [account,selectedGame,game] = useReduxState();
  
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
    <div style={{ backgroundColor: '#11111E'}}>
      <Topbar/>      
      <DeveloperConsole />
    </div>
  )
}

export default function PageLayout({children}) {
  return (
    <SubstrateContextProvider>
      <Main />
      <Outlet />
    </SubstrateContextProvider>
  )
}
