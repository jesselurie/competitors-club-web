const txState = {
    transactions: [
      {
        to: 'AngryBird',
        from:'NinjaTurtle',
        tx: '123456890',
        amount: 39.6,
        timestamp: '26 May',
      },
      {
        to: 'NinjaTurtle',
        from:'AngryBird',
        tx: '1234579900',
        amount: 40,
        timestamp: '25 May',
      },
      {
        to: 'NinjaTurtle',
        from:'AngryBird',
        tx: '1234579900',
        amount: 41,
        timestamp: '25 May',
      }
    ],
  };
  export const txReducer = (state = txState, action) => {
    switch (action.type) {
      default:
        return state;
    }
    return state;
  };
  