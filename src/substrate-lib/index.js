import {
  SubstrateContextProvider,
  useSubstrate,
  useSubstrateState,
} from './SubstrateContext'
import utils from './utils'

const types = {
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress",
  "ClassId": "u64",
  "PeerId": "[u8;32]",
  "ClassInfoOf": "ClassId",
  "BalanceOf": "Balance",
  "BalanceReservableOf": "BalanceOf",
  "Moment": "u64",
  "Place": {
    "spot": "u32",
    "payout": "Balance"
  },
  "Competitor": {
    "vie_id": "[u8;16]",
    "staked": "bool",
    "submitted_winner": "bool"
  },
  "Vie": {
    "operator": "AccountId",
    "stake": "Balance",
    "podium": "Vec<Place>",
    "date": "Moment",
    "competitors": "Vec<AccountId>",
    "memo": "Vec<u8>"
  },
  "VieOf": "Vie",
  "VieReq": {
    "stake": "Balance",
    "podium": "Vec<Place>",
    "competitors": "Vec<AccountId>",
    "memo": "Vec<u8>"
  },
  "VieRequestOf": "VieReq",
  "Participants": {
    "AccountId": "[u8;16]"
  },
  "Operators": {
    "AccountId": "[u8;16]"
  },
  "StandingReq": {
    "competitor": "AccountId",
    "spot": "u32"
  },
  "PodiumReq": {
    "champion": "AccountId",
    "podium": "Vec<StandingReq>"
  },
  "PodiumReqOf": "PodiumReq",
  "Trophy": {
    "trophy": "[u8; 16]",
    "competitors": "Vec<AccountId>",
    "stake": "Balance",
    "memo": "Vec<u8>",
    "time": "u64",
    "podium": "Vec<StandingReq<AccountId>>"
  },
  "TokenId": "u64",
  "TokenInfo": {
    "metadata": "Vec<u8>",
    "owner": "AccountId",
    "data": "Trophy"
  },
  "TokenInfoOf": "TokenInfo",
  "AssetId": "u32",
  "TAssetBalance": "Balance",
  "DepositBalance": "Balance",
  "DepositBalanceOf": "Balance",
  "AssetDetails": {
    "owner": "AccountId",
    "issuer": "AccountId",
    "admin": "AccountId",
    "freezer": "AccountId",
    "supply": "Balance",
    "deposit": "DepositBalance",
    "min_balance": "Balance",
    "is_sufficient": "bool",
    "accounts": "u32",
    "sufficients": "u32",
    "approvals": "u32",
    "is_frozen": "bool"
  },
  "AssetMetadata": {
    "name": "Vec<u8>",
    "symbol": "Vec<u8>",
    "decimals": "u8",
    "is_frozen": "bool"
  },
  "Approval": {
    "amount": "Balance",
    "deposit": "DepositBalance"
  }
};

export { SubstrateContextProvider, useSubstrate, useSubstrateState, utils,types }
