<!-- メモの一覧を表示するコンポーネント -->
<script setup lang="ts">
import { useUserStore } from "~/store/user";
import {
  Articles,
  GetArticleListResponse,
  GetArticleResponse,
} from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
const articles = ref<Articles[]>([]);

const fetchArticles = async () => {
  try {
    const { data } = await useFetch<GetArticleListResponse>(
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

// ログイン状態の変化をウォッチし、一覧を取得する
watch(
  () => userStore.isLoggedIn,
  (newValue) => {
    if (newValue) {
      fetchArticles();
    }
  }
);

// ログイン状態だったら一覧を表示する
onMounted(() => {
  if (userStore.isLoggedIn) {
    fetchArticles();
  }
});

// メモのタイトル押下で、そのメモのIDをクエリパラメータで送る
const onSubmit = async (articleId: number) => {
  try {
    const { data } = await useFetch<GetArticleResponse>(
      `${apiBaseUrl}/articles/getArticle`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userStore.token,
        },
        query: {
          article_id: articleId,
        },
      }
    );

    const response = data.value;
  } catch (error) {
    console.log(error);
  }
};
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
        <NuxtLink
          :to="`/detail?id=${article.id}`"
          class="menu__link"
          @click="onSubmit(article.id)"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
