<script lang="ts">
	import { fly } from 'svelte/transition';

	import KinterCard from '$lib/components/kinter-card/kinter-card.svelte';
	import { Action, Sex, type Kinter } from '$lib/interfaces';

	let data: Kinter[] = [
		{
			id: '1',
			displayName: 'Hello world',
			biography: '',
			images: [
				'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
			],
			sex: Sex.female
		},
		{
			id: '2',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [
				'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
			],
			sex: Sex.male
		},
		{
			id: '3',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [],
			sex: Sex.male
		},
		{
			id: '4',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [],
			sex: Sex.male
		},
		{
			id: '5',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [],
			sex: Sex.male
		},
		{
			id: '6',
			biography:
				'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
			displayName: 'sexy tappy',
			images: [],
			sex: Sex.male
		}
	];

	const handleAction = ({ detail }: CustomEvent) => {
		data = data.filter((it) => it.id !== detail.kinter.id);
		switch (detail.action) {
			case Action.like:
				break;
		}
	};
</script>

<div class="grid h-screen place-content-center">
	<div class="relative w-96 h-[568px]">
		{#each data as item, i (item.id)}
			<div
				class="absolute inset-0"
				style="z-index: {data.length - i};"
				out:fly={{ opacity: 0, y: -100 }}
			>
				<KinterCard kinter={item} isRevealed={i === 0} on:action={handleAction} />
			</div>
		{/each}
	</div>
</div>
