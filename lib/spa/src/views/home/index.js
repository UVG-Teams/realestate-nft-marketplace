import {
	Stack,
	Flex,
	Heading,
	Text,
	Button,
	Image,
	Badge,
	useToast,
  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useVesta from "../../hooks/useVesta";
import { useCallback, useEffect, useState } from "react";
  
  
const Home = () => {
	const [isMinting, setIsMinting] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const [housedata, setHousedata] = useState("");
	const { active, account } = useWeb3React();
	const vesta = useVesta();
	const toast = useToast();

  
	const getVestaData = useCallback(async () => {
		if (vesta) {
			const get_house_info = await vesta.methods.get_house_info().call();
			setHousedata(get_house_info)
		}
	}, [vesta, account]);
  
	useEffect(() => {
		getVestaData();
	}, [getVestaData]);

	const mint = () => {
		setIsMinting(true);

		vesta.methods
			.mint()
			.send({
				from: account,
				// value: 1e18,
			})
			.on('transactionHash', (txHash) => {
				toast({
					title: 'Transacción enviada',
					description: txHash,
					status: 'info'
				})
			})
			.on('receipt', () => {
				setIsMinting(false);
				toast({
					title: 'Transacción confirmada',
					description: 'cool',
					status: 'success'
				})
			})
			.on('error', (error) => {
				setIsMinting(false);
				toast({
					title: 'Transacción fallida',
					description: error.message,
					status: 'error'
				})
			}
		)
	}
  
	return (
		<Stack
			align={"center"}
			spacing={{ base: 8, md: 10 }}
			py={{ base: 20, md: 28 }}
			direction={{ base: "column-reverse", md: "row" }}
		>
		<Stack flex={1} spacing={{ base: 5, md: 10 }}>
			<Heading
				lineHeight={1.1}
				fontWeight={600}
				fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
			>
				<Text
					as={"span"}
					position={"relative"}
					_after={{
						content: "''",
						width: "full",
						height: "30%",
						position: "absolute",
						bottom: 1,
						left: 0,
						bg: "blue.400",
						zIndex: -1,
					}}
				>
				Lorem ipsum dolor sit 
				</Text>
				<br />
				<Text as={"span"} color={"blue.400"}>
					amet consectetur adipiscing
				</Text>
		  	</Heading>
			<Text color={"gray.500"}>
					Vesta es lorem ipsum dolor sit amet, consectetur
			</Text>
			{/* <Text color={"green.500"}>
			Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed
			vulputate, metus vel efficitur fringilla, orci ex ultricies augue, sit amet rhoncus ex purus ut massa.
			Nam pharetra ipsum consequ
			</Text> */}
			<Stack
				spacing={{ base: 4, sm: 6 }}
				direction={{ base: "column", sm: "row" }}
			>
				<Button
					rounded={"full"}
					size={"lg"}
					fontWeight={"normal"}
					px={6}
					colorScheme={"blue"}
					bg={"blue.400"}
					_hover={{ bg: "green.500" }}
					disabled={!vesta}
					onClick={mint}
					isLoading={isMinting}
				>
			  		Mint
				</Button>
				<Link to="/marketplace">
			  		<Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
						Ver Marketplace
			  		</Button>
				</Link>
		  	</Stack>
		</Stack>
		<Flex
			flex={1}
			direction="column"
			justify={"center"}
			align={"center"}
			position={"relative"}
			w={"full"}
		>
			<Image src={active ? imageSrc : "https://avataaars.io/"} />
			{/* {active ? (
				<>
				<Flex mt={2}>
					<Badge>
						Next ID:
						<Badge ml={1} colorScheme="green">
							1
						</Badge>
					</Badge>
					<Badge ml={2}>
						Address:
						<Badge ml={1} colorScheme="green">
							0x0000...0000
						</Badge>
					</Badge>
				</Flex>
				<Button
					onClick={getVestaData}
					mt={4}
					size="xs"
					colorScheme="green"
				>
					Actualizar
				</Button>
				</>
			) : (
				<Badge mt={2}>Wallet desconectado</Badge>
			)} */}
		</Flex>
	</Stack>
	);
  };
  
  export default Home;
  