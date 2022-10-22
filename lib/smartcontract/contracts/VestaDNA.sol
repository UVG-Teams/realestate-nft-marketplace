// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VestaDNA {
    struct House{
        // uint batch_num;
        int libro;
        int folio;
        int rooms;
        int bathrooms;
        string location;
        // address user;
        // string timestamp;
    }

    House userI;

    function set_house_detail(int l, int f, int r, int b, string memory loc) public {
        userI = House(l, f, r, b, loc);
    }

    function get_house_info() public view returns (int, int, int, int, string memory) { 
        return(userI.libro, userI.folio, userI.rooms, userI.bathrooms, userI.location); 
    }
}