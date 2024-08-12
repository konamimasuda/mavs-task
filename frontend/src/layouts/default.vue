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
    <AppHeader
      class="app__header"
      :class="{ app__border: userStore.isLoggedIn }"
    >
      <MemoMenu />
    </AppHeader>
    <main :class="{ app__main: userStore.isLoggedIn }">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 17vw;
    height: 100vh;
    background-color: $colorWhite;
  }
  &__border {
    border-right: 1px solid $colorBlueOpacity;
  }
  &__main {
    padding-left: 17vw;
  }
}
</style>
