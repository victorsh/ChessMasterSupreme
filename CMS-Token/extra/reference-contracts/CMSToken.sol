pragma solidity ^0.4.24;

import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract CMSToken is ERC721Token, Ownable {
  mapping (uint256 => address) internal tokenOwner;
  uint constant minPrice = 0.01 ether;

  string[] public images;
  string[] public backgrounds;
  string[] public descriptions;
  uint[] public numbers;

  struct Piece {
    uint number;
    string image;
    string background;
    string description;
  }

  uint nonce = 0;
  Piece[] public pieces;

  mapping(uint256 => Piece) public tokenProperty;

  constructor(string _name, string _symbol) public ERC721Token(_name, _symbol)
  {}

  function initImage(string _image) public onlyOwner {
    images.push(_image);
  }

  function initBackground(string _background) public onlyOwner {
    backgrounds.push(_background);
  }

  function initNumberAndDescription(uint _number, string _description) public onlyOwner {
    numbers.push(_number);
    descriptions.push(_description);
  }

  /* ONLY OWNER CAN MINT */
  function mint() public payable {
    require(numbers.length > 0, "Ensure atleast 1 element");
    require(images.length > 0, "Ensure atleast 1 element");
    require(backgrounds.length > 0, "Ensure atleast 1 element");
    require(descriptions.length > 0, "Ensure atleast 1 element");
    require(msg.value >= minPrice, "Value of message must be >= minimum price");
    require(owner.send(msg.value), "Message sender must be owner");

    uint256 _tokenId = totalSupply();
    tokenOwner[_tokenId] = msg.sender;
    uint num = rand(0, numbers.length);
    uint _number = numbers[num];

    string memory _image = images[rand(0, images.length)];
    string memory _background = backgrounds[rand(0, backgrounds.length)];
    string memory _description = descriptions[num];

    pieces.push(Piece({number: _number, image: _image, background: _background, description: _description}));
    tokenProperty[_tokenId] = Piece({number: _number, image: _image, background: _background, description: _description});
    super._mint(msg.sender, _tokenId);
  }

  function burn(uint256 _tokenId) public onlyOwner {
    tokenOwner[_tokenId] = address(0);
    super._burn(ownerOf(_tokenId), _tokenId);
  }

  function getOwnedTokens(address _owner) external view returns (uint256[]) {
    return ownedTokens[_owner];
  }

  function getTokenProperty(uint256 _tokenId) external view returns (uint _number, string _image, string _background, string _description) {
    return (
      tokenProperty[_tokenId].number, 
      tokenProperty[_tokenId].image, 
      tokenProperty[_tokenId].background, 
      tokenProperty[_tokenId].description
    );
  }

  function rand(uint min, uint max) private returns (uint){
    nonce++;
    return uint(sha3(nonce))%(min+max)-min;
  }

  function getPiecesLength() external view returns (uint) {
    return pieces.length;
  }

  function withdraw(uint amount) public payable onlyOwner returns(bool) {
    require(
      amount <= address(this).balance, 
      "Withdrawl must be <= contract Balance"
    );

    owner.transfer(amount);
    return true;
  }
}