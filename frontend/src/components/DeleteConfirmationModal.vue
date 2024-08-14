<!-- メモを削除する際に確認で表示するモーダル -->
<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { DeleteArticleResponse } from "~/types/api";
import { defineEmits, defineProps } from "vue";

// モーダルの表示状態を親コンポーネントから受け取る
defineProps({
  visible: Boolean,
});

// モーダルのイベント発火するための定義
const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "deleted"): void;
}>();

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
const route = useRoute();

// メモのIDを取得
let articleId = route.query.id;

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
        query: {
          article_id: articleId,
        },
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    // 削除に成功したらモーダルを消去する
    emit("deleted");
  } catch (error) {
    console.log(error);
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
