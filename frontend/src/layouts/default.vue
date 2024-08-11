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
  <div class="layout">
    <AppHeader>
      <MemoMenu />
    </AppHeader>
    <main>
      <slot />
    </main>
  </div>
</template>
