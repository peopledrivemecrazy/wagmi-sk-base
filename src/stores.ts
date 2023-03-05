import { writable, type Writable } from 'svelte/store';
import type { GetAccountResult, Provider, GetNetworkResult } from '@wagmi/core';

export const currentAccount: Writable<GetAccountResult<Provider>> = writable();
export const curretChain: Writable<GetNetworkResult> = writable();
