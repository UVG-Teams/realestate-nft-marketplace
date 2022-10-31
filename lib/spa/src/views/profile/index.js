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
} from "@chakra-ui/react"

import { connect } from 'react-redux'
import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react"

import useVesta from "../../hooks/useVesta"
import * as auth from "../../reducers/auth"


const Profile = ({
    authEmail,
    authFirstName,
    authLastName,
    authTelephone,
}) => {
    const { active, account } = useWeb3React()

    const vesta = useVesta()

    const [image, setImage] = useState('');
    const [typology, setTypology] = useState('');
    const [yearBuilt, setYearBuilt] = useState('');
    const [sqm, setSqm] = useState('');
    const [rooms, setRooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [levels, setLevels] = useState('');
    const [parkings, setParkings] = useState('');
    const [yard, setYard] = useState('');
    const [pool, setPool] = useState('');
    const [location, setLocation] = useState('');

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
                        <Input type='text' />
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
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Metros cuadrados</FormLabel>
                        <Input type='text' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Cantidad de habitaciones</FormLabel>
                        <NumberInput max={50} min={1}>
                        <NumberInputField />
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
                        <NumberInputField />
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
                        <NumberInputField />
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
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Ingrese 0 si no cuenta con estacionamiento</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Jardín</FormLabel>
                        <Switch size='lg' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Piscina</FormLabel>
                        <Switch size='lg' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Ubicación</FormLabel>
                        <Input type='text' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
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
