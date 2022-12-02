import {
    Box,
    useColorModeValue,
    Heading,
    Stack,
    HStack,
    StackDivider,
    Image,
    Text,
    Tag
} from "@chakra-ui/react";
import { connect } from "react-redux"
// import { useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import useVesta from "../../hooks/useVesta";
import { useVestaData } from "../../hooks/useVestaData";
import * as properties from "../../reducers/properties";

import Sqm from "./images/sqm.png";
import Bedroom from "./images/bedroom.png";
import Bathroom from "./images/bathroom.png";

const PunkCard = ({ tokenId, image, name, syncWithBackend, currentVesta, ...props }) => {
    // const vesta = useVesta();
    const { loading, singleVesta, update } = useVestaData(tokenId);

    if (singleVesta.attributes) {
        syncWithBackend(singleVesta)
    }

    return (
        <Box
            role={ "group" }
            // p={ 6 }
            maxW={ "330px" }
            w={ "full" }
            bg={ useColorModeValue("white", "gray.800") }
            boxShadow={ "2xl" }
            rounded={ "lg" }
            pos={ "relative" }
            zIndex={ 1 }
            { ...props }
        >
            <Box
                rounded={ "lg" }
                pos={ "relative" }
                height={ "230px" }
                _after={{
                    transition: "all .3s ease",
                    content: '""',
                    w: "full",
                    h: "full",
                    pos: "absolute",
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${image})`,
                    borderRadius: "20px 20px 0 0",
                    // filter: "blur(15px)",
                    zIndex: -1,
                }}
                _groupHover={{
                    _after: {
                        filter: "blur(20px)",
                    },
                }}
            >
                <Image
                    rounded={ "lg" }
                    height={ 230 }
                    width="full"
                    objectFit={ "cover" }
                    src={ image }
                />
            </Box>
            <Stack pt={ 5 } pl={ 5 } pr={ 5 } pb = { 5 } align={ "left" }>
                <Heading fontSize={ "xl" } fontFamily={ "body" } fontWeight={ 500 } color={ "blue.500" }>
                    { currentVesta?.price ? "$" : "" }{ currentVesta?.price }
                </Heading>
                <Heading fontSize={ "2xl" } fontFamily={ "body" } fontWeight={ 500 }>
                    { name }
                </Heading>
                <Tag size={ "sm" }  color={ "blue.500" }>{ currentVesta?.status }</Tag>
                <Text>
                    {
                        singleVesta.attributes && singleVesta.attributes.filter(attr => attr.trait_type === 'Location')[0].value
                    }
                </Text>

                <Stack direction={['column', 'row']} spacing='1px' borderTop='1px' pt={ 4 }>
                    <HStack spacing='3px'>
                        <Image  src={ Bedroom } boxSize="20px"/>

                        <Text fontSize={ "xs" } w='110px'>
                            {
                                singleVesta.attributes && singleVesta.attributes.filter(attr => attr.trait_type === 'Rooms')[0].value
                            }
                            { " habitaciones" }
                        </Text>
                    </HStack>
                    <HStack spacing='3px'>
                        <Image  src={ Bathroom } boxSize="20px"/>

                        <Text fontSize={ "xs" } w='70px'>
                            {
                                singleVesta.attributes && singleVesta.attributes.filter(attr => attr.trait_type === 'Bathrooms')[0].value
                            }
                            { " baños" }
                        </Text>
                    </HStack>
                    <HStack spacing='3px'>
                        <Image  src={ Sqm } boxSize="20px"/>

                        <Text fontSize={ "xs" } w='70px'>
                            {
                                singleVesta.attributes && singleVesta.attributes.filter(attr => attr.trait_type === 'Square meters')[0].value
                            }
                            { " m" }<Text as='sup'>2</Text>
                        </Text>
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default connect(
    state => ({}),
    dispatch => ({
        syncWithBackend(vesta) {
            dispatch(properties.actions.startSync(vesta))
        }
    })
)(PunkCard);
