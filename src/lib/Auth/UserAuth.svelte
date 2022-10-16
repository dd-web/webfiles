<script>
	import { loginUser, registerUser } from '$root/stores/user';

	import LoginForm from './Login/LoginForm.svelte';
	import SignUpForm from './Register/SignUpForm.svelte';

	let loading = false;

	let loginForm = {};
	let signupForm = {};

	const clearForms = () => {
		loginForm = {};
		signupForm = {};
	};

	let action = 'login';

	/** Login handler */
	const handleLogin = async () => {
		loading = true;
		const { email, password } = loginForm;

		await loginUser(email, password)
			.then(() => {
				console.log('Logged in');
			})
			.catch((err) => {
				console.log('couldnt log in', err);
			})
			.finally(() => {
				loading = false;
			});
	};

	/** Registration handler */
	const handleRegister = async () => {
		loading = true;
		const { email, password } = signupForm;

		await registerUser(email, password)
			.then(() => {
				console.log('Registered');
			})
			.catch((err) => {
				console.log('couldnt register new user', err);
			})
			.finally(() => {
				loading = false;
			});
	};

	/** Changes action to login or register */
	const handleSwitchAction = () => {
		action = action === 'login' ? 'signup' : 'login';
		clearForms();
	};
</script>

{#if action === 'login'}
	<LoginForm bind:form={loginForm} {loading} submit={handleLogin} signup={handleSwitchAction} />
{:else if action === 'signup'}
	<SignUpForm bind:form={signupForm} {loading} submit={handleRegister} signin={handleSwitchAction} />
{:else}
	<p>Cannot determine authentication status. Please try again.</p>
{/if}
