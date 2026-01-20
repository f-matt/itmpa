<script lang="ts">
  interface task {
    description: string,
    dueDate: string,
    finished: boolean
  }

  const tasks: task[] = $state([
    { description: 'Token refresh', dueDate: '2025-01-31', finished: false },
    { description: 'Task list: list tasks', dueDate: '2025-01-31', finished: false },
    { description: 'Task list: new tasks', dueDate: '2025-01-31', finished: false },
    { description: 'Task list: finish task', dueDate: '2025-01-31', finished: false },
  ]);

  const selected: task[] = $state([]);

  function rowClick(t:task) {
    if (selected.includes(t)) {
      selected.splice(selected.indexOf(t), 1);
    } else {
      selected.push(t);
    }
  }
</script>

<div class="h3 text-center">Task List</div>

<div class="table-wrap">
	<table class="table caption-bottom">
		<tbody>
      {#each tasks as row}
        <tr class={selected.includes(row) ? 'bg-gray-300' : ''} onclick={() => rowClick(row)}>
          <td class="text-center">{row.description}</td>
          <td class="text-center">{row.dueDate}</td>
        </tr>
      {/each}
		</tbody>
	</table>
</div>
