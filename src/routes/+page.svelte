<script lang="ts">
	import KinterCard from '$lib/components/kinter-card/kinter-card.svelte';
	import type { Kinter } from '$lib/interfaces';
	import { Sex } from '$lib/interfaces';

	const data: Kinter[] = [
		{
			id: '1',
			displayName: 'Hello world',
			biography: '',
			images: [],
			sex: Sex.female
		},
		{
			id: '2',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [],
			sex: Sex.male
		}
	];
</script>

<div class="relative w-96 h-[568px]">
	{#each data as item, i (item.id)}
		<div class="absolute inset-0" style="z-index: {data.length - i};">
			<KinterCard kinter={item} isRevealed={i === 0} />
		</div>
	{/each}
</div>
