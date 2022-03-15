import { ORM, Model, many, fk,attr } from 'redux-orm';

export const CREATE_USER = 'CREATE_USER';
export const createUser = (username,wallet,pin) => {
    return {
        type: CREATE_USER,
        payload: {
            username,
            wallet,
            pin
        },
    };
};


export const IMPORT_USER = 'IMPORT_USER';
export const importUser = (username,wallet,pin) => {
    return {
        type: IMPORT_USER,
        payload: {
            username,
            wallet,
            pin
        },
    };
};
// export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
// export const createAccount = username => {
//     return {
//         type: CREATE_ACCOUNT,
//         payload: username,
//     };
// };

export const CREATE_WALLET = 'CREATE_WALLET';
export const createWallet = (username, wallet) => {
    return {
        type: CREATE_WALLET,
        payload: {
            username,
            wallet,
        },
    };
};

export const RECOVER_WALLET = 'RECOVER_WALLET';
export const recoverWallet = (username, wallet) => {
    return {
        type: RECOVER_WALLET,
        payload: {
            username,
            wallet,
        },
    };
};

export const CREATE_PIN = 'CREATE_PIN';
export const createPin = (username,pin) => {
    return {
        type: CREATE_PIN,
        payload: {
            username,
            pin
        }
    };
};


export const PUT_ACCOUNT_DATA = 'PUT_ACCOUNT_DATA';
export const putAccountData = (username,data) => {
    return {
        type: PUT_ACCOUNT_DATA,
        payload: {
           username,
           data
        }
    };
};


export const PUT_GAME_DATA = 'PUT_GAME_DATA';
export const putGameData = (username,data) => {
    return {
        type: PUT_GAME_DATA,
        payload: {
           username,
           data
        }
    };
};


export const PUT_IS_OPERATOR = 'PUT_IS_OPERATOR';
export const putIsOperator = (username,data) => {
    return {
        type: PUT_IS_OPERATOR,
        payload: {
           username,
           data
        }
    };
};


export const PUT_TROPHIES_DATA = 'PUT_TROPHIES_DATA';
export const putTrophiesData = (username,data) => {
    return {
        type: PUT_TROPHIES_DATA,
        payload: {
           username,
           data
        }
    };
};


export const PUT_TROPHY_DATA = 'PUT_TROPHY_DATA';
export const putTrophyData = (username,data) => {
    return {
        type: PUT_TROPHY_DATA,
        payload: {
           username,
           data
        }
    };
};



export const PUT_COMPETITOR_DATA = 'PUT_COMPETITOR_DATA';
export const putCompetitorData = (username,data) => {
    return {
        type: PUT_COMPETITOR_DATA,
        payload: {
           username,
           data
        }
    };
};



