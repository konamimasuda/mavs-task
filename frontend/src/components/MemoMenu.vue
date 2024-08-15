<!-- メモの一覧を表示するコンポーネント -->
<script setup lang="ts">
import { useArticleStore } from "~/store/article";
import { useUserStore } from "~/store/user";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// メモのストアを取得
const articleStore = useArticleStore();

// ログイン状態の変化をウォッチし、一覧を取得する
watch(
  () => userStore.isLoggedIn,
  (newValue) => {
    if (newValue) {
      articleStore.fetchArticles(apiBaseUrl, userStore.token);
    }
  }
);

// ログイン状態だったら一覧を表示する
onMounted(() => {
  if (userStore.isLoggedIn) {
    articleStore.fetchArticles(apiBaseUrl, userStore.token);
  }
});

// メモのタイトル押下で、そのメモのIDをクエリパラメータで送る
const onSubmit = async (articleId: number) => {
  try {
    await articleStore.fetchArticleDetail(
      apiBaseUrl,
      userStore.token,
      articleId
    );
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
    <ul class="menu__ul">
      <li
        class="menu__li"
        v-for="article in articleStore.getArticleList"
        :key="article.id"
      >
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
