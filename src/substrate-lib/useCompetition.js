import React, {useEffect, useState} from 'react';
import { useSubstrate, useSubstrateState } from './index';


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
// Implement competition as a Hook. 
export const  useCompetition = (props) => {
    const { keyringState,apiState, api } = useSubstrateState();
    const {  apiError ,state: { keyring, currentAccount }} = useSubstrate();
    const [competitor, setCompetitor] = useState(null);
    const [vie, setVie] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const [wins, setWins] = useState(null);
    const [isOperator, setIsOperator] = useState(null);
    

    const queryOperator = async () => {
        try {
            const nullVieId = "0x00000000000000000000000000000000";
            const response = await api.query.vies.operators(currentAccount.address);
            if (response != nullVieId)  {
                // setIsOperator(true);
                // dispatch(setIsNewOrOperatorOrCompetitor(1));
                return true;
            }else {
                // setIsOperator(false);
            }
              return false;
        }catch(err){
            console.log("ERROR: ",err);
            
        }
    }
    
    const queryCompetitor = async () => {
        const nullComp = {"staked": false, "submitted_winner": false, "vie_id": "0x00000000000000000000000000000000"};
        try {
            const response = await api.query.vies.competitors(currentAccount.address);
            // if (result.vie_id != "0x00000000000000000000000000000000"){
            //     // console.log(result);
            //     dispatch(setIsNewOrOperatorOrCompetitor(2));
            //   }else {
            //     dispatch(setIsNewOrOperatorOrCompetitor(0));
            //   }
            // const result = JSON.parse(response.toString());
            // console.log("RESPONSE",result);
            // setCompetitor(result);
            return  JSON.parse(response.toString());
        }catch(err){
            console.log("ERROR: ",err);
        }
    }

    const queryVie = async (competitorVieId) => {
        try {
            const response = await api.query.vies.vies(competitorVieId);
            return JSON.parse(response.toString());
        }catch(err){
            console.log("ERROR: ",err);
        }
    }

    const queryAccountData = async () => {
        try {
            const response = await api.query.system.account(currentAccount.address);
            return JSON.parse(response.toString());
        }catch(err){
            console.log("ERROR: ",err);
        }
    }

    const queryWins = async () => {
        try {
            const response = await api.query.nft.tokensByOwner.entries(currentAccount.address);
            const winsMap = response.map((t,i)=>{
                return t[0].toHuman();
            });
            const t = winsMap.map((e)=>{
                return e[1];
            });
            return t;
        }catch(err){
            alert(err);
        }
    }

    // const queryCompetitors = async (competitors) => {
    //     try {
    //         // console.log(competitors)
    //         const promises = competitors.map(async (t)=>{
    //             const competitor = await api.query.vies.competitors(t);
    //             return competitor;
    //         });
    //         return Promise.all(promises).then(function(results) {
    //             return results;
    //         });    
    //     }catch(err){
    //         // console.log("ERROR: ",err);
    //         alert(err);
    //     }
    // }


    useEffect(async ()=>  {
        const req = async () => {
            const queryOperatorResp = await queryOperator();
            // console.log("isOperator",isOperator);
            const queryCompetitorResp = await queryCompetitor();
            // console.log("competitor",competitor);
            const queryVieResp = await queryVie(queryCompetitorResp.vie_id);
            // console.log("vie",viee);
            const queryAccountDataResp = await queryAccountData();
            // console.log("accountData",accountData);
            const queryWinsResp = await queryWins();
            // const t = winsDataa.map((e)=>{
            //     return e[1];
            // });
            // console.log("winsData",winsDataa);
            // console.log(isOperator,competitor,vie,accountData,winsData,t);
            return [
                queryOperatorResp,
                queryCompetitorResp,
                queryAccountDataResp,
                queryWinsResp,
                queryVieResp,
            ]
        }
        if (keyringState == 'READY' && apiState == 'READY') {
           const [queryOperatorResp,
            queryCompetitorResp,
            queryAccountDataResp,
            queryWinsResp,
            queryVieResp]  = await req();
            setAccountData(queryAccountDataResp);
            setCompetitor(queryCompetitorResp);
            setWins(queryWinsResp);
            setIsOperator(queryOperatorResp);
            setVie(queryVieResp);
        }

        // return () => {
          
        // }
    },[]);

    return [competitor,vie,wins,accountData,isOperator];

}
