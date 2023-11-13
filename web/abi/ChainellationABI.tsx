export const ChainellationABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function currentSupply() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function mintCost() view returns (uint256)",
  "function systemTime() public view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string memory)",
  "function generateSVG(uint256 tokenId,uint256 gazed,uint8 cloudsAt,bool sunUp) view returns (string memory)",
  "function daysSinceLastGust(uint256 tokenId) view returns (uint256)",
  "function systemTimeOffsetWithUser(uint256 tokenId) public view returns (uint256)",
  // Write Functions
  "function mint(uint32 tzOffset) payable",
  "function starGaze(uint256 tokenId)",
  "function gust(uint256 tokenId)",
  // Events
  "event Transfer(address indexed from, address indexed to, address value)",
];
