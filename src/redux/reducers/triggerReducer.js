
export const TRIGGER = "TRIGGER";
export const trigger = () => {
    return {
        type: TRIGGER,
        payload: {},
    };
};

export function triggerReducer(state={trigger:false}, action) {
  const { type, payload } = action;
  switch (type) {
  case TRIGGER:
    state.trigger = !state.trigger;    
    return state;
  default:
      return state;
  }
}
