import { writable, type Writable } from 'svelte/store';
import type { GetAccountResult, Provider } from '@wagmi/core';

export const currentAccount: Writable<GetAccountResult<Provider>> = writable();
