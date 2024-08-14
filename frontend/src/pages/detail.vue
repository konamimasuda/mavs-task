<!-- 保存済みメモの編集または削除画面 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/store/user";
import { UpdateArticleResponse, GetArticleResponse } from "~/types/api";
import { useFetch } from "#app";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal.vue";
import SnackbarSuccess from "~/components/SnackbarSuccess.vue";
import SnackbarFailure from "~/components/SnackbarFailure.vue";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
const route = useRoute();
// メモのIDを取得
let articleId = route.query.id;
const title = ref("");
const content = ref("");

// モーダル関連
const showModal = ref(false);
const openDeleteConfirmationModal = () => {
  showModal.value = true;
};
const closeDeleteConfirmationModal = () => {
  showModal.value = false;
};

/**
 * メモの詳細情報表示処理
 */
const fetchArticleDetail = async () => {
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
    if (response) {
      title.value = response.article.title;
      content.value = response.article.content;
    }
  } catch (error) {
    console.log(error);
  }
};

// ページのマウント時にメモの詳細情報を取得
onMounted(() => {
  fetchArticleDetail();
});

// メモのIDの変化をウォッチし、IDに合わせた詳細を取得する
watch(
  () => route.query.id,
  (newArticleId) => {
    articleId = newArticleId;
    fetchArticleDetail();
  }
);

/**
 * メモの更新保存処理
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
      <input
        v-model="title"
        class="memo__input"
        type="text"
        name="title"
        placeholder="無題"
      />
      <textarea
        v-model="content"
        class="memo__textarea"
        name="content"
        id="content"
        placeholder="文字を入力する"
      >
      </textarea>
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
