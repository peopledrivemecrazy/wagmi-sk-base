<script>
	import '../app.postcss';
	import {
		configureChains,
		connect,
		createClient,
		createStorage,
		disconnect,
		getProvider,
		InjectedConnector,
		watchAccount
	} from '@wagmi/core';
	import { publicProvider } from '@wagmi/core/providers/public';
	import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
	import { browser } from '$app/environment';
	import { Buffer } from 'buffer';
	import { currentAccount } from '../stores';
	import { safeStringify } from '../lib/helpers';
	import { arbitrum } from '@wagmi/core/chains';

	const { chains, provider, webSocketProvider } = configureChains([arbitrum], [publicProvider()]);

	const client = createClient({
		autoConnect: true,
		provider,
		webSocketProvider,
		storage: browser ? createStorage({ storage: window.localStorage }) : undefined,
		connectors: [
			new InjectedConnector({ chains }),
			new WalletConnectConnector({
				chains,
				options: {
					qrcode: true
				}
			})
		]
	});
	// $currentAccount = getAccount();
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
			chainId: 42161
		});
		console.log({ result });
		// $currentAccount = getAccount();
		// const ensName = await fetchEnsName({ address: result.account });
		// console.log({ result, ensName });
	}

	async function disconnectClient() {
		const result = await disconnect();
		console.log({ result });
		// $currentAccount = getAccount();
	}

	$: {
		watchAccount((account) => {
			$currentAccount = account;
		});
	}
</script>

<!-- {#if !$currentAccount?.address}
	{#if $currentAccount?.isConnecting}
		<p>Loading...</p>
	{:else if !$currentAccount?.isConnected}
		<button on:click={connectClient}> connect </button>
	{/if}
{:else}
	<button on:click={disconnectClient}> disconnect </button>
	<slot />
{/if} -->

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
