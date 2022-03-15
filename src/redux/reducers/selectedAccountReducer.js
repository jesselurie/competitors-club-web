
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const selectAccount = id => {
    return {
        type: SELECT_ACCOUNT,
        payload: id,
    };
};

export function selectedAccountReducer(state = null, action) {
  const { type, payload } = action;
  switch (type) {
  case SELECT_ACCOUNT:
      return payload;
  default:
      return state;
  }
}
