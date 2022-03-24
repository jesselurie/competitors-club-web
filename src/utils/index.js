
/* global BigInt */
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import {hexToU8a, isHex } from '@polkadot/util';

export const toBalance = value => {
    var balance = BigInt(value)
    var multiplier = BigInt(1000000000000)
    var total = balance * multiplier
    return total.toLocaleString('fullwide', { useGrouping: false })
  }

export function toHex(x) {
   return x
       .split('')
       .map(c => c.charCodeAt(0).toString(16))
       .map(n => (n.length < 2 ? `0${n}` : n))
       .join('');
}

export const checksummedAddress = (address, hash) => {
   let result = '';
   for (let n = 0; n < 40; n++) {
       result = `${result}${
           parseInt(hash[n], 16) > 7 ? address[n].toUpperCase() : address[n]
       }`;
   }
   return result;
};



//len 12, 24
export const hexToAscii = (str1) => {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }


// const address = '5GrpknVvGGrGH3EFuURXeMrWHvbpj3VfER1oX5jFtuGbfzCE';

export const isValidAddressPolkadotAddress = (address) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );
    return true;
  } catch (error) {
    return false;
  }
};

// const isValid = isValidAddressPolkadotAddress();

// console.log(isValid);

export const ordinal_suffix_of = (i)=> {
  var j = i % 10,
      k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st";
  }
  if (j === 2 && k !== 12) {
      return i + "nd";
  }
  if (j === 3 && k !== 13) {
      return i + "rd";
  }
  return i + "th";
}

export const explorerQueryUrl = "https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fnode0.competitors.club%2Fwss#/explorer/query/";

// export const alertAndCopyTxURL = (blockhash) => {
//     const message = "Transaction complete & url copied to clipboad! To view paste in browser.";
//     Clipboard.setString(explorerQueryUrl + blockhash);
//     alert(message+ " https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fnode0.competitors.club%2Fwss#/explorer/query/" + blockhash);
// }

export const checkEventsForErrors = (section,method,data) => {
    let module;
    let error;
    if(method==ExtrinsicFailed){
        module = runtimeModules[data[0].module.index];
        error = palletErrors[data[0].module.error];
        return {
            module,
            error
        }
    }
    return null;
};

 // Add description for each error to display to user.
export const palletErrors  = [
    "Overflow",
		"NoneValue",
		"StorageOverflow",
		"PayoutRatioNotEqualTo100",
		"PodiumSpotsOutOfRange",
		"VieRequiresAtLeast2Participants",
		"OperatorCanOnlyBeInOneVieAtATime",
		"CompetitorCanOnlyBeInOneVieAtATime",
		"CompetitorNotInvitedToJoinVie",
		"VieDoesNotExist",
		"OperatorDoesNotExist",
		"PodiumSpotsMustMatchPodiumStructure",
		"PodiumRewardSumMustEqualAllCompetitorsStake",
		"DuplicateCompetitorsAreNotAllowed",
		"PodiumMustOnlyHaveCompetitorsInVie",
		"CompetitorAlreadyStaked",
		"CompetitorsMustAllJoinToFinishTheVie",
		"MemoTooBig",
		"RemoveOperatorFromCompetitors",
];

 // Add description for each error to display to user.
 export const humanPalletErrors  = {
  "Overflow": "",
  "NoneValue": "",
  "StorageOverflow": "",
  "PayoutRatioNotEqualTo100": "The payouts must sum to the total buyins.",
  "PodiumSpotsOutOfRange": "The podium spots must be submitted in the correct range.",
  "VieRequiresAtLeast2Participants": "The competition must have at least 2 competitors including the operator.",
  "OperatorCanOnlyBeInOneVieAtATime": "The operator can only be in one competition at a time.",
  "CompetitorCanOnlyBeInOneVieAtATime": "The competitor can only be in one competition at a time.",
  "CompetitorNotInvitedToJoinVie": "This competitor is not invited to join any competitions at the moment.",
  "VieDoesNotExist": "The competition does not exist.",
  "OperatorDoesNotExist": "The operator does not exist.",
  "PodiumSpotsMustMatchPodiumStructure": "The places must match the defined podium.",
  "PodiumRewardSumMustEqualAllCompetitorsStake": "The payouts have to equal the sum of all the buyins.",
  "DuplicateCompetitorsAreNotAllowed": "Check the competitors. There are duplicates and that is not allowed.",
  "PodiumMustOnlyHaveCompetitorsInVie": "Attempting to submit podium with a competitor that is not in the competition.",
  "CompetitorAlreadyStaked": "Competitor has already joined the competition.",
  "CompetitorsMustAllJoinToFinishTheVie": "Dear operator, all the competitors must join for your to finish the competition",
  "MemoTooBig": "The memo can only me 256 characters or less.",
  "RemoveOperatorFromCompetitors": "Remove the operator from the competitors. ",
 };

// Add description for each module to display to user.
export const runtimeModules = [
    "runtime moduels start with index 1. hack. hi.",
    "System",
		"RandomnessCollectiveFlip",
		"Timestamp",
		"Aura",
		"Grandpa",
		"Balances",
		"TransactionPayment",
		"Sudo",
		"Nft",
		"Vies",
		"Authorship",
		"NodeAuthorization",
		"Vesting",
];

export const ExtrinsicFailed = "ExtrinsicFailed";

// export const reloadApp = async (mnemonic, dispatch) => {
//     // await cryptoWaitReady();
//     const keyring = new Keyring({ type: 'sr25519' });
//     keyring.setSS58Format(0);
    
//     try {
//       const keyPair = keyring.addFromUri(mnemonic);
//       const username = keyPair.address;
//       const wallet = {accountId:username,mnemonic:mnemonic}
//       // dispatch(createUser(username,wallet,1234));
//       // dispatch(selectAccount(username));
//     //   navigation.navigate('Competition');
//     }catch(e) {
//       alert(e);
//     }
//   }