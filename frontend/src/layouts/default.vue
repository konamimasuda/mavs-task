<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();

// 転送処理を行うためのフック
const $router = useRouter();
$router.push("/");

// ログイン状態でない時はサインイン画面に転送する
// TODO:ページ更新しないと転送されない問題は、繋ぎこみ作業時に修正する
if (!userStore.isLoggedIn) {
  $router.push("/signin");
}
</script>

<template>
  <div>
    <AppHeader class="header">
      <MemoMenu />
    </AppHeader>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 16%;
  height: 100vh;
}
</style>
