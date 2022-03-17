/* global BigInt */
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {putAccountData,putGameData,putTrophiesData,putCompetitorData,createUser} from '../redux/orm/models/account';
import {putCompetitorState} from '../redux/orm/models/competitor';
import {setIsNewOrOperatorOrCompetitor} from '../redux/reducers/isNewOrOperatorOrCompetitorReducer';
import { accountSelector,gameSelector} from '../redux/orm/selectors';
import { addAccountInfo } from '../redux/orm/models';
import { useSubstrate, useSubstrateState } from '../substrate-lib';
import {importGame} from '../redux/orm/models';
import {setCurrentGameVieId} from '../redux/reducers/currentGameVieIdReducer';
import {selectAccount} from '../redux/reducers/selectedAccountReducer';

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
export const useValidateCompetition = (game) => {
    const [valid, setValid] = useState(false)
    const [stake, setStake] = useState(null)
    const [podium, setPodium] = useState(null)
    const [competitors, setCompetitors] = useState(null)
    const [memo,setMemo] = useState(null)
    const [submit, setSubmit] = useState(false)
      
    const toBalance = (value) =>{ 
        var balance = BigInt(value);
        var multiplier = BigInt(1000000000000);
        var total = balance * multiplier;
        return total.toLocaleString('fullwide',{useGrouping:false});
      }

    const sumPlaces = () => {
        let sum = 0;
    
        for (let i = 0; i < game.podium.length; i++) {
            sum += Number(game.podium[i].payout);
        }
        return sum;
    }
    
    const totalStaked = () => {
        return (game.competitors.length +1) * game.stake;
    }
    
    const checkValidPlaces = ()=>{
        if (sumPlaces() !== totalStaked()){
          return false
        }
        return true
    }

   
    
    useEffect(()=>{
            if (submit){ 
            const stakes = toBalance(game.stake);
            const placess = game.podium.map((p)=>{
            return {
                payout: toBalance(p.payout),
                spot: p.spot
            };
            });

            const competitorss = game.competitors.map((c)=>{
                return c.accountId
            });
            setValid(checkValidPlaces())
            setCompetitors(competitorss)
            setPodium(placess)
            setStake(stakes)
            // console.log("COMPETITORS: ",competitorss)
            // console.log("PODIUM: ",placess)
            // console.log("STAKE: ",stakes)
            // console.log("MEMO: ",memo)
            }
    },[game])

  return [setSubmit,valid,competitors,podium,stake, memo]
}

export const useReduxState = (props) => {
    const username = useSelector(state => state.selectedAccount);
    const selectedGame = useSelector(state=>state.isNewOrOperatorOrCompetitor);
    const account = useSelector(state => accountSelector(username)(state)); 
    const currentGameVieId = useSelector(state=>state.currentGameVieId);  
    const game = useSelector(state=>gameSelector(currentGameVieId)(state));

    return [account,selectedGame,game];
}

export const useLiveData = (props) => {
    const username = useSelector(state => state.selectedAccount);
    // const selectedGame = useSelector(state=>state.isNewOrOperatorOrCompetitor);
    const dispatch = useDispatch();    
    const account = useSelector(state => accountSelector(username)(state));  
    const {state: { keyring, currentAccount }} = useSubstrate();
    const { keyringState,apiState, api} = useSubstrateState();
    const [liveData, setLiveData] = useState(false);

    const queryOperator = async () => {
        try {
            const nullVieId = "0x00000000000000000000000000000000";
            const vie_id = await api.query.vies.operators(currentAccount.address);
            if (vie_id != nullVieId)  {
                dispatch(setIsNewOrOperatorOrCompetitor(1));
                return true;
            }
              return false;
        }catch(err){
            alert(err);
        }
    }
    
    const queryCompetitor = async () => {
        const nullComp = {"staked": false, "submitted_winner": false, "vie_id": "0x00000000000000000000000000000000"};
        try {
            const result = await api.query.vies.competitors(currentAccount.address);
            if (result.vie_id != "0x00000000000000000000000000000000"){
                // console.log(result);
                dispatch(setIsNewOrOperatorOrCompetitor(2));
              }else {
                dispatch(setIsNewOrOperatorOrCompetitor(0));
              }
            return JSON.parse(result.toString());
        }catch(err){
            alert(err);
        }
    }

    const queryCompetitorNoDispatch = async () => {
        try {
            const result = await api.query.vies.competitors(currentAccount.address);
            return JSON.parse(result.toString());
        }catch(err){
            alert(err);
        }
    }

    const queryVie = async (competitor) => {
        try {
            const vie = await api.query.vies.vies(competitor.vie_id);
            return JSON.parse(vie.toString());
        }catch(err){
    
            alert(err);
        }
    }

    const queryAccountData = async () => {
        try {
            const accountData = await api.query.system.account(currentAccount.address);
            return JSON.parse(accountData.toString());
        }catch(err){
            // console.log("ERROR: ",err);
            alert(err);
        }
    }

    const queryWins = async () => {
        try {
            const wins = await api.query.nft.tokensByOwner.entries(currentAccount.address);
            return wins.map((t,i)=>{
                return t[0].toHuman();
            });
        }catch(err){
            alert(err);
        }
    }

    const queryCompetitors = async (competitors) => {
        try {
            // console.log(competitors)
            const promises = competitors.map(async (t)=>{
                const competitor = await api.query.vies.competitors(t);
                return competitor;
            });
            return Promise.all(promises).then(function(results) {
                return results;
            });    
        }catch(err){
            // console.log("ERROR: ",err);
            alert(err);
        }
    }

    const reload = async () => {
        let competitor;
        let vies;
        let competitors;
        const isOperator = await queryOperator();
        if (!isOperator) {
            competitor = await queryCompetitor();
          }else {
            competitor = await queryCompetitorNoDispatch();
          }
        const vie = await queryVie(competitor);
        const accountData = await queryAccountData();
        const winsData = await queryWins();
        const trophiesData = winsData.map((e)=>{
            return e[1];
        })

        console.log('isOperator: ',isOperator);
        console.log('competitor: ',competitor);
        console.log('vie: ',vie);
        console.log('accountData: ',accountData);
        console.log('winsData: ',winsData);
        console.log('trophiesData: ',trophiesData);
        dispatch(createUser(currentAccount.address,null,null))
        dispatch(putAccountData(currentAccount.address,accountData));
        dispatch(addAccountInfo(accountData,currentAccount.address));
        dispatch(selectAccount(currentAccount.address));
        //SET THE CURRENT VIE ID TO THE IMPORTED ID 
        dispatch(setCurrentGameVieId(competitor.vie_id));
        dispatch(importGame(competitor.vie_id,currentAccount.address,vie));
        dispatch(putGameData(currentAccount.address,vie));
        if (trophiesData.length != 0){
            dispatch(putTrophiesData(currentAccount.address,trophiesData));
        }

        dispatch(putCompetitorData(currentAccount.address,competitor));  
        dispatch(putCompetitorState(competitor))
        setLiveData(true);
    };


    useEffect(()=> {
        if (keyringState == 'READY' && apiState == 'READY' && currentAccount?.address !== null) {
            console.log('here');
            reload();  
        }else {
            
        }
        return () => {
          
        }
    },[currentAccount]);

    
    return [liveData];

}
