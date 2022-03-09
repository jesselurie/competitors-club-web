import React, { useEffect, useState } from 'react'
import { Table, Grid, Button, Label, Image, Divider, Form, Segment  } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSubstrateState } from './substrate-lib'
import Memo from './components/Memo';
import SidePanel from './components/SidePanel';
import Podium from './components/Podium';
import Players from './components/Players';
import Actions from './components/Actions';

const Home = () => (
   <Grid>
     <Grid.Row>
       <Grid.Column mobile={16} tablet={16} computer={16}>
         <Memo 
            stake={10}
            totalStake={100}
            memo={"THIS STRING IS 256 CHARACTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}/>
       </Grid.Column>
     </Grid.Row>
 
     <Grid.Row>
       <Grid.Column>
          <Podium/>
       </Grid.Column>
     </Grid.Row>

     <Grid.Row>
       <Grid.Column>
         <Players/>
       </Grid.Column>
     </Grid.Row>
   </Grid>
 )

const Dashboard = () => (
   <Segment placeholder>
     <Grid columns={2}>
       <Grid.Column width={3}>
         <SidePanel/>
       </Grid.Column>
 
       <Grid.Column width={13}>
         <Home/>
       </Grid.Column>
     </Grid>
 
     {/* <Divider vertical>Or</Divider> */}
   </Segment>
 )

export default function Main(props) {
  // const { api, keyring } = useSubstrateState()
  // const accounts = keyring.getPairs()

  return (
     <Home/>
   //   <Dashboard/>
   //   <Grid.Column>
   //      <Memo/>
   //      <SidePanel/> 
   //      <Podium/>
   //      <Players/>
   //      <Actions/>
   //   </Grid.Column>
  )
}
