<!-- メモの一覧を表示するコンポーネント -->
<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.isLoggedIn" class="menu">
    <p class="menu__create">
      <NuxtLink to="/create">新しくメモを作成する</NuxtLink>
    </p>
    <p class="menu__ttl">メモ一覧</p>
    <!-- TODO:メモが16件以上ある場合に省略する実装は後ほど -->
    <ul class="menu__ul">
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link"
          >メモのタイトルが長い時は省略して表示する</NuxtLink
        >
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
    </ul>
    <button class="menu__logout" type="button" @click="userStore.logout()">
      ログアウト
    </button>
  </div>
</template>
