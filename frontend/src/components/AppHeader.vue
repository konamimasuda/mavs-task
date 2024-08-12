<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <h1 class="header__ttl">
      <NuxtLink to="/">memo app</NuxtLink>
    </h1>
    <slot />
  </header>
</template>
