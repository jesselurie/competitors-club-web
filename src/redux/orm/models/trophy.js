import { Model, attr, fk } from 'redux-orm';

export const ADD_TROPHY = 'ADD_TROPHY';
export const addTrophy = ({
    metadata,
    data,
    owner,
}, accountId) => {
    return {
        type: ADD_TROPHY,
        payload: {
            metadata,
            data,
            owner,
            accountId,
        }
    }
}
////////////////////////////////
class Trophy extends Model {
    static reducer(action, Trophy, session) {
        const { payload, type } = action;
        switch (type) {
            case ADD_TROPHY:
                const {
                    metadata,
                    data,
                    owner,
                    accountId,
                } = payload;
                const {trophy} = data;
                // console.log("TROPHY: ", payload);
                // { "accountId": "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe", "data": { "competitors": ["1jmaCbBXotRKbd9kyHKwRGbXofpjkY5k2byfbsxjkwom7tM", "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe"], "memo": "0x525043", "podium": [[Object]], "stake": 2000000000000, "time": 1643392440008, "trophy": "0x7f6a5252e29630e5c3208d4130c6d6c3" }, "metadata": "0x", "owner": "16kbGUmwe6xmxrZGg1i5me3RPHkZtbyRCkkgUNVS1pczzTJe" }
                Trophy.upsert({
                    trophy,
                    metadata,
                    data,
                    owner,
                    accountId,
                } );
                // console.log("CREATED TROPHY");
                break;
        }
    }
};

// "Trophy": {
//     "trophy": "[u8; 16]",
//     "competitors": "Vec<AccountId>",
//     "stake": "Balance",
//     "memo": "Vec<u8>",
//     "time": "u64",
//     "podium": "Vec<StandingReq<AccountId>>"
//   },
Trophy.modelName = 'Trophy';
Trophy.options = {
    idAttribute: 'trophy',
};

Trophy.fields = {
    id: attr(),
    trophy: attr(),
    data: attr(),
    metadata: attr(),
    owner: attr(),
    accountId: fk('Account', 'trophies'),
};

export default Trophy;

