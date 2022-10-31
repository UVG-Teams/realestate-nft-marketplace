// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VestaDNA {
    struct House{
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

    House userI;

    function set_house_detail(
        string memory image,
        string memory typology,
        uint256 yearBuilt,
        uint256 sqm,
        uint256 rooms,
        uint256 bathrooms,
        uint256 levels,
        uint256 parkings,
        bool yard,
        bool pool,
        string memory location
    ) public {
        userI = House(
            image,
            typology,
            yearBuilt,
            sqm,
            rooms,
            bathrooms,
            levels,
            parkings,
            yard,
            pool,
            location
        );
    }


    function get_house_info()
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            bool,
            string memory
        ) { 
            return(
                userI.image,
                userI.typology,
                userI.yearBuilt,
                userI.sqm,
                userI.rooms,
                userI.bathrooms,
                userI.levels,
                userI.parkings,
                userI.yard,
                userI.pool,
                userI.location
            ); 
    }
}