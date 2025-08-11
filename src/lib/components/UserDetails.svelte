<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUserData } from '../api/user'; // adjust path if needed
  import type { UserData } from '../api/user';

  let user: UserData | null = null;
  let isLoading = true;

  onMount(async () => {
    user = await fetchUserData();
    isLoading = false;
  });
</script>

<style>
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>

<div class="flex overflow-hidden rounded-md gap-2">

  {#if isLoading}
    <p>Loading...</p>
  {:else if user}
    <img src="https://i.pravatar.cc/150?u=abcxyz" alt="User Avatar" class="avatar" />
    <div class="text-sm">
      <div class="font-semibold text-amber-100">{user.NAME}</div>
      <div class="text-white">{user.USERNAME}</div>
    </div>
  {:else}
    <p>User not found</p>
  {/if}
</div>
