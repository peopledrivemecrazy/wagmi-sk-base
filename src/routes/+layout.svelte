<script>
	import '../app.postcss';
	import {
		configureChains,
		connect,
		createClient,
		createStorage,
		disconnect,
		InjectedConnector,
		watchAccount,
		watchNetwork
	} from '@wagmi/core';
	import { publicProvider } from '@wagmi/core/providers/public';
	import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
	import { browser } from '$app/environment';
	import { currentAccount, curretChain } from '../stores';
	import { safeStringify } from '../lib/helpers';
	import { arbitrum } from '@wagmi/core/chains';

	const { chains, provider, webSocketProvider } = configureChains([arbitrum], [publicProvider()]);

	createClient({
		autoConnect: true,
		provider,
		webSocketProvider,
		storage: browser ? createStorage({ storage: window.localStorage }) : undefined,
		connectors: [
			new InjectedConnector({ chains }),
			new WalletConnectConnector({
				chains,
				options: {
					qrcode: true,
					chainId: arbitrum.id
				}
			})
		]
	});
	async function connectClient() {
		const result = await connect({
			connector: window['ethereum']
				? new InjectedConnector()
				: new WalletConnectConnector({
						chains: [arbitrum],
						options: {
							qrcode: true
						}
				  }),
			chainId: arbitrum.id
		});
		console.log({ result });
	}

	async function disconnectClient() {
		const result = await disconnect();
		console.log({ result });
	}

	$: {
		watchAccount((account) => {
			$currentAccount = account;
		});
		watchNetwork((network) => {
			$curretChain = network;
		});
	}
</script>

{#if $currentAccount?.isConnecting}
	<p>Connecting...</p>
{/if}

{#if $currentAccount?.isDisconnected}
	<button on:click={connectClient}> connect </button>
{/if}

{#if $currentAccount?.isConnected}
	<button on:click={disconnectClient}> disconnect </button>
	<slot />
{/if}

<style lang="postcss">
	button {
		@apply p-2 bg-black rounded-lg text-white;
	}
</style>
