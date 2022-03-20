/* global BigInt */
import React, { createRef, useEffect, useState } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Button,
} from 'semantic-ui-react'
import { TxButton } from '../substrate-lib/components'
import 'semantic-ui-css/semantic.min.css'
import { useValidateCompetition } from '../modules'
/**
 * Memo
 * Buyin
 * Total Stake
 */
const styles = {
  status: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'bold',
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.02,
    // textTransform: 'uppercase',
    wordBreak: 'break-all',
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
  },
}

export function FinishButton(props) {
  const { game } = props
  const [status, setStatus] = useState(null)
  const [valid, setValid] = useState(false)
  const contextRef = createRef()

  useEffect(() => {
    if (game) {
      if (game.champion !== '') {
        setValid(true)
      } else {
        setValid(false)
      }
    }
  }, [game])

  return (
    <div ref={contextRef}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <TxButton
              label="Finish"
              type="SIGNED-TX"
              setStatus={setStatus}
              disabled={game.champion == ''}
              attrs={{
                palletRpc: 'vies',
                callable: 'finish',
                //stake,podium,competitors,memo
                inputParams: [
                  {
                    champion: game?.champion,
                    podium: game?.podium?.map(place => {
                      return {
                        competitor: place.accountId,
                        spot: place.spot,
                      }
                    }),
                  },
                ],
                paramFields: [true],
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><p style={styles.status}>{status}</p></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export function CreateButton(props) {
  const [stake, setStake] = useState(null)
  const [podium, setPodium] = useState(null)
  const [competitors, setCompetitors] = useState(null)
  const [memo, setMemo] = useState(null)
  const [status, setStatus] = useState(null)
  const [valid, setValid] = useState(false)
  //Check the state of the game before managing the submission here
  const contextRef = createRef()
  const { game } = props

  const toBalance = value => {
    var balance = BigInt(value)
    var multiplier = BigInt(1000000000000)
    var total = balance * multiplier
    return total.toLocaleString('fullwide', { useGrouping: false })
  }

  const sumPlaces = () => {
    let sum = 0

    for (let i = 0; i < game.podium.length; i++) {
      sum += Number(game.podium[i].payout)
    }
    return sum
  }

  const totalStaked = () => {
    return (game.competitors.length + 1) * game.stake
  }

  const checkValidPlaces = () => {
    if (sumPlaces() !== totalStaked()) {
      return false
    }
    return true
  }

  // console.log("SUB: ",{stake,podium,competitors,memo})
  useEffect(() => {
    if (game) {
      setMemo(game?.memo)
      setStake(game?.stake)
      setPodium(
        game?.podium?.map(p => {
          return {
            payout: p.payout,
            spot: p.spot,
          }
        })
      )
      setCompetitors(
        game?.competitors?.map(c => {
          return c.accountId
        })
      )
      setValid(checkValidPlaces(game))
    }
   
  }, [game])

  return (
    <div ref={contextRef}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <TxButton
              label="Start"
              type="SIGNED-TX"
              setStatus={setStatus}
              disabled={!valid}
              attrs={{
                palletRpc: 'vies',
                callable: 'vie',
                //stake,podium,competitors,memo
                inputParams: [{ stake, podium, competitors, memo }],
                paramFields: [true],
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><p style={styles.status}>{status}</p></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export function JoinButtons(props) {
  const [status, setStatus] = useState(null)
  const contextRef = createRef()
  const { competitorData } = props
  return (
    <div ref={contextRef}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {!competitorData.staked && (
              <TxButton
                label="Join"
                type="SIGNED-TX"
                setStatus={setStatus}
                disabled={false}
                attrs={{
                  palletRpc: 'vies',
                  callable: 'join',
                  //stake,podium,competitors,memo
                  inputParams: [],
                  paramFields: [],
                }}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><p style={styles.status}>{status}</p></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

// --- COMPETE ---
//       CREATE GAME
//       FINISH GAME
//       JOIN GAME
//         0: NEW GAME
//             - Create game
//         1: OPERATOR
//             - Waiting for everyone to accept
//             - Everyone accepted, create podium and submit results
//         2: COMPETITOR
//             - Invited to a game
//             - Waiting for everyone to accept
//             - Waiting for operator to finish
//         3: COMPETITOR JOINED
export default function Main(props) {
  const contextRef = createRef()
  const { action, game, competitorData } = props

  if (action == 0) {
    return (
      <div ref={contextRef}>
        <CreateButton game={game} />
      </div>
    )
  }
  if (action == 2) {
    return (
      <div ref={contextRef}>
        <JoinButtons competitorData={competitorData} />
      </div>
    )
  }
  if (action == 1) {
    return (
      <div ref={contextRef}>
        <FinishButton game={game} />
      </div>
    )
  }
}
