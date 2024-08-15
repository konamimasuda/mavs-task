<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const router = useRouter();

// ログアウトボタン押下でログアウト処理をし、サインイン画面に遷移する
const handleLogout = () => {
  userStore.logout();
  router.push("/signin");
};
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <h1 class="header__ttl">memo app</h1>
    <slot />
    <button
      class="header__logout"
      type="button"
      @click="handleLogout"
      v-if="userStore.isLoggedIn"
    >
      ログアウト
    </button>
  </header>
</template>
