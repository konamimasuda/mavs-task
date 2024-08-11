<!-- メモの一覧を表示するコンポーネント -->
<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.isLoggedIn">
    <NuxtLink to="/create">新しくメモを作成する</NuxtLink>
    <p>メモ一覧</p>
    <ul>
      <li>
        <NuxtLink to="/detail">メモのタイトル</NuxtLink>
      </li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
      <li>メモのタイトル</li>
    </ul>
    <button type="button" @click="userStore.logout()">ログアウト</button>
  </div>
</template>
