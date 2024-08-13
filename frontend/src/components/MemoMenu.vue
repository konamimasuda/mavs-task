<!-- メモの一覧を表示するコンポーネント -->
<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { Articles, GetArticleListResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
const articles = ref<Articles[]>([]);

const fetchArticles = async () => {
  try {
    const { data, error } = await useFetch<GetArticleListResponse>(
      `${apiBaseUrl}/articles/getArticleList`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userStore.token,
        },
      }
    );
    articles.value = data.value?.articles || [];
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  if (userStore.isLoggedIn) {
    fetchArticles();
  }
});
</script>

<template>
  <div v-if="userStore.isLoggedIn" class="menu">
    <p class="menu__create">
      <NuxtLink to="/">新しくメモを作成する</NuxtLink>
    </p>
    <p class="menu__ttl">メモ一覧</p>
    <!-- TODO:メモが16件以上ある場合に省略する実装は後ほど -->
    <ul class="menu__ul">
      <li class="menu__li" v-for="article in articles" :key="article.id">
        <NuxtLink :to="`/articles/${article.id}`" class="menu__link">{{
          article.title
        }}</NuxtLink>
      </li>

      <!-- <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li>
      <li class="menu__li">
        <NuxtLink to="/detail" class="menu__link">メモのタイトル</NuxtLink>
      </li> -->
    </ul>
    <button class="menu__logout" type="button" @click="userStore.logout()">
      ログアウト
    </button>
  </div>
</template>
