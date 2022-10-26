// import { useState } from "react";
// import useVesta from "../../hooks/useVesta";

// const Home = () => {
//     const vesta = useVesta();
//     const []

//     return (
//         <>
//             <p>Hola mundo</p>
//         </>
//     )
// }

// export default Home;

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
    // const get_house_info = vesta.methods.get_house_info().call();

  
    const getVestaData = useCallback(async () => {
      if (vesta) {
        // const totalSupply = await vesta.methods.totalSupply().call();
        const get_house_info = await vesta.methods.get_house_info().call();
        setHousedata(get_house_info)

        const dnaPreview = await vesta.methods
        //   .deterministicPseudoRandomDNA(totalSupply, account)
          .call();
        // const image = await vesta.methods.imageByDNA(dnaPreview).call();
        // setImageSrc(image);
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
                // chakraUI mensajes - interfaz
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
            })
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
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Un Vesta
            </Text>
            <br />
            <Text as={"span"} color={"green.400"}>
              nunca para de aprender
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Platzi Punks es una colección de Avatares randomizados cuya metadata
            es almacenada on-chain. Poseen características únicas y sólo hay 10000
            en existencia.
          </Text>
          <Text color={"green.500"}>
            Cada Platzi Punk se genera de forma secuencial basado en tu address,
            usa el previsualizador para averiguar cuál sería tu Platzi Punk si
            minteas en este momento
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              disabled={!vesta}
              onClick={mint}
              isLoading={isMinting}
            >
              Obtén tu punk
            </Button>
            <Link to="/marketplace">
              <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                Galería
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
          {active ? (
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
          )}
        </Flex>
      </Stack>
    );
  };
  
  export default Home;
  