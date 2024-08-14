<!-- 保存済みメモの編集または削除画面 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "~/store/user";
import { UpdateArticleResponse, GetArticleResponse } from "~/types/api";
import { useFetch } from "#app";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal.vue";
import SnackbarSuccess from "~/components/SnackbarSuccess.vue";
import SnackbarFailure from "~/components/SnackbarFailure.vue";

// モーダルの表示状態を管理する
const showModal = ref(false);
// モーダルを開く関数
const openDeleteConfirmationModal = () => {
  showModal.value = true;
};
// モーダルを閉じる関数
const closeDeleteConfirmationModal = () => {
  showModal.value = false;
};

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
const route = useRoute();
const memoId = route.params.id as string;

/**
 * メモの保存処理
 */
const onSubmit = async () => {
  try {
    // メモ更新保存APIを呼び出す -> /backend/src/routes/articles/articles.router.tsを参照
    const { data } = await useFetch<UpdateArticleResponse>(
      `${apiBaseUrl}/articles/updateArticle`,
      {
        method: "POST",
        headers: {
          authorization: userStore.token,
        },
        body: {},
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    console.log("編集登録保存を押下した時に出るconsole.log:", response);
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
  <div>
    <form class="memo" action="">
      <input class="memo__input" type="text" name="title" placeholder="無題" />
      <textarea
        class="memo__textarea"
        name="contents"
        id=""
        placeholder="文字を入力する"
      ></textarea>
      <div class="memo__btnbox">
        <button class="memo__btn" type="button" @click="onSubmit">
          メモを保存する
        </button>
        <button
          class="memo__delete"
          type="button"
          @click="openDeleteConfirmationModal"
        >
          メモを削除する
        </button>
      </div>
    </form>

    <DeleteConfirmationModal
      :visible="showModal"
      @cancel="closeDeleteConfirmationModal"
    />

    <SnackbarSuccess />
    <SnackbarFailure />
  </div>
</template>
