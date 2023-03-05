<script lang="ts">
	import { currentAccount, curretChain } from '../stores';
</script>

{#if $currentAccount.isConnected}
	<p>Welcome {$currentAccount.address} @ {$curretChain.chain?.name}</p>
{/if}
