// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title VestaDNA
/// @author Gian Luca Rivera
/// @notice Defines a data structure that represents a house. Contains the functions to set a new house, and get data from a created house.
/// @dev The visualization of pool or garden metadata attributes is not true or false but Yes or No
contract VestaDNA {
    /// @notice Data structure that defines a house. All the attributes of this structure represent the attributes of the metadata.
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

    /// @notice List of all registered houses.
    House[] public registered_house; 

    /// @notice Create a new house record
    /// @param image link of the image that represents the NFT, ideally hosted in IPFS
    /// @param typology house/apartment/building
    /// @param yearBuilt year of construction of the property
    /// @param sqm square meters of the entire property
    /// @param rooms number of rooms
    /// @param bathrooms number of bathrooms
    /// @param levels number of levels
    /// @param parkings number of parkings
    /// @param yard true if the property has a garden, false otherwise
    /// @param pool true if the property has a pool, false otherwise
    /// @param location representative location of the property
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
        registered_house.push(
            House(
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
            )
        );
    }

    /// @notice Get the information of an existing created property in the list of registered_house
    /// @param i id of the record from the list registered_house
    /// @return image URL
    /// @return property typology
    /// @return year built
    /// @return Square meters
    /// @return number of rooms
    /// @return number of bathrooms
    /// @return number of levels
    /// @return number of parkings
    /// @return true or false if it has a garden or not
    /// @return true or falsei f it has a pool or not
    /// @return representative location of the property
    function get_house(uint i) public view returns(string memory, string memory, uint256, uint256, uint256, uint256, uint256, uint256, bool, bool, string memory) {
        House storage house = registered_house[i];
        return (house.image, house.typology, house. yearBuilt, house.sqm, house.rooms, house.bathrooms, house.levels, house.parkings, house.yard, house.pool, house.location);
    }
}