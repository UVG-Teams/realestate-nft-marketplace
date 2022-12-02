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
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import useVesta from "../../hooks/useVesta";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useWeb3React } from "@web3-react/core";
import PunkCard from "../../components/punk-card";
import { useVestaData } from "../../hooks/useVestaData";
import * as properties from "../../reducers/properties";
import RequestAccess from "../../components/request-access";

const Vesta = ({ updateProperty, uploadPropertyFiles, getAdditionalData, currentVesta }) => {
    const { active, account, library } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, singleVesta, update } = useVestaData(tokenId);
    const vesta = useVesta();
    const toast = useToast();
    const [transfering, setTransfering] = useState(false);

    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        getAdditionalData(tokenId);
    }, [tokenId]);

    useEffect(() => {
        setPrice(currentVesta?.price)
    }, [currentVesta]);

    const transfer = () => {
        setTransfering(true);

        const address = prompt("Ingresa la dirección de destino: ")

        const isAddress = library.utils.isAddress(address);

        if (!isAddress) {
            toast({
                title: "Dirección invalida",
                description: "La dirección no es una dirección de Ethereum",
                status: "error"
            });

            setTransfering(false);
        } else {
            vesta.methods.safeTransferFrom(singleVesta.owner, address, singleVesta.tokenId).send({
                from: account
            }).on("transactionHash", (txHash) => {
                toast({
                    title: "Transacción enviada",
                    description: txHash,
                    status: "info",
                })
            }).on("receipt", () => {
                setTransfering(false);
                toast({
                    title: "Transacción confirmada",
                    description: `Su título de propiedad ha sido transferido con éxito a ${address}`,
                    status: "success"
                })
                update()
            }).on("error", () => {
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
                    currentVesta={ currentVesta }
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
                    account !== singleVesta.owner ? ( <></> ) : (
                        <div>
                            <FormControl isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input type="text" onChange={ e => { setPrice(e.target.value) } }/>
                                <FormHelperText>Price in ($). Do not include symbols</FormHelperText>
                            </FormControl>

                            <Button
                                rounded={ "5px" }
                                size={ "lg" }
                                margin={ 3 }
                                fontWeight={ "normal" }
                                px={ 6 }
                                colorScheme={ "blue" }
                                bg={ "blue.400" }
                                _hover={{ bg: "blue.500" }}
                                disabled={ !vesta }
                                onClick={ () => updateProperty({
                                    tokenId,
                                    price
                                })}
                            >
                                Update
                            </Button>

                            {
                                currentVesta && (
                                    <>
                                        <FormControl>
                                            <FormLabel>Upload Images</FormLabel>
                                            <Input type="file" onChange={ e => { setFile(e.target.files[0]) } } />
                                        </FormControl>

                                        <Button
                                            rounded={ "5px" }
                                            size={ "lg" }
                                            margin={ 3 }
                                            fontWeight={ "normal" }
                                            px={ 6 }
                                            colorScheme={ "blue" }
                                            bg={ "blue.400" }
                                            _hover={{ bg: "blue.500" }}
                                            disabled={ !vesta }
                                            onClick={ () => uploadPropertyFiles(
                                                currentVesta,
                                                file,
                                            )}
                                        >
                                            Upload
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </Stack>
        </Stack>
    );
};

export default connect(
    state => ({
        currentVesta: properties.selectors.getCurrentVestaData(state.properties),
    }),
    dispatch => ({
        updateProperty(payload) {
            dispatch(properties.actions.startSync(payload))
        },
        uploadPropertyFiles(currentVesta, file) {
            dispatch(properties.actions.startUploadFiles({
                property_id: currentVesta.id,
                files: [file]
            }))
        },
        getAdditionalData(tokenId) {
            dispatch(properties.actions.startGetData({ tokenId }))
        }
    })
)(Vesta);
