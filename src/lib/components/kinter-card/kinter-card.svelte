<script lang="ts">
	import { onMount } from 'svelte';

	import { Action, type Kinter } from '$lib/interfaces';
	import { absVec2, degToRad, mulVec2, scalarVec2, type Vector2 } from '$lib/utils';

	export let kinter: Kinter;
	export let isRevealed = false;

	let ref: HTMLElement;
	let isDragging = false;
	const OFFSET = 500;
	let offsetX = 0,
		offsetY = 0,
		originX = 0,
		originY = 0,
		rot = 0,
		offsetTop = 0,
		x = 0,
		y = 0;
	const THRESHOLD = degToRad(10);
	let action: Action | undefined;

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			const { clientX, clientY } = e;
			const vec1: Vector2 = [1, 0];
			const vec2: Vector2 = [clientX - offsetX, clientY - offsetY];
			const theta = mulVec2(vec1, vec2) / (absVec2(vec1) * absVec2(vec2));
			const dir = Math.sign(clientX - offsetX);
			const angle = Math.abs(Math.PI / 2 - Math.acos(theta));
			if (angle > THRESHOLD) {
				if (dir > 0 && action !== Action.like) {
					action = Action.like;
				} else if (dir < 0 && action !== Action.skip) {
					action = Action.skip;
				}
			} else if (action != undefined) {
				action = undefined;
			}

			rot = dir * angle;
			const vec3: Vector2 = [clientX - originX, clientY - originY];
			[x, y] = scalarVec2(vec3, absVec2(vec3) * 0.0009);
		}
	};

	const handleMouseDown = () => {
		isDragging = true;
		document.body.style.cursor = 'none';
	};

	const handleMouseUp = () => {
		document.body.style.cursor = 'initial';
		isDragging = false;
		rot = 0;
		x = 0;
		y = 0;
		action = undefined;
	};

	onMount(() => {
		const { right, width, height, bottom } = ref.getBoundingClientRect();
		originY = bottom - height / 2;
		offsetX = originX = right - width / 2;
		offsetY = originY + OFFSET;
		offsetTop = height + OFFSET;
	});

	const drag = (node: HTMLElement) => {
		document.addEventListener('mousemove', handleMouseMove);
		node.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return {
			destroy() {
				document.removeEventListener('mousemove', handleMouseMove);
				node.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mouseup', handleMouseUp);
			}
		};
	};

	$: isLike = action === Action.like;
	$: isSkip = action === Action.skip;
</script>

<article
	use:drag
	bind:this={ref}
	class="card card-compact bg-base-100 w-96 h-[568px] shadow cursor-pointer will-change-transform transform-gpu"
	draggable="false"
	class:shadow-xl={isDragging}
	style="transform: rotate({rot}rad) translate({x}px, {y}px); transform-origin: center {offsetTop}px;"
>
	<div class="relative overflow-hidden px-5 pt-5 grow" class:blur-xl={!isRevealed}>
		<figure class="h-full">
			<img
				draggable="false"
				class="rounded-xl object-cover h-full"
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
			/>
		</figure>
		<div class="absolute text-white bottom-0 left-0 px-8 pb-2">
			<h2 class="card-title">{kinter.id} {kinter.displayName}</h2>
			<p>{kinter.biography}</p>
		</div>
	</div>
	<div class="card-body !grow-0">
		<div class="card-actions justify-center">
			<button class="btn btn-circle" class:is-skip={isSkip}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
			<button class="btn btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
					/>
				</svg>
			</button>
			<button class="btn btn-circle" class:is-like={isLike}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
					/>
				</svg>
			</button>
		</div>
	</div>
</article>

<style>
	.is-like {
		@apply btn-error animate-bounce;
	}

	.is-like svg {
		@apply animate-pulse fill-white stroke-white;
	}

	.is-skip {
		@apply btn-warning animate-bounce;
	}

	.is-skip svg {
		@apply animate-pulse fill-white stroke-white;
	}

	.is-super-like {
		@apply btn-info animate-bounce;
	}
</style>
