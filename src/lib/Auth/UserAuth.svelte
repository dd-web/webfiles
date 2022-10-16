<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { loginUser, registerUser } from '$root/stores/user';

	import LoginForm from './Login/LoginForm.svelte';
	import SignUpForm from './Register/SignUpForm.svelte';

	let loading = false;

	let form = {};
	let endpointFn = loginUser;
	let actionComponent = LoginForm;

	const handleSubmit = async () => {
		loading = true;
		const { email, password } = form;

		await endpointFn(email, password)
			.then(() => {
				console.log(operation + ' complete');
			})
			.catch((err) => {
				console.log('couldnt complete operation', err);
			})
			.finally(() => {
				loading = false;
			});
	};

	/**
	 * updates state to either either component config
	 */
	const toRegisterComponent = () => {
		form = {};
		endpointFn = registerUser;
		actionComponent = SignUpForm;
	};

	const toLoginComponent = () => {
		form = {};
		endpointFn = loginUser;
		actionComponent = LoginForm;
	};
</script>

<svelte:component
	this={actionComponent}
	bind:form
	on:cancel={() => dispatch('close')}
	{loading}
	submit={handleSubmit}
	signup={toRegisterComponent}
	signin={toLoginComponent}
/>
