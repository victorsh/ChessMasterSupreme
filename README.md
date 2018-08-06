# ChessMasterSupreme
###### A spinoff of chess built with ERC721

## URL for Front-end
- http://54.67.58.16/

## Token Deployment
- Ropsten: 0xffe3993cec03e1b7af5ceb912ecf473b9d8bb2b6
  - https://ropsten.etherscan.io/tokens?q=0xffe3993cec03e1b7af5ceb912ecf473b9d8bb2b6

## Game Mechanics
- Each peice has a unique set of abilities

## ERC721 & Pawns
- Piece Unique Parameters:
  - (MD) Move Distance
  - (AP) Attack Power
  - (KD) Kill Direction
  - (CD) Cool Down
  - (T)  Type

- Parameter Logic
  - (RR) Require Ratio: MD * AP * KD * CD = 1
    - * Need to look into Translation to Token
  - Regardles off RR, AP = AP + X if Type advantage over opponent
- Piece Game Parameters:
  - Health
  - Moves Left Per Round
  - Board Position
  - Location of Piece in Game(Deck, Board, Hand)

## Prototyping Goal
- Use the most up-to-date verions of api's/libraries/frameworks

## Todo
- !!! Fix vulnerabilties
- (Ropsten)Deploy Token to Test-Net
  - Look into parameter( totalSupply, decimal)
- Create game logic which incorporates ERC721
- Integrate token functionality with ThreeJS

## Completed Todo
- CMS-Token: 0 Vulnerabilties
- First deployment to testnet successful

## Fixes
- Error when deploying contract: Gas amount was not enough
  - Possible Reason: This happens when the contract has abstract functions.
    - Make sure the contract has a constructor.

## Sources
- [ERC721-Tut-jun18](https://medium.com/coinmonks/a-simple-erc-721-example-c3f72b5aa19)
