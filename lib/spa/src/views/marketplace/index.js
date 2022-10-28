import { useWeb3React } from '@web3-react/core';
import {
    Grid,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button,
    FormHelperText,
    FormControl
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useVestasData } from '../../hooks/useVestaData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vesta = () => {
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [validAddress, setValidAddress] = useState(false);
    const { navigate } = useNavigate()
    const { active, library } = useWeb3React();
    const { allVestas, loading } = useVestasData({
        owner: submitted && validAddress ? address : null,
    });

    const handleAddressChange = ({ target: { value } }) => {
        setAddress(value);
        setSubmitted(false);
        setValidAddress(false);
    }

    const submit = event => {
        event.preventDefault();

        if (address) {
            const isValid = library.utils.isAddress(address);
            setValidAddress(isValid);
            setSubmitted(true);
            if (isValid) navigate(`/marketplace?address=${address}`);
        } else {
            navigate('/marketplace');
        }

    }

    if (!active) return <RequestAccess />;

    return (
        <>
            <form onSubmit={ submit }>
                <FormControl>
                    <InputGroup mb={ 3 }>
                        <InputLeftElement pointerEvents='none' children={ <SearchIcon color='gray.300' /> } />
                        <Input isInvalid={ false } value={ address ?? '' } onChange={ handleAddressChange } placeholder='Buscar por direccion' />
                        <InputRightElement width='5.5rem'>
                            <Button type='submit' h='1.75rem' size='sm'>
                                Buscar
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {
                        submitted && !validAddress && <FormHelperText>Dirección inválida</FormHelperText>
                    }
                </FormControl>
            </form>
            {
                loading ? (
                    <Loading />
                ) : (
                    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={ 6 }>
                        {
                            allVestas.map(({ name, image, tokenId }) => (
                                <Link key={ tokenId } to={ `/marketplace/${ tokenId }` }>
                                    <PunkCard image={ image } name={ name } />
                                </Link>
                            ))
                        }
                    </Grid>
                )
            }
        </>
    );
};

export default Vesta;


// const Punks = () => {
//   const { active } = useWeb3React();
//   const { punks, loading } = usePlatziPunksData();

//   if (!active) return <RequestAccess />;

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
//           {_vesta.map(({ name, image, tokenId }) => (
//             <PunkCard key={tokenId} image={image} name={name} />
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// };

// export default Punks;
