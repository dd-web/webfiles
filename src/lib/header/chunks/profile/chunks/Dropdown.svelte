<script>
	import { clickOutside } from '$lib/custom_actions';
	import { slide } from 'svelte/transition';
	import { signOutUser } from '$stores/user';
	import { spring } from 'svelte/motion';

	export let visible = false;

	const handleOutClick = () => {
		visible = false;
	};

	const handleLogout = async () => {
		await signOutUser().then(() => {
			console.log('user logged out');
		});
	};
</script>

{#if visible}
	<ul use:clickOutside on:outclick={handleOutClick} transition:slide|local={{ duration: 150 }}>
		<li>
			<button>Profile</button>
		</li>
		<li>
			<button>Settings</button>
		</li>
		<li>
			<button on:click={handleLogout}>Logout</button>
		</li>
		<!-- <div class=" py-2 w-1 translate-y-4 mr-2 sha bg-red-500 rounded-md absolute top-0 right-0 origin-bottom-right" /> -->
	</ul>
{/if}

<style lang="postcss">
	ul {
		@apply bg-zinc-900 p-1 absolute right-4 top-16 rounded-md;

		li {
			@apply py-2 hover:bg-zinc-200 hover:bg-opacity-5 rounded-md;

			button {
				@apply border-r-2 border-transparent mr-2;
				@apply px-4  w-full;
			}
		}
	}
</style>
