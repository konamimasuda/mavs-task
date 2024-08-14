<!-- メモを削除する際に確認で表示するモーダル -->
<script setup lang="ts">
// モーダルの表示状態を親コンポーネントから受け取る
defineProps({
  visible: Boolean,
});

import { useUserStore } from "~/store/user";
import { DeleteArticleResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();

/**
 * メモの保存処理
 */
const onSubmit = async () => {
  try {
    // メモ削除APIを呼び出す -> /backend/src/routes/articles/articles.router.tsを参照
    const { data } = await useFetch<DeleteArticleResponse>(
      `${apiBaseUrl}/articles/deleteArticle`,
      {
        method: "DELETE",
        headers: {
          authorization: userStore.token,
        },
        body: {},
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    console.log("削除を押下した時に出るconsole.log:", response);
    // // トークンの有無でログインできたか判断
    // const hasToken = response && !!response.token;
    // if (hasToken) {
    //   // 成功の場合はトークンを保存
    //   userStore.token = response.token;
    //   userStore.email = response.email;
    //   // トップページに遷移
    //   $router.push("/");
    // } else {
    //   // 失敗の場合はフィールドをクリア
    //   email.value = "";
    //   password.value = "";
    // }
  } catch (error) {
    console.log("フロントのエラー", error);
  }
};

// ページのタイトルなどを設定
useHead({
  title: "memo app",
});
</script>

<template>
  <div class="modal" v-if="visible">
    <div class="modal__content">
      <p class="modal__message">メモを削除しますか？</p>
      <div class="modal__btnbox">
        <button class="modal__cancel" @click="$emit('cancel')">いいえ</button>
        <button class="modal__delete" @click="onSubmit">削除する</button>
      </div>
    </div>
  </div>
</template>
