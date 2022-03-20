import React, { createRef } from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Players from './components/Players'
import EntryFee from './components/EntryFee'
import Memo from './components/Memo'
import Trophy from './components/Trophy'
import Payouts from './components/Payouts'
import Chat from './components/Chat'
import Actions from './components/Actions'
import { useReduxState } from './modules'

const styles = {
  title: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 44,
    letterSpacing: 0.02,
  },
}

export default function Main(props) {
  const [account, selectedGame, game] = useReduxState()
  const contextRef = createRef()

  return (
    <div ref={contextRef}>
      <Grid
        stackable
        // celled
        columns="equal"
        style={{ backgroundColor: '#11111E', height: 1000}}
        >
        <Grid.Row columns={3} verticalAlign={'middle'}>
          <Grid.Column textAlign="center" stretched>
            <Players action={selectedGame} game={game} />
          </Grid.Column>
          <Grid.Column textAlign="center" stretched>
            <EntryFee action={selectedGame} game={game} />
            <Trophy />
            <Memo action={selectedGame} game={game} />
            <Actions action={selectedGame} game={game} competitorData={account?.competitorData}/>
          </Grid.Column>
          <Grid.Column textAlign="center" stretched>
            <Payouts action={selectedGame} game={game} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Chat />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
