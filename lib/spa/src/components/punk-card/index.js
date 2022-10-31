import {
    Box,
    useColorModeValue,
    Heading,
    Stack,
    HStack,
    StackDivider,
    Image,
    Text
} from "@chakra-ui/react";
import Bedroom from './images/bedroom.png';
import Bathroom from './images/bathroom.png';
import Sqm from './images/sqm.png';

const PunkCard = ({ image, name, ...props }) => {
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
                    $250,000
                </Heading>
                <Heading fontSize={ "2xl" } fontFamily={ "body" } fontWeight={ 500 }>
                    { name }
                </Heading>
                <Text>
                    Ubicacion del la casa
                </Text>

                <Stack direction={['column', 'row']} spacing='1px' borderTop='1px' pt={ 4 }>
                    <HStack spacing='3px'>
                        <Image  src={ Bedroom } boxSize="20px"/>
                        
                        <Text fontSize={ "xs" } w='110px'>
                            4 habitaciones
                        </Text>
                    </HStack>
                    <HStack spacing='3px'>
                        <Image  src={ Bathroom } boxSize="20px"/>
                        
                        <Text fontSize={ "xs" } w='70px'>
                            2 baños
                        </Text>
                    </HStack>
                    <HStack spacing='3px'>
                        <Image  src={ Sqm } boxSize="20px"/>
                        
                        <Text fontSize={ "xs" } w='70px'>
                            200 m<Text as='sup'>2</Text>
                        </Text>
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default PunkCard;
