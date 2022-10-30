import {
	Flex,
	Button,
	Tag,
	TagLabel,
	Badge,
	Text,
	TagCloseButton,
} from "@chakra-ui/react"

import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { AddIcon, AtSignIcon } from "@chakra-ui/icons"
import { useCallback, useEffect, useState } from "react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"

import NavLink from "../nav-link"
import * as auth from "../../../reducers/auth"
import { connector } from "../../../config/web3"
import useTruncatedAddress from "../../../hooks/useTruncatedAddress"

const WalletData = ({
	authToken,
	authError,
	authEmail,
	authFirstName,
	login,
	logout,
	emailLogin,
	register,
}) => {
	const [balance, setBalance] = useState(0)
	const { active, activate, deactivate, account, error, library } = useWeb3React()

	const isUnsupportedChain = error instanceof UnsupportedChainIdError

	const connect = useCallback(() => {
		activate(connector)
		localStorage.setItem("previouslyConnected", "true")
	}, [activate])

	const disconnect = () => {
		deactivate()
		localStorage.removeItem("previouslyConnected")
		logout()
	}

	const getBalance = useCallback(async () => {
		const toSet = await library.eth.getBalance(account)
		setBalance((toSet / 1e18).toFixed(4))
	}, [library?.eth, account])

	useEffect(() => {
		if (active) {
			getBalance()
			const password = prompt("Ingrese su password")
			login(null, account, password)
		}
	}, [active, getBalance])

	useEffect(() => {
		if (authError) {
			alert(authError)
			register(account, disconnect)
		}
	}, [authError])

	useEffect(() => {
		if (localStorage.getItem("previouslyConnected") === "true") connect()
	}, [connect])

	// Show first and last 4 digits of wallet address
	const truncatedAddress = useTruncatedAddress(account)

	return (
		<Flex alignItems={ "center" }>
			{ active || authToken ? (
				<>
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
					<NavLink key={ authFirstName || authEmail } to={ "/profile" }>
						{ authFirstName || authEmail }
					</NavLink>
				</>
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
					<Text>{ "or" }</Text>
					<Button
						variant={ "solid" }
						colorScheme={ "green" }
						size={ "sm" }
						leftIcon={ <AtSignIcon /> }
						onClick={ emailLogin }
					>
						{ "Login" }
					</Button>
				</>
			)}
		</Flex>
	)
}

export default connect(
	state => ({
		authToken: auth.selectors.getAuthToken(state.auth),
        authError: auth.selectors.getAuthenticatingError(state.auth),
		authEmail: auth.selectors.getAuthEmail(state.auth),
		authFirstName: auth.selectors.getAuthFirstName(state.auth),
		authTelephone: auth.selectors.getAuthTelephone(state.auth),
    }),
    dispatch => ({
        login(email, account, password) {
			dispatch(auth.actions.startLogin({ email, account, password }))
        },
		emailLogin() {
			const email = prompt("Ingrese su email")
			if (email === undefined || email === null) { return }

			const password = prompt("Ingrese su password")
			if (password === undefined || password === null) { return }

			const account = null
			dispatch(auth.actions.startLogin({ email, account, password }))
		},
		logout() {
			dispatch(auth.actions.logout())
		},
		register(account, disconnect) {
			if (account === undefined || account === null) {
				disconnect()
				return
			}

			alert("Registremonos")

			const email = prompt("Ingrese su email")
			if (email === undefined || email === null) {
				disconnect()
				return
			}

			const password = prompt("Ingrese su password")
			if (password === undefined || password === null) {
				disconnect()
				return
			}

			const password_confirmation = prompt("Ingrese su password nuevamente")
			if (password_confirmation === undefined || password_confirmation === null) {
				disconnect()
				return
			}

			const first_name = prompt("Ingrese su nombre")
			const last_name = prompt("Ingrese su apellido")
			const telephone = prompt("Ingrese su telefono")


			dispatch(auth.actions.startRegistration({
				registration: { email, password, password_confirmation, first_name, last_name, telephone },
				wallet: { account }
			}))

		}
    }),
)(WalletData)
