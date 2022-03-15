import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {putAccountData,putGameData,putTrophiesData,putCompetitorData} from '../redux/orm/models/account';
import {setIsNewOrOperatorOrCompetitor} from '../redux/reducers/isNewOrOperatorOrCompetitorReducer';
import { accountSelector} from '../redux/orm/selectors';
import { addAccountInfo } from '../redux/orm/models';
import { useSubstrate, useSubstrateState } from '../substrate-lib';
import {importGame} from '../redux/orm/models';
import {setCurrentGameVieId} from '../redux/reducers/currentGameVieIdReducer';


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

export const useLiveData = (props) => {
    const username = useSelector(state => state.selectedAccount);
    const selectedGame = useSelector(state=>state.isNewOrOperatorOrCompetitor);
    const dispatch = useDispatch();    
    const account = useSelector(state => accountSelector(username)(state));  
    const {state: { keyring, currentAccount }} = useSubstrate();
    const { keyringState,apiState, api} = useSubstrateState();
    const [liveData, setLiveData] =useState(false);

    const queryOperator = async () => {
        try {
            const nullVieId = "0x00000000000000000000000000000000";
            const vie_id = await api.query.vies.operators(account.username);
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
            const result = await api.query.vies.competitors(account.username);
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
            const result = await api.query.vies.competitors(account.username);
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
            const accountData = await api.query.system.account(account.username);
            return JSON.parse(accountData.toString());
        }catch(err){
            // console.log("ERROR: ",err);
            alert(err);
        }
    }

    const queryWins = async () => {
        try {
            const wins = await api.query.nft.tokensByOwner.entries(account.username);
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
        

        if (trophiesData.length != 0){
            dispatch(putTrophiesData(account.username,trophiesData));
        }
      
        dispatch(putCompetitorData(account.username,competitor));  
        dispatch(putGameData(account.username,vie));
        dispatch(importGame(competitor.vie_id,account.username,vie));
        //SET THE CURRENT VIE ID TO THE IMPORTED ID 
        dispatch(setCurrentGameVieId(competitor.vie_id));
        // dispatch(putAccountData(account.username,accountData));
        dispatch(addAccountInfo(accountData,account.username));
        setLiveData(true);
    };


    useEffect(()=> {
        // console.log(account.gameData)
        if (keyringState == 'READY' && apiState == 'READY') {
            console.log('here');
            reload();  
        }else {
            // alert('Pull to refresh.')
        }
        return () => {
          
        }
    },[currentAccount]);

    
    return [liveData];

}
