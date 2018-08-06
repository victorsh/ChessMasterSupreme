pragma solidity ^0.4.24;

import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract ChessMasterSupreme is ERC721Token, Ownable {
  string public constant name = "ChessMasterSupreme";
  string public constant symbol = "CMS";
  
  constructor(string _name, string _symbol) public ERC721Token(_name, _symbol){
  }

  //Connect to IPFS
  string ipfsHash;
  function sendHash(string x) public {
    ipfsHash = x;
  }

  function getHash() public view returns (string x) {
    return ipfsHash;
  }

  //Chess Piece Functionality
  struct Pawn{
    string abilities;
  }

  //String of All Tokens
  Pawn[] public pawns;

  //Create a new Token
  function mintUniqueTokenTo(address _to, uint256 _tokenId, string _tokenURI) public {
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _tokenURI);
  }

  //Get a token by its ID
  function getPawn(uint _pawnId ) public view returns(string abilities){
    Pawn memory _pawn = pawns[_pawnId];

    abilities = _pawn.abilities;
  }
}