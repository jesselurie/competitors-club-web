const trophyState = {
  trophy: {
    trophyId: 'SOME HASH ID UNIQUE nft 0x231312asdfasfas12312312',
    memo: 'Poker Tournament',
    stake: 10,
    podium:[
      {place:1, payout:30},
      {place:2, payout:10},
      {place:3, payout:5},
    ],
    players: [
      "ACDGSSDFSDF",
      "ACCOPUNT_ID_2",
      "ACCOPUNT_ID_3",
      "ACCOPUNT_ID_4",
    ],
    totalStake: 40, 
    finalPodium: {
      1:  "ACDGSSDFSDF",
      2: "ACCOPUNT_ID_2",
      3: "ACCOPUNT_ID_3",
    },
    timestamp: 123123412231,
  },
    history: [
      {
        trophyId: 'SOME HASH ID UNIQUE nft 0x231312asdfasfas12312312',
        memo: 'Chess Tournament',
        stake: 10,
        players: [
          "ACDGSSDFSDF",
          "ACCOPUNT_ID_2",
          "ACCOPUNT_ID_3",
          "ACCOPUNT_ID_4",
        ],
        totalStake: 40, 
        finalPodium: {
          1:  "ACDGSSDFSDF",
          2: "ACCOPUNT_ID_2",
          3: "ACCOPUNT_ID_3",
        },
        timestamp: 123123412231,
      }
    ],
  };
  export const trophyReducer = (state = trophyState, action) => {
    switch (action.type) {
      default:
        return state;
    }
    return state;
  };
  