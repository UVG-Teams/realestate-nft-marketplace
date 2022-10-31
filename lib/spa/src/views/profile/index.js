import {
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    Switch,
    useToast
} from "@chakra-ui/react"

import { connect } from 'react-redux'
import { useWeb3React } from "@web3-react/core";
import useVesta from "../../hooks/useVesta";
import { useCallback, useEffect, useState } from "react";

import * as auth from "../../reducers/auth"


const Profile = ({
    authEmail,
    authFirstName,
    authLastName,
    authTelephone,
}) => {
    const [isMinting, setIsMinting] = useState(false);
    const [housedata, setHousedata] = useState("");
    const { active, account } = useWeb3React()
    const vesta = useVesta()
    const toast = useToast();

    const [image, setImage] = useState('');
    const [typology, setTypology] = useState('');
    const [yearBuilt, setYearBuilt] = useState(0);
    const [sqm, setSqm] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [levels, setLevels] = useState(0);
    const [parkings, setParkings] = useState(0);
    const [yard, setYard] = useState(0);
    const [pool, setPool] = useState(true);
    const [location, setLocation] = useState('');


    const mint = () => {
        setIsMinting(true);

        vesta.methods.set_house_detail(
            image,
            typology,
            parseInt(yearBuilt),
            parseInt(sqm),
            parseInt(rooms),
            parseInt(bathrooms),
            parseInt(levels),
            parseInt(parkings),
            yard % 2 == 0 ? false : true,
            pool % 2 == 0 ? false : true,
            location
        ).send({
            from: account,
        }).on('transactionHash', txHash => {
            toast({
                title: 'Escribiendo datos en blockchain',
                description: txHash,
                status: 'info'
            })
        }).on('receipt', () => {
            setIsMinting(false);
            toast({
                title: 'Listo para ser minteado',
                description: 'Firme',
                status: 'success'
            })
            
            vesta.methods.mint().send({
                from: account,
                // value: 1e18,
            }).on('transactionHash', txHash => {
                toast({
                    title: 'Transacción enviada',
                    description: txHash,
                    status: 'info'
                })
            }).on('receipt', () => {
                setIsMinting(false);
                toast({
                    title: 'Transacción confirmada',
                    description: 'cool',
                    status: 'success'
                })
            }).on('error', error => {
                setIsMinting(false);
                toast({
                    title: 'Transacción fallida',
                    description: error.message,
                    status: 'error'
                })
            })
        }).on('error', error => {
            setIsMinting(false);
            toast({
                title: 'Transacción fallida',
                description: error.message,
                status: 'error'
            })
        })
    }

    return (
        // <Stack
        //     align={ "center" }
        //     spacing={{ base: 8, md: 10 }}
        //     py={{ base: 20, md: 28 }}
        //     direction={{ base: "column-reverse", md: "row" }}
        // >
        //     <Stack flex={ 1 } spacing={{ base: 5, md: 10 }}>
        //         <Heading
        //             lineHeight={ 1.1 }
        //             fontWeight={ 600 }
        //             fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        //         >
        //             <Text
        //                 as={ "span" }
        //                 position={ "relative" }
        //                 _after={{
        //                     content: "''",
        //                     width: "full",
        //                     height: "30%",
        //                     position: "absolute",
        //                     bottom: 1,
        //                     left: 0,
        //                     bg: "blue.400",
        //                     zIndex: -1,
        //                 }}
        //             >
        //                 Hello { authFirstName } { authLastName }
        //             </Text>
        //             <br />
        //             <Text as={ "span" } color={ "blue.400" }>
        //                 Welcome back!
        //             </Text>
        //         </Heading>
        //         <Text color={ "gray.500" }>
        //             Vesta es lorem ipsum dolor sit amet, consectetur
        //         </Text>
        //     </Stack>
        //     <Flex
        //         flex={ 1 }
        //         direction="column"
        //         justify={ "center" }
        //         align={ "center" }
        //         position={ "relative" }
        //         w={ "full" }
        //     >
        //         <Image src={ "https://avataaars.io/" } />
        //     </Flex>
        // </Stack>
        <Tabs orientation="vertical"  colorScheme='blue' variant='soft-rounded'>
            <TabList w={"xs"} alignItems='start'>
                <Tab>⚙️ Perfil</Tab>
                <Tab>🏠 Propiedades</Tab>
                <Tab>➕ Nueva propiedad</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <FormControl isRequired>
                        <FormLabel>Imagen</FormLabel>
                        <Input type='text' onChange={ (e) => { setImage(e.target.value) } }/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Tipología</FormLabel>
                        <Input type='text'  onChange={ (e) => { setTypology(e.target.value) } }/>
                        <FormHelperText>Ej. casa, apartamento, etc.</FormHelperText>
                    </FormControl>
                    {console.log(typology)}
                    <FormControl isRequired>
                        <FormLabel>Año de construcción</FormLabel>
                        <NumberInput max={2025} min={1900}>
                            <NumberInputField  onChange={ (e) => { setYearBuilt(e.target.value) } }/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    {console.log(yearBuilt, typeof(parseInt(yearBuilt)))}
                    <FormControl isRequired>
                        <FormLabel>Metros cuadrados</FormLabel>
                        <Input type='text'  onChange={ (e) => { setSqm(e.target.value) } }/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Cantidad de habitaciones</FormLabel>
                        <NumberInput max={50} min={1}>
                            <NumberInputField  onChange={ (e) => { setRooms(e.target.value) } }/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Cantidad de baños</FormLabel>
                        <NumberInput max={50} min={1}>
                        <NumberInputField onChange={ (e) => { setBathrooms(e.target.value) } }/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Número de niveles</FormLabel>
                        <NumberInput max={50} min={1}>
                        <NumberInputField onChange={ (e) => { setLevels(e.target.value) } } />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Número de estacionamientos</FormLabel>
                        <NumberInput max={50} min={0}>
                        <NumberInputField onChange={ (e) => { setParkings(e.target.value) } }/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Ingrese 0 si no cuenta con estacionamiento</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Jardín</FormLabel>
                        <Switch size='lg' onChange={() => setYard(yard + 1)}/>
                        {/* {yard % 2 == 0 ? setYard(false) : setYard(true)} */}
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    {console.log("AAAH", yard, typeof(yard))}
                    <FormControl isRequired>
                        <FormLabel>Piscina</FormLabel>
                        <Switch size='lg' onChange={() => setPool(pool + 1)}/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Ubicación</FormLabel>
                        <Input type='text'onChange={ (e) => { setLocation(e.target.value) } } />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>

                    <Button
                        rounded={ "full" }
                        size={ "lg" }
                        fontWeight={ "normal" }
                        px={ 6 }
                        colorScheme={ "blue" }
                        bg={ "blue.400" }
                        _hover={{ bg: "blue.500" }}
                        disabled={ !vesta }
                        onClick={ mint }
                        isLoading={ isMinting }
                    >
                        Mint
                    </Button>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default connect(
	state => ({
		authEmail: auth.selectors.getAuthEmail(state.auth),
		authFirstName: auth.selectors.getAuthFirstName(state.auth),
		authLastName: auth.selectors.getAuthLastName(state.auth),
		authTelephone: auth.selectors.getAuthTelephone(state.auth),
    }),
)(Profile)
