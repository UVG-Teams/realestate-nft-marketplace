# Solidity API

## Base64

Provides a function for encoding some bytes in base64

### TABLE

```solidity
string TABLE
```

### encode

```solidity
function encode(bytes data) internal pure returns (string)
```

## Vesta

Provides the necessary functions to generate an NFT with metadata / Proporciona las funciones necesarias para generar un NFT con metadata

### _tokenIdCounter

```solidity
struct Counters.Counter _tokenIdCounter
```

### constructor

```solidity
constructor() public
```

### mint

```solidity
function mint() public returns (uint256)
```

### boolToString

```solidity
function boolToString(bool _b) public pure returns (string)
```

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

_See {IERC721Metadata-tokenURI}._

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

## VestaDNA

### House

```solidity
struct House {
  string image;
  string typology;
  uint256 yearBuilt;
  uint256 sqm;
  uint256 rooms;
  uint256 bathrooms;
  uint256 levels;
  uint256 parkings;
  bool yard;
  bool pool;
  string location;
}
```

### registered_house

```solidity
struct VestaDNA.House[] registered_house
```

### set_house_detail

```solidity
function set_house_detail(string image, string typology, uint256 yearBuilt, uint256 sqm, uint256 rooms, uint256 bathrooms, uint256 levels, uint256 parkings, bool yard, bool pool, string location) public
```

### get_house

```solidity
function get_house(uint256 i) public view returns (string, string, uint256, uint256, uint256, uint256, uint256, uint256, bool, bool, string)
```

