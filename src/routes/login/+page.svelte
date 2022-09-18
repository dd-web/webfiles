<script>
	let loading = false;
	let email = '';
	let password = '';
</script>

<div>
	<form class="bg-neutral-800 border-4 border-zinc-600 rounded-md flex flex-col p-4 max-w-xs mx-auto">
		<p class="text-3xl py-8 font-bold text-center">Login</p>
		<!-- email -->
		<div class="flex flex-col">
			<label for="email">Email</label>
			<input type="text" name="email" id="email" />
		</div>
		<!-- password -->
		<div class="flex flex-col mt-4">
			<label for="pword">Password</label>
			<input type="password" name="pword" id="pword" />
		</div>
		<!-- buttons  -->
		<div class="flex justify-between items-center px-2 mt-12">
			<button class="bg-blue-600 border-blue-800">Login</button>
			<button class="bg-red-600 border-red-800">Cancel</button>
		</div>
	</form>
</div>

<style>
	form > div > input {
		@apply mt-2 py-1 px-2;
	}

	form > div > button {
		@apply px-6 py-2 border-2 opacity-75  block w-auto font-bold rounded-md transition-all;
		@apply active:scale-95 active:opacity-50;
		@apply hover:opacity-100;
	}
</style>
