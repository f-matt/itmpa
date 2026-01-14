<script lang="ts">
	import { goto } from "$app/navigation";
	import { toaster } from "$lib/stores/toast";

  let username = $state("");
  let password = $state("");

  async function login() {
		let result = null;

		try {
    	const response = await fetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({username, password}),
				headers: {
					"Content-Type": "application/json"
				}
			});

			result = await response.json();
			if (!response.ok) {
				toaster.error({
					title: "Error",
					description: result["detail"]
				});

				return;
			}

			localStorage.setItem("itmpaToken", JSON.stringify(result));
			goto("/home");
		} catch (error) {
			toaster.error({
				title: "Error",
				description: "Error authenticating user."
			});
		}
	}
</script>

<h1>Please provide your credentials</h1>

<form class="w-full max-w-md space-y-4 p-4">
	<fieldset class="space-y-4">
		<!-- Input -->
		<label class="label">
			<span class="label-text">Username</span>
			<input class="input" type="text" placeholder="Username" bind:value={username} />
		</label>

		<!-- Input -->
		<label class="label">
			<span class="label-text">Password</span>
			<input class="input" type="password" placeholder="Password" bind:value={password} />
		</label>
        </fieldset>
        <fieldset class="flex justify-end">
		<!-- Button -->
		<button type="button" class="btn preset-outlined-surface-300-700" onclick={login}>Login</button>
	</fieldset>
</form>
