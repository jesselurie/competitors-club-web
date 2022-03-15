- History (Query) 
Trophies -> [Trophy]
Games -> [Game]

-Create (Post)
NewGame -> Game

-Join (Query, Post)
ViewGAme -> Game 

-Play as Operator (Query,Post)
Wait -> Game 
FinishGame -> Game 

-Play as Competitor (Query)
Wait -> Game 

- Transation (Post, Query)


Create/load account 
Query game (in game as competitor or operator)
- Create game 
Query games
Query trophies 
Query transactions 
- Create transaction

persist state of games,trophies and transactions 
rehydrate state when online 
