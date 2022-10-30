// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VestaDNA {
    struct House{
        string typology;
        uint256 finca;
        uint256 folio;
        uint256 libro;
        uint256 yearBuilt;
        bool rebuilt;
        uint256 rooms;
        uint256 bathrooms;
        uint256 levels;
        uint256 parkings;
        bool yard;
        bool pool;
        string location;
    }

    House userI;

    function set_house_detail(
        string memory typology,
        uint256 finca,
        uint256 folio,
        uint256 libro,
        uint256 yearBuilt,
        bool rebuilt,
        uint256 rooms,
        uint256 bathrooms,
        uint256 levels,
        uint256 parkings,
        bool yard,
        bool pool,
        string memory location
    ) public {
        userI = House(
            typology,
            finca,
            folio,
            libro,
            yearBuilt,
            rebuilt,
            rooms,
            bathrooms,
            levels,
            parkings,
            yard,
            pool,
            location
        );
    }

    // function get_house_info() public view returns (int, int, int, int, string memory) { 
    //     return(userI.libro, userI.folio, userI.rooms, userI.bathrooms, userI.location); 
    // }
    function get_house_info() public view returns (uint256, uint256, string memory ) { 
        return(userI.libro, userI.rooms, userI.location); 
    }
}