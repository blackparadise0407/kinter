<script>
	import KinterCard from '$lib/components/kinter-card/kinter-card.svelte';
	import { Sex } from '$lib/interfaces';
</script>

<KinterCard
	kinter={{
		id: '1',
		biography:
			'lorem ipsum dolor sit amet, consectetur adip occum nost rut, sed do eiusmod tempor incididunt ut labore',
		displayName: 'sexy tappy',
		images: [],
		sex: Sex.male
	}}
/>
