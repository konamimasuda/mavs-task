<script setup lang="ts">
import { useUserStore } from "~/store/user";

// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();
$router.push("/");

// ログイン状態でない時はサインイン画面に転送する
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
