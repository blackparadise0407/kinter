import { writable } from 'svelte/store';

export const documentEvents = writable<Partial<Record<keyof DocumentEventMap, boolean>>>({});
