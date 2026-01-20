<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Menu, Portal, Toast } from '@skeletonlabs/skeleton-svelte';
	import { toaster } from '$lib/stores/toast';
	import { LogOutIcon } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { MenuIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();

	function logout() {
		localStorage.removeItem("itmpaToken");
		goto("/login");
	}

	function handleMenu(x:any) {
		switch (x.value) {
			case "tasks":
				goto("/tasks");
				break;
			default:
				goto("/home");
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<Menu onSelect={handleMenu}>
					<Menu.Trigger>
						<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Menu.Item value="tasks">
									<Menu.ItemText>Tasks</Menu.ItemText>
								</Menu.Item>
								<Menu.Item value="open">
									<Menu.ItemText>Open File</Menu.ItemText>
								</Menu.Item>
								<Menu.Separator />
								<Menu.Item value="save">
									<Menu.ItemText>Save</Menu.ItemText>
								</Menu.Item>
								<Menu.Item value="export">
									<Menu.ItemText>Export</Menu.ItemText>
								</Menu.Item>
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu>
			</AppBar.Lead>
			<AppBar.Headline>
				<p class="text-2xl">IT Manager Personal Assistant</p>
			</AppBar.Headline>
			<AppBar.Trail>
				<button type="button" class="btn-icon hover:preset-tonal"><LogOutIcon  class="size-6" onclick={logout} /></button>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]" style="min-height:80vh">
		<!-- Main Content -->
		<main class="space-y-4 p-4">
			<div style="display: contents">{@render children()}</div>
		</main>
	</div>


	<Toast.Group {toaster}>
		{#snippet children(toast)}
			<Toast {toast}>
				<Toast.Message>
					<Toast.Title>{toast.title}</Toast.Title>
					<Toast.Description>{toast.description}</Toast.Description>
				</Toast.Message>
				<Toast.CloseTrigger />
			</Toast>
		{/snippet}
	</Toast.Group>

	<footer class="bg-gray-200 p-4">2026 | fmatt-dev</footer>
</div>
