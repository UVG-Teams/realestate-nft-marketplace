import {
	Stack,
	Heading,
	Text,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Button,
	Tag,
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-access";
  import PunkCard from "../../components/punk-card";
  import { useVestaData } from "../../hooks/useVestaData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  
  const Vesta = () => {
	const { active, account } = useWeb3React();
	const { tokenId } = useParams();
	const { loading, singleVesta } = useVestaData(tokenId);
  
	if (!active) return <RequestAccess />;
  
	if (loading) return <Loading />;
  
	return (
		<Stack
			spacing={{ base: 8, md: 10 }}
			py={{ base: 5 }}
			direction={{ base: "column", md: "row" }}
		>
			<Stack>
				<PunkCard
					mx = {{
						base: "auto",
						md: 0,
					}}
					name={singleVesta.name}
					image={singleVesta.image}
				/>
				<Button disabled={account !== singleVesta.owner} colorScheme="green">
					{account !== singleVesta.owner ? "No eres el dueño" : "Transferir"}
				</Button>
			</Stack>
			<Stack width="100%" spacing={5}>
		  		<Heading>{singleVesta.name}</Heading>
				<Text fontSize="xl">{singleVesta.description}</Text>
				<Text fontWeight={600}>
					DNA:
					<Tag ml={2} colorScheme="green">
						{/* {singleVesta.dna} */}
					</Tag>
				</Text>
				<Text fontWeight={600}>
					Owner:
					<Tag ml={2} colorScheme="green">
						{singleVesta.owner}
					</Tag>
		  		</Text>
				<Text fontWeight={600}>
					Test:
					<Tag ml={2} colorScheme="green">
						{singleVesta.attributes[0].trait_type}: {singleVesta.attributes[0].value}
						{singleVesta.attributes[1].trait_type}: {singleVesta.attributes[1].value}
						{singleVesta.attributes[2].trait_type}: {singleVesta.attributes[2].value}
					</Tag>
		  		</Text>
		  		{/* <Table size="sm" variant="simple">
					<Thead>
						<Tr>
							<Th>Atributo</Th>
							<Th>Valor</Th>
						</Tr>
					</Thead>
					<Tbody>
			  			{Object.entries(singleVesta.attributes.Libro).map(([key, value]) => (
							<Tr key={key}>
								<Td>{key}</Td>
								<Td>
									<Tag>{value}</Tag>
								</Td>
							</Tr>
			 			 ))}
					</Tbody>
		 		</Table> */}
			</Stack>
	  	</Stack>
	);
  };
  
  export default Vesta;
  