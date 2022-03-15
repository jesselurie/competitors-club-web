import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  Menu,
  Button,
  Dropdown,
  Container,
  Icon,
  Image,
  Label,
  Header
} from 'semantic-ui-react'

import { useSubstrate, useSubstrateState } from '../substrate-lib'
import useBlockNumber from './Blocknumber'
import { ReactSVG } from 'react-svg'
// import BlockNumber from './Blocknumber'

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'

const acctAddr = acct => (acct ? acct.address : '')

function Main(props) {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }))

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : ''

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress])

  const onChange = addr => {
    setCurrentAccount(keyring.getPair(addr))
  }
  const [blocknumber] = useBlockNumber({finalized:true})
 
  const blocknumberStyles = {
    backgroundColor: '#11111E',
    borderColor: '#11111E',
    paddingTop: '1em',
    paddingBottom: '1em',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color:'#213830',
  };
  const fixedMenuStyle = {
    backgroundColor: '#11111E',
    // border: '1px solid #ddd',
    // boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  }
  return (
    <Menu
    attached="top"
    tabular
    fluid
    stackable
    style={fixedMenuStyle}>

    <Menu.Menu position="left" style={{ alignItems: 'center' }}>
    <Image size='medium'src={`${process.env.PUBLIC_URL}/assets/cclub-logo-horizontal.png`} />
        <p style={blocknumberStyles}># {blocknumber}</p>
    </Menu.Menu>
      <Menu.Menu position="right" style={{ alignItems: 'center' }}>
        {!currentAccount ? (
          <span>
            Create an account with Polkadot-JS Extension (
            <a target="_blank" rel="noreferrer" href={CHROME_EXT_URL}>
              Chrome
            </a>
            ,&nbsp;
            <a target="_blank" rel="noreferrer" href={FIREFOX_ADDON_URL}>
              Firefox
            </a>
            )&nbsp;
          </span>
        ) : null}
        <CopyToClipboard text={acctAddr(currentAccount)}>
          <Button
            basic
            circular
            size="large"
            icon="user"
            color={currentAccount ? 'green' : 'red'}
          />
        </CopyToClipboard>
        <Dropdown
          search
          selection
          clearable
          placeholder="Switch Account"
          options={keyringOptions}
          onChange={(_, dropdown) => {
            onChange(dropdown.value)
          }}
          value={acctAddr(currentAccount)}
          style={{backgroundColor:'#11111E',color: '#EEEEEE', fontFamily: 'Montserrat',fontWeight: 'medium',fontSize: 14}}
        />
        <BalanceAnnotation />
      </Menu.Menu>
    </Menu>
  )
}

function BalanceAnnotation(props) {
  const { api, currentAccount } = useSubstrateState()
  const [accountBalance, setAccountBalance] = useState(0)

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api.query.system
        .account(acctAddr(currentAccount), balance =>
          setAccountBalance(balance.data.free.toHuman())
        )
        .then(unsub => (unsubscribe = unsub))
        .catch(console.error)

    return () => unsubscribe && unsubscribe()
  }, [api, currentAccount])

  return currentAccount ? (
    <Label pointing="left" color='black'>
        {/* <ReactSVG 
                          src={`${process.env.PUBLIC_URL}/assets/cclub-white.svg`}
                    /> */}
      {/* <Icon name="money" color="green" /> */}
      {accountBalance}
    </Label>
  ) : null
}

export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