export class Account extends Model {
    static reducer(action,Account,session){
        const { payload, type } = action;
        switch(type){
            case CREATE_WALLET: {
                const {username, wallet} = payload;
                Account.withId(username).set("wallet",wallet);
                break;
            }
            case RECOVER_WALLET: {
                const {username, wallet} = payload;
                Account.withId(username).set("wallet",wallet);
                break;
            }
            case CREATE_PIN: {
                const {username,pin} = payload;
                Account.withId(username).set("pin",pin);
                break;
            }
            case IMPORT_USER: {
                const {username,wallet,pin} = payload;
                const vieId = "0x00000000000000000000000000000000";
                Account.upsert({
                    username:username,
                    wallet: wallet,
                    pin: pin,
                    competitorData:{"staked": false, "submitted_winner": false, "vie_id": "0x00000000000000000000000000000000"},
                    gameData: {"competitors": [], "date": 0, "memo": "0x", "operator": "111111111111111111111111111111111HC1", "podium": [], "stake": 0},
                    // accountData: {"consumers": 1, "data": {"feeFrozen": 0, "free": "0x00000000000000000000000000000000", "miscFrozen": "0x00000000000000000000000000000000", "reserved": 0}, "nonce": 0, "providers": 1},
                });
                
                // const ai = session.AccountInfo.upsert({
                //     consumers: 1,
                //     data: {
                //       feeFrozen: 0,
                //       free: "0x00000000000000000000000000000000",
                //       miscFrozen: "0x00000000000000000000000000000000",
                //       reserved: 0
                //     },
                //     nonce: 0,
                //     providers: 1,
                //     accountId:username,
                //   });

                //   const ci = session.CompetitorInfo.upsert({
                //     vieId,
                //     staked: false,
                //     submitted_winner: false,
                //     accountId:username,
                //   });
                
                //   const g = session.Game.upsert({
                //     vieId,
                //     operator:null,
                //     stake:1,
                //     date:null,
                //     memo:null,
                //     accountId:username,
                //   });
                  
                //   !session.Place.exists({
                //     vieId:"0x00000000000000000000000000000000",
                //     spot:1,
                //     payout:2,
                //     }) && session.Place.create({
                //     spot:1,
                //     payout:2,
                //     vieId:"0x00000000000000000000000000000000",
                //   });
                //   !session.Competitor.exists({
                //     vieId,  
                //     accountId: "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe",
                //     })&&session.Competitor.create({
                //     accountId: "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe",
                //     staked: false,
                //     submittedWinner:false,
                //     vieId,  
                //   });
                //   const ts = session.Trophies.create({
                //     classId: null,
                //     tokenId: null,
                //     accountId:username,
                //   });
                //   const t = session.Trophy.create({
                //     data: null,
                //     metadata:null,
                //     owner: null,
                //     accountId:username,
                //   });
                break;
            }
            case CREATE_USER: {
                const {username,wallet,pin} = payload;
                const vieId ="0x00000000000000000000000000000000";
                Account.create({
                    username:username,
                    wallet: wallet,
                    pin: pin,
                    competitorData:{"staked": false, "submitted_winner": false, "vie_id": "0x00000000000000000000000000000000"},
                    gameData: {"competitors": [], "date": 0, "memo": "0x", "operator": "111111111111111111111111111111111HC1", "podium": [], "stake": 0},
                    // accountData: {"consumers": 1, "data": {"feeFrozen": 0, "free": "0x00000000000000000000000000000000", "miscFrozen": "0x00000000000000000000000000000000", "reserved": 0}, "nonce": 0, "providers": 1},
                });
                // const ai = session.AccountInfo.upsert({
                //     consumers: 1,
                //     data: {
                //       feeFrozen: 0,
                //       free: "0x00000000000000000000000000000000",
                //       miscFrozen: "0x00000000000000000000000000000000",
                //       reserved: 0
                //     },
                //     nonce: 0,
                //     providers: 1,
                //     accountId:username,
                //   });
                //   const ci = session.CompetitorInfo.create({
                //     staked: false,
                //     submitted_winner: false,
                //     vieId,
                //     accountId:username,
                //   });
                //   const ts = session.Trophies.create({
                //     classId: null,
                //     tokenId: null,
                //     accountId:username,
                //   });
                //   const t = session.Trophy.create({
                //     data: null,
                //     metadata:null,
                //     owner: null,
                //     accountId:username,
                //   });
                //   const v = session.Vie.create({
                //     vieId:"0x00000000000000000000000000000000",
                //     operator:null,
                //     stake:null,
                //     podium:null,
                //     date:null,
                //     competitors:null,
                //     memo:"Rock Paper Scissors",
                //     accountId:username,
                //   });
                //   const g = session.Game.create({
                //     vieId,
                //     operator:null,
                //     stake:1,
                //     date:null,
                //     memo:"Rock Paper Scissors",
                //     accountId:username,
                //   });
                //   const p = session.Place.create({
                //     vieId,
                //     spot:1,
                //     payout:2,
                //   });
                //   const cc = session.Competitor.create({
                //     accountId: "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe",
                //     staked: false,
                //     submittedWinner:false,
                //     vieId,
                //   });
                break;
            }
            case PUT_ACCOUNT_DATA: {
                const {username,data} = payload;
                Account.withId(username).set("accountData",data);
                break;
            }
            case PUT_GAME_DATA: {
                const {username,data} = payload;
                Account.withId(username).set("gameData",data);
                break;
            }

            case PUT_TROPHIES_DATA: {
                const {username,data} = payload;
                Account.withId(username).set("trophiesData",data);
                break;
            }

            case PUT_TROPHY_DATA: {
                const {username,data} = payload;
                Account.withId(username).set("trophyData",data);
                break;
            }

            case PUT_COMPETITOR_DATA: {
                const {username,data} = payload;
                Account.withId(username).set("competitorData",data);
                break;
            }
            // case PUT_IS_OPERATOR: {
            //     const {username,data} = payload;
            //     Account.withId(username).set("isOperator",data);
            //     break;
            // }
        }
    }
};

Account.modelName = 'Account';
Account.options = {
    idAttribute: 'username',
};

Account.fields = {
    id: attr(),
    wallet: attr(),
    username: attr(),
    pin: attr(),
    // accountData: attr(),
    gameData: attr(),
    trophiesData: attr(),
    trophyData: attr(),
    competitorData: attr(),
    currentGameId: attr(),   
    currentVieId: attr(),    
};

export default Account;
