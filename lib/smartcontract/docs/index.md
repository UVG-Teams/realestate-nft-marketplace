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

Provides the necessary functions to generate an NFT with metadata

_Inherits ERC721, ERC721Enumerable from OpenZeppelin and VestaDNA.sol_

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

Function in charge of creating a new token, new tokenId

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | unique token identification |

### boolToString

```solidity
function boolToString(bool _b) public pure returns (string)
```

Convierte un bool a string

_Inherits ERC721, ERC721Enumerable from OpenZeppelin and VestaDNA.sol_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _b | bool | booleano |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | Yes or No |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

Returns a url in standard Data URL with the metadata that makes up the NFT encoded in base64

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | unique token identification |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | Data URL (data:application/json;base64,...) |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal
```

Enumerable methods to list the tokens a user owns (Overrides required by solidity), transfer a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | origin |
| to | address | destination |
| tokenId | uint256 | unique token identification |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

States that in addition to being 721 it is enumerable

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | unique interface identification |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | override support interface |

## VestaDNA

Defines a data structure that represents a house. Contains the functions to set a new house, and get data from a created house.

_The visualization of pool or garden metadata attributes is not true or false but Yes or No_

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

List of all registered houses.

### set_house_detail

```solidity
function set_house_detail(string image, string typology, uint256 yearBuilt, uint256 sqm, uint256 rooms, uint256 bathrooms, uint256 levels, uint256 parkings, bool yard, bool pool, string location) public
```

Create a new house record

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| image | string | link of the image that represents the NFT, ideally hosted in IPFS |
| typology | string | house/apartment/building |
| yearBuilt | uint256 | year of construction of the property |
| sqm | uint256 | square meters of the entire property |
| rooms | uint256 | number of rooms |
| bathrooms | uint256 | number of bathrooms |
| levels | uint256 | number of levels |
| parkings | uint256 | number of parkings |
| yard | bool | true if the property has a garden, false otherwise |
| pool | bool | true if the property has a pool, false otherwise |
| location | string | representative location of the property |

### get_house

```solidity
function get_house(uint256 i) public view returns (string, string, uint256, uint256, uint256, uint256, uint256, uint256, bool, bool, string)
```

Get the information of an existing created property in the list of registered_house

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| i | uint256 | id of the record from the list registered_house |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | image URL |
| [1] | string | property typology |
| [2] | uint256 | year built |
| [3] | uint256 | Square meters |
| [4] | uint256 | number of rooms |
| [5] | uint256 | number of bathrooms |
| [6] | uint256 | number of levels |
| [7] | uint256 | number of parkings |
| [8] | bool | true or false if it has a garden or not |
| [9] | bool | true or falsei f it has a pool or not |
| [10] | string | representative location of the property |

