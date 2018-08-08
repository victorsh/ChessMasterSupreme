# ChessMasterSupreme
###### A spinoff of chess built with ERC721

## URL for Front-end
- http://54.67.58.16/

## Token Deployment
- Ropsten: 0xffe3993cec03e1b7af5ceb912ecf473b9d8bb2b6
  - https://ropsten.etherscan.io/tokens?q=0xffe3993cec03e1b7af5ceb912ecf473b9d8bb2b6

## Commands
- `ganache-cli --gasLimit 0xffffffffff -p 8545`
- `truffle compile && truffle migrate`

## Game Mechanics & ERC721
- Each piece has a unique set of abilities.
- Piece Unique Parameters:
  - (MD) Move Distance
  - (AP) Attack Power
  - (KD) Kill Direction
  - (CD) Cool Down
  - (T)  Type
- Parameter Logic:
  - (RR) Require Ratio: MD * AP * KD * CD = 1
    - Need to look into Translation to Token
  - Regardles off RR, AP = AP + X if Type advantage over opponent
- Piece Game Parameters:
  - Health
  - Moves Left Per Round
  - Board Position
  - Location of Piece in Game(Deck, Board, Hand)

# Tech Breakdown
#### WebGL(THREEJS/AFRAME)
  - Allows users to interact with ERC721 token through 3D objects
    - [x] [Click Pieces] Add RayCaster Functionality to pieces
    - [x] Add 3D object import functionality
      - Download 3D object from IPFS
#### IPFS(Dynamic Hash Table)
  - Allows free file storage over a decentralized network.
  - Store 3D objects on IPFS
  - Store entire front end on IPFS?
#### React-Native (not yet added)
  - This will allow cross-platform development between (iOS, Android, Web)
#### Token (ERC721)
  - Deploy ERC721 token with randomized strings
  - Add basic functionality to token such as
    - Game Mechanics

# Task List
- [x] Create a basic ERC721 Contract using OpenZeppelin-Solidity
  - Research Random() with solidity.
- [x] Use truffle to Compile and Migrate Contracts
- [ ] Setup truffle.js config using infura.io(or middleman.cx?)
  - More research on middleman.cx
- [x] Host a simple website using IPFS
- [x] Deploy Token Contract to Ganache Testnet
- [x] Deploy Token to Live Test-Net (Ropsten)
- [ ] Integrate IPFS with application to store 3D object data
- [ ] Associate unique contract variables with 3D objects from IPFS
- [ ] Integrate (Web3 || Middleman) to interact with Token using:
  - Contract ABI
  - Contract Address
- [ ] Use React/React-Native to integrate ThreeJS/Aframe with React

## Issues
#### THREEJS
- [X] Import 3D object
- [x] Raycaster only changing based on camera lookAt position
- [x] Raycaster mouse click position slightly wrong
- [ ] Set & Update UI 2D Mesh (green rectangle)
- [ ] Add text functionality
  - [ ] 2D
  - [ ] 3D
#### Token
- [ ] Random function in Token Contract
  - Giving error with *SHA3* implementation
  - Looking into *Keccak*
#### IPFS
- [ ] IPFS domain name

## Fixes
- Error when deploying contract: Gas amount was not enough
  - Possible Reason: This happens when the contract has abstract functions.
    - Make sure the contract has a constructor.

## Sources
- [ERC721-Tut-jun18](https://medium.com/coinmonks/a-simple-erc-721-example-c3f72b5aa19)
- [Complete ERC721 Game](https://github.com/PortalNetwork/nifty-game)
- [React + ThreeJS](https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0)
- [IPFS Hosting](https://medium.com/coinmonks/how-i-hosted-my-website-on-ipfs-431919d7440a)
- [IPFS EC2 Hosting](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-i-de48239d82e0)
- [3D Objects](https://free3d.com/)
- [Chess JSON Obj](https://bl.ocks.org/starcalibre/f0ce91448c076f2d43074dcef5bdfb16)

# Simple-IPFS
- https://gateway.ipfs.io/ipfs/QmaajvPKwpv1yDwh1BTxBf1JS7tjyFgA9FFwxoct5kfSHe

#### Commands IPFS
- `ipfs daemon`
- `ipfs add -r <folder to host>`
- `https://gateway.ipfs.io/ipfs/<address hash>`