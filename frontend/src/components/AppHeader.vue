<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <h1>
      <NuxtLink to="/">memo app</NuxtLink>
    </h1>
    <NuxtLink to="/create">新しくメモを作成する</NuxtLink>
    <slot v-if="userStore.isLoggedIn" />
    <button
      type="button"
      @click="userStore.logout()"
      v-if="userStore.isLoggedIn"
    >
      ログアウト
    </button>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
