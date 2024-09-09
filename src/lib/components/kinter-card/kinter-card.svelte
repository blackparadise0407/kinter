<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { Action, type Kinter } from '$lib/interfaces';
	import { absVec2, clamp, degToRad, fromVec2, mulVec2, type Vector2 } from '$lib/utils';
	import type { MouseEventHandler } from 'svelte/elements';

	export let kinter: Kinter;
	export let isRevealed = false;

	const dispatch = createEventDispatcher<{
		action: {
			kinter: Kinter;
			action: Action;
		};
	}>();
	let currentImgIdx = 0;
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
		y = 0,
		imgClickStart = 0;
	const ANGLE_THRESHOLD = degToRad(10);
	const VERTICAL_THRESHOLD = -100;
	let action: Action | undefined;

	const handleDrag = (e: MouseEvent) => {
		if (!isDragging) {
			return;
		}
		const { clientX, clientY } = e;
		const vec1: Vector2 = [1, 0];
		const vec2: Vector2 = [clientX - offsetX, clientY - offsetY];
		const theta = mulVec2(vec1, vec2) / (absVec2(vec1) * absVec2(vec2));
		const dir = Math.sign(clientX - offsetX);
		const angle = Math.abs(Math.PI / 2 - Math.acos(theta));

		rot = dir * clamp(angle, 0, 0.7);
		[x, y] = fromVec2([originX, originY], [clientX, clientY]);
		x *= 0.02;
		if (angle > ANGLE_THRESHOLD) {
			if (dir > 0 && action !== Action.like) {
				action = Action.like;
			} else if (dir < 0 && action !== Action.skip) {
				action = Action.skip;
			}
		} else if (y < VERTICAL_THRESHOLD) {
			action = Action.superLike;
		} else if (action != undefined) {
			action = undefined;
		}
	};

	const handleDragOver = (e: DragEvent) => {
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}
	};

	const handleDragStart = (e: DragEvent) => {
		if (e.dataTransfer) {
			e.dataTransfer.setDragImage(new Image(), 0, 0);
		}
		isDragging = true;
		document.body.style.cursor = 'none';
	};

	const handleDragEnd = () => {
		isDragging = false;
		document.body.style.cursor = 'initial';
		if (action == undefined) {
			action = undefined;
			rot = 0;
			x = 0;
			y = 0;
			return;
		}
		handleDispatchAction(action);
	};

	const handleDispatchAction = (action: Action) => {
		dispatch('action', {
			action,
			kinter
		});
	};

	onMount(() => {
		const { right, width, height, bottom } = ref.getBoundingClientRect();
		originY = bottom - height / 2;
		offsetX = originX = right - width / 2;
		offsetY = originY + OFFSET;
		offsetTop = height + OFFSET;
	});

	const handleChangeImg: MouseEventHandler<HTMLElement> = (e) => {
		if (Date.now() - imgClickStart > 100) {
			return;
		}
		const { width, right } = (e.target as HTMLElement).getBoundingClientRect();
		const middle = right - width / 2;
		const next = e.clientX > middle ? 1 : +kinter.images.length - 1;
		currentImgIdx = (currentImgIdx + next) % kinter.images.length;
	};

	const handleImgMouseDown = () => {
		imgClickStart = Date.now();
	};

	$: isLike = action === Action.like;
	$: isSkip = action === Action.skip;
	$: isSuperLike = action === Action.superLike;
</script>

<article
	bind:this={ref}
	class="card card-compact bg-base-100 w-96 h-[568px] border cursor-pointer will-change-transform transform-gpu overflow-hidden"
	draggable="true"
	on:dragover|preventDefault={handleDragOver}
	on:drag={handleDrag}
	on:dragstart={handleDragStart}
	on:dragend={handleDragEnd}
	style="transform: rotate({rot}rad) translate({x}px, {y}px); transform-origin: center {offsetTop}px;"
>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div class="relative overflow-hidden px-5 pt-5 grow">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<figure
			class="relative h-full rounded-xl"
			on:mousedown={handleImgMouseDown}
			on:click={handleChangeImg}
		>
			<div class="absolute flex gap-1 top-2 left-2 right-2 z-[1]">
				{#each kinter.images as _, i (i)}
					<div class="h-1 grow bg-white rounded" class:bg-opacity-40={i !== currentImgIdx}></div>
				{/each}
			</div>
			<img
				class:blur-xl={!isRevealed}
				draggable="false"
				class="w-full object-cover transition-[-webkit-filter] delay-100 h-full"
				src={kinter.images[currentImgIdx]}
				alt=""
			/>
		</figure>
		<div class="absolute text-white bottom-0 left-0 px-8 pb-2" class:blur-xl={!isRevealed}>
			<h2 class="card-title">{kinter.id} {kinter.displayName}</h2>
			<p class="line-clamp-2">{kinter.biography}</p>
		</div>
	</div>
	<div class="card-body !grow-0">
		<div class="card-actions justify-center">
			<button
				class="btn btn-circle skip-btn action-btn"
				class:is-skip={isSkip}
				class:action-btn-active={isSkip}
				on:click={() => handleDispatchAction(Action.skip)}
			>
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
			<button
				class="btn btn-circle super-like-btn action-btn"
				class:is-super-like={isSuperLike}
				class:action-btn-active={isSuperLike}
				on:click={() => handleDispatchAction(Action.superLike)}
			>
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
			<button
				class="btn btn-circle like-btn action-btn"
				class:is-like={isLike}
				class:action-btn-active={isLike}
				on:click={() => handleDispatchAction(Action.like)}
			>
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
	.is-like,
	.like-btn:hover {
		@apply btn-error;
	}

	.is-skip,
	.skip-btn:hover {
		@apply btn-warning;
	}

	.is-super-like,
	.super-like-btn:hover {
		@apply btn-info;
	}

	.action-btn-active {
		@apply animate-bounce;
	}

	.action-btn-active svg,
	.action-btn:hover svg {
		@apply animate-pulse fill-white stroke-white;
	}
</style>
