<script lang="ts">
	import { currentAccount } from '../stores';
</script>

{#if $currentAccount.isConnected}
	<p>Welcome {$currentAccount.address}</p>
{/if}
