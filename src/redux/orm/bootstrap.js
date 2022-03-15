// bootstrap.js
export default function bootstrap(schema) {
    // Get the empty state according to our schema.
    const state = schema.getEmptyState();

//     // Begin a mutating session with that state.
//     // `state` will be mutated.
    const session = schema.mutableSession(state);

//     // Model classes are available as properties of the
//     // Session instance.
    const { Onboarding, Game,Account,Competitor } = session;
    const onboardingState = Onboarding.create({
        id: 0,
        agreePrivacy: false, 
        agreeTerms: false,
    });
    //Create game that is the default for creating 
    // const game = Game.create({
    //     id: 0,
    //     vieId:"0x00000000000000000000000000000000",
    //     // players: [],
    //     // places: [],
    //     // podium: [],
    // });
    //Create game that is the default for finishing  
    //  // Start by creating entities whose props are not dependent
    //     // on others.
    // subscribeToVie {"competitors": [], "date": 0, "memo": "0x", "operator": "111111111111111111111111111111111HC1", "podium": [], "stake": 0}
    // subscribeToAccount {"consumers": 1, "data": {"feeFrozen": 0, "free": "0x000000000000043c33ae3226c79c3df8", "miscFrozen": "0x000000000000043322c29aaf5cc18bb4", "reserved": 0}, "nonce": 125, "providers": 1}
    // subscribeToCompetitor  {"staked": true, "submitted_winner": false, "vie_id": "0x61bb141376a39369fbd8c5499bdc14dd"}
    // const account = Account.create({
    //     id: 0, // optional. If omitted, Redux-ORM uses a number sequence starting from 0.
    //     mnemonic: 'hello world there are lots of great things waiting',
    //     username: "ninjaTurtle",
    //     pin: 1234,
    //     currentGameId: 0,
    //     // games: [game1,game2,game3]
    // });
    // const account2 = Account.create({
    //     id: 1, // optional.
    //     mnemonic: 'anoher greate way to use this app with mulitple accounts',
    //     username: "pikachu",
    //     pin: 1234,
    // });
    // const account3 = Account.create({
    //     id: 2, // optional.
    //     mnemonic: 'anoher greate way to use this app with mulitple accounts',
    //     username: "pikachu",
    //     pin: 1234,
    // });

    // Todo's for `user`
    // const game1 =  Game.create({
    //     id: 0,
    //     account,
    //     memo: 'poker tournament',
    //     stake: 10,
    //     timestamp: 1231231231,
    //     operator: 'account-1',
    //     // competitors: [account],
    // });
    // const game2 = Game.create({
    //     id: 1,
    //     account,
    //     memo: 'poker tournament 1',
    //     stake: 10,
    //     timestamp: 1231231231,
    //     operator: 'account-1',
    //     competitors: [account],
    
    // });
    // const game3 = Game.create({
    //     id: 2,
    //     account,
    //     memo: 'poker tournament 2',
    //     stake: 10,
    //     timestamp: 1231231231,
    //     operator: 'account-1',
    // });

    
    // const competitor1 = Competitor.create({
    //     id: 0,
    //     accountId: 'abc',
    //     gameId: 0,
    // });
    // const competitor2 = Competitor.create({
    //     id: 1,
    //     accountId: 'abc',
    //     gameId: 0,
    // });

    //Pass in the id for the foreign key
    // const g1 = Game.withId(0);
    // console.log("G!: ",g1.competitors.toModelArray());
    // const competitors = Competitor.all().toModelArray();
    // console.log("COMPETITORS: ",competitors);
    // Players to start with.
    // const player1 = Player.create({ game:game1, id: 0, accountId: 'player-1' });
    // const player2 = Player.create({ game:game1,id: 1, accountId: 'player-2' });
    // const player3= Player.create({ game:game1, id: 2, accountId: 'player-3' });
    // const player4 = Player.create({ game:game1, id: 3, accountId: 'player-4' });
    
    // const place1 = Place.create({game:game1, id: 0, payout: 100, place:1 });
    // const place2 = Place.create({game:game1,id: 1,  payout: 80, place:2 });
    // const place3= Place.create({ game:game1, id: 2, payout: 20, place:3 });

    // game1.set("places", [place1,place2,place3]);
    // game1.set("players", [player1,player2,player3,player4]);

    // Account.withId(0).games.add(game1);
    // Account.withId(0).games.add(game2);
    // Account.withId(0).games.add(game3);
    // Return the whole Redux initial state.
    
    return {
        orm: state,
    };
}

