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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import PunkCard from '../../components/punk-card';
import { useVestasData } from "../../hooks/useVestaData";
import RequestAccess from '../../components/request-access';

const Vesta = () => {
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(true);
    const [validAddress, setValidAddress] = useState(true);
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
            // if (isValid) navigate(`/marketplace?address=${address}`);
        } else {
            navigate('/marketplace');
        }

    }

    return (
        <>
            {
                !active && (
                    <RequestAccess />
                )
            }
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
                                    <PunkCard tokenId={ tokenId } image={ image } name={ name } />
                                </Link>
                            ))
                        }
                        {
                            allVestas.length === 0 && <p>No se encontraron vestas</p>
                        }
                    </Grid>
                )
            }
        </>
    );
};

export default Vesta;
