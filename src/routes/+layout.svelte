<script>
	import '../app.css';
</script>

<!-- <div class="drawer drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content overflow-hidden">
		
	</div>
	<div class="drawer-side !w-96 bg-base-300">
		<div class="navbar bg-primary">
			<div class="flex-none gap-2">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							/>
						</div>
					</div>
					<ul
						class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a class="justify-between" href="/profile">Profile</a>
						</li>
						<li><a href="/auth/signout">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div> -->
<main class="h-screen grid place-content-center overflow-hidden" on:dragover|preventDefault>
	<slot />
</main>
