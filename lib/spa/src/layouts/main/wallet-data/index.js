import {
	Flex,
	Button,
	Tag,
	TagLabel,
	Badge,
	Text,
	TagCloseButton,
} from "@chakra-ui/react";

import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import * as auth from "../../../reducers/auth";
import { connector } from "../../../config/web3";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

const WalletData = ({ authError, login }) => {
	const [balance, setBalance] = useState(0);
	const { active, activate, deactivate, account, error, library } = useWeb3React();

	const isUnsupportedChain = error instanceof UnsupportedChainIdError;

	const connect = useCallback(() => {
		activate(connector);
		localStorage.setItem("previouslyConnected", "true");
	}, [activate]);

	const disconnect = () => {
		deactivate();
		localStorage.removeItem("previouslyConnected");
	};

	const getBalance = useCallback(async () => {
		const toSet = await library.eth.getBalance(account);
		setBalance((toSet / 1e18).toFixed(4));
	}, [library?.eth, account]);

	useEffect(() => {
		if (active) {
			getBalance();
			login(null, account, "password");
		}
	}, [active, getBalance]);

	useEffect(() => {
		if (authError) {
			alert(authError)
			disconnect()
		}
	}, [authError]);

	useEffect(() => {
		if (localStorage.getItem("previouslyConnected") === "true") connect();
	}, [connect]);

	// Show first and last 4 digits of wallet address
	const truncatedAddress = useTruncatedAddress(account);

	return (
		<Flex alignItems={ "center" }>
			{ active ? (
				<Tag colorScheme="blue" borderRadius="full">
					<TagLabel>
						<Link to="/marketplace">{ truncatedAddress }</Link>
					</TagLabel>
					<Badge
						d={{
							base: "none",
							md: "block",
						}}
						variant="solid"
						fontSize="0.8rem"
						ml={ 1 }
					>
						~{ balance } Ξ
					</Badge>
					<TagCloseButton onClick={ disconnect } />
				</Tag>
			) : (
				<>
					<Button
						variant={ "solid" }
						colorScheme={ "green" }
						size={ "sm" }
						leftIcon={ <AddIcon /> }
						onClick={ connect }
						disabled={ isUnsupportedChain }
					>
						{ isUnsupportedChain ? "Red no soportada" : "Conectar wallet" }
					</Button>
				</>
			)}
		</Flex>
	);
};

export default connect(
	state => ({
        authError: auth.selectors.getAuthenticatingError(state.auth),
    }),
    dispatch => ({
        login(email, account, password) {
			dispatch(auth.actions.startLogin({ email, account, password }));
        },
    }),
)(WalletData);
