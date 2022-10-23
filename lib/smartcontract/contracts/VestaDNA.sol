// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VestaDNA {
    struct House{
        // uint batch_num;
        uint256 libro;
        uint256 folio;
        uint256 rooms;
        int bathrooms;
        string location;
        // address user;
        // string timestamp;
    }

    House userI;

    function set_house_detail(uint256 l, uint256 f, uint256 r, int b, string memory loc) public {
        userI = House(l, f, r, b, loc);
    }

    // function get_house_info() public view returns (int, int, int, int, string memory) { 
    //     return(userI.libro, userI.folio, userI.rooms, userI.bathrooms, userI.location); 
    // }
    function get_house_info() public view returns (uint256, uint256, string memory ) { 
        return(userI.libro, userI.rooms, userI.location); 
    }
}