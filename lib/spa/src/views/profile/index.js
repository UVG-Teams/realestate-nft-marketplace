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
    TabPanel
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
            <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                <p>one!</p>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
                <TabPanel>
                <p>three!</p>
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
