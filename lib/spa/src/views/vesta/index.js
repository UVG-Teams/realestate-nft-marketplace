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
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useVesta from "../../hooks/useVesta";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useWeb3React } from "@web3-react/core";
import PunkCard from "../../components/punk-card";
import { useVestaData } from "../../hooks/useVestaData";
import RequestAccess from "../../components/request-access";

const Vesta = () => {
    const { active, account, library } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, singleVesta, update } = useVestaData(tokenId);
    const vesta = useVesta();
    const toast = useToast();
    const [transfering, setTransfering] = useState(false);

    const transfer = () => {
        setTransfering(true);

        const address = prompt("Ingresa la dirección de destino: ")

        const isAddress = library.utils.isAddress(address);

        if (!isAddress) {
            toast({
                title: 'Dirección invalida',
                description: 'La dirección no es una dirección de Ethereum',
                status: 'error'
            });

            setTransfering(false);
        } else {
            vesta.methods.safeTransferFrom(singleVesta.owner, address, singleVesta.tokenId).send({
                from: account
            }).on('transactionHash', (txHash) => {
                toast({
                    title: 'Transacción enviada',
                    description: txHash,
                    status: 'info',
                })
            }).on('receipt', () => {
                setTransfering(false);
                toast({
                    title: 'Transacción confirmada',
                    description: `Su título de propiedad ha sido transferido con éxito a ${address}`,
                    status: 'success'
                })
                update()
            }).on('error', () => {
                setTransfering(false);
            });
        }

    }

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
                    tokenId={ singleVesta.tokenId }
                    name={ singleVesta.name }
                    image={ singleVesta.image }
                />
                <Button
                    disabled={ account !== singleVesta.owner }
                    colorScheme="blue"
                    onClick={ transfer }
                    isLoading={ transfering }
                >
                    { account !== singleVesta.owner ? "No eres el dueño" : "Transferir" }
                </Button>
            </Stack>
            <Stack width="100%" spacing={ 5 }>
                <Heading>{ singleVesta.name }</Heading>
                <Text fontSize="xl">{ singleVesta.description }</Text>
                <Text fontWeight={ 600 }>
                    Owner:
                    <Tag ml={ 2 } colorScheme="blue">
                        { singleVesta.owner }
                    </Tag>
                </Text>
                <Table size="sm" variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Atributo</Th>
                            <Th>Valor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            Object.entries(singleVesta.attributes).map(([index, attr]) => (
                                <Tr key={ index }>
                                    <Td>{ attr.trait_type }</Td>
                                    <Td>
                                        <Tag>{ attr.value }</Tag>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
                {
                    account !== singleVesta.owner ? (
                        <div>
                            <Text mt={ 5 } fontWeight={ 600 }>
                                El dueño de este título de propiedad es:
                            </Text>
                        </div>
                    ) : (
                        <div>
                            <Text mt={ 5 } fontWeight={ 600 }>
                                Puedes transferir este título de propiedad a otra dirección de Ethereum
                            </Text>
                        </div>
                    )
                }
            </Stack>
        </Stack>
    );
};

export default Vesta;
