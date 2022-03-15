
export const AGREE_TERMS = "AGREE_TERMS";
export const agreeTerms = () => {
    return {
        type: AGREE_TERMS,
        payload: {},
    };
};

export const AGREE_PRIVACY = "AGREE_PRIVACY";
export const agreePrivacy = () => {
    return {
        type: AGREE_PRIVACY,
        payload: {},
    };
};


export function onboardingReducer(state = {agreeTerms: false, agreePrivacy: false}, action) {
    const { type, payload } = action;
    switch (type) {
    case AGREE_TERMS:
        state.agreeTerms = true;
        return state;
    case AGREE_PRIVACY: 
        state.agreePrivacy = true;
        return state;
    default:
        return state;
    }
}
