// actions.js
import {
    CREATE_ACCOUNT,
    SELECT_ACCOUNT,
    CREATE_GAME,
    DELETE_GAME,
    ADD_PLAYER_TO_GAME,
    REMOVE_PLAYER_FROM_GAME,
    ADD_MNEMONIC_TO_ACCOUNT,
} from './actionTypes';

export const addMnemonicToAccount = (account, mnemonic) => {
    return {
        type: ADD_MNEMONIC_TO_ACCOUNT,
        payload: {
            account,
            mnemonic,
        },
    };
};

export const createMnemonic = (account, mnemonic) => {
    return {
        type: ADD_MNEMONIC_TO_ACCOUNT,
        payload: {
            account,
            mnemonic,
        },
    };
};


// export const createAccount = username => {
//     return {
//         type: CREATE_ACCOUNT,
//         payload: username,
//     };
// };

export const selectAccount = id => {
    return {
        type: SELECT_ACCOUNT,
        payload: id,
    };
};

export const createGame = props => {
    return {
        type: CREATE_GAME,
        payload: props,
    };
};

export const deleteGame = id => {
    return {
        type: DELETE_GAME,
        payload: id,
    };
};

export const addPlayerToGame = (game, player) => {
    return {
        type: ADD_PLAYER_TO_GAME,
        payload: {
            game,
            player,
        },
    };
};

export const removePlayerFromGame = (game, player) => {
    return {
        type: REMOVE_PLAYER_FROM_GAME,
        payload: {
            game,
            player,
        },
    };
};