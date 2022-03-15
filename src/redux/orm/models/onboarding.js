import { ORM, Model, many, fk,attr } from 'redux-orm';


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

export class Onboarding extends Model {
    static reducer(action,Onboarding,session){
        const { payload, type } = action;
        switch(type){
            case AGREE_TERMS: {
                //check if account already exists with username
                Onboarding.withId(0).set("agreeTerms",true);
                break;
            }
            case AGREE_PRIVACY: {   
                Onboarding.withId(0).set("agreePrivacy",true);
                break;
            }
        }
    }
};

Onboarding.modelName = 'Onboarding';

Onboarding.fields = {
   id: attr(),
   agreeTerms: attr(),
   agreePrivacy: attr(),
};
////////////////////////////////

export default Onboarding;
