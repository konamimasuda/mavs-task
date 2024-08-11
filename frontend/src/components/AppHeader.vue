<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="">
    <h1>
      <NuxtLink to="/">memo app</NuxtLink>
    </h1>
    <slot />
  </header>
</template>
