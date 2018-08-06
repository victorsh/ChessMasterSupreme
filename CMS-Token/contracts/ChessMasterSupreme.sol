pragma solidity ^0.4.24;

import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract ChessMasterSupreme is ERC721Token, Ownable {
  string public constant name = "ChessMasterSupreme";
  string public constant symbol = "CMS";

  struct Pawn{
    string abilities;
  }

  Pawn[] public pawns;

  constructor(string _name, string _symbol) public ERC721Token(_name, _symbol){
  }

  function mintUniqueTokenTo(
    address _to,
    uint256 _tokenId,
    string _tokenURI
  ) public {
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _tokenURI);
  }

  function getPawn(uint _pawnId ) public view returns(string abilities){
    Pawn memory _pawn = pawns[_pawnId];

    abilities = _pawn.abilities;
  }
}