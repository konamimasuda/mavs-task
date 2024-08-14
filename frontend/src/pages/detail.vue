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
import { useField, useForm } from "vee-validate";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// メモのIDを取得
const route = useRoute();
let articleId = route.query.id;
// モーダル関連
const showModal = ref(false);
const openDeleteConfirmationModal = () => {
  showModal.value = true;
};
const closeDeleteConfirmationModal = () => {
  showModal.value = false;
};
const deletionSuccess = () => {
  closeDeleteConfirmationModal();
};
// スナックバーの表示状態を管理するための変数
const showSuccessSnackbar = ref(false);
const showFailureSnackbar = ref(false);
const snackbarMessage = ref("");

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
// フォームの設定
const { handleSubmit, isSubmitting, errors } = useForm({
  // バリデーションルール
  validationSchema: {
    title(value: string) {
      // 必須
      if (!value) {
        return "タイトルを入力してください";
      }
      return true;
    },
    content(value: string) {
      if (!value) {
        return "本文を入力してください";
      }
      return true;
    },
  },
});

// フィールドの値とエラーメッセージを取得
const { value: title, errorMessage: titleErrorMessage } = useField<string>(
  "title",
  {
    // 初回読み込み時はバリデーションチェックせず、入力内容が変わった時に確認する
    validateOnMount: false,
    validateOnChange: true,
  }
);
const { value: content, errorMessage: contentErrorMessage } = useField<string>(
  "content",
  {
    validateOnMount: false,
    validateOnChange: true,
  }
);

const onSubmit = handleSubmit(async () => {
  try {
    // メモ更新保存APIを呼び出す -> /backend/src/routes/articles/articles.router.tsを参照
    const { data } = await useFetch<UpdateArticleResponse>(
      `${apiBaseUrl}/articles/updateArticle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userStore.token,
        },
        body: {
          article_id: articleId,
          title: title.value,
          content: content.value,
          updated_at: new Date(),
        },
      }
    );

    // 保存に成功した場合、成功のsnackbarを表示する
    showSuccessSnackbar.value = true;
    snackbarMessage.value = "保存に成功しました";
    // 3秒後に自動でsnackbarの表示を削除する
    setTimeout(() => {
      showSuccessSnackbar.value = false;
    }, 3000);
  } catch (error) {
    console.log(error);

    // 保存に失敗した場合、失敗のsnackbarを表示する
    showFailureSnackbar.value = true;
    snackbarMessage.value = "保存に失敗しました";
    // 3秒後に自動でsnackbarの表示を削除する
    setTimeout(() => {
      showFailureSnackbar.value = false;
    }, 3000);
  }
});

// ページのタイトルなどを設定
useHead({
  title: "memo app",
});
</script>

<template>
  <div>
    <form class="memo" @submit="onSubmit">
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
        <button class="memo__btn" type="submit" :disabled="isSubmitting">
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
      <div class="memo__errorbox">
        <p v-if="titleErrorMessage" class="memo__error">
          {{ titleErrorMessage }}
        </p>
        <p v-if="contentErrorMessage" class="memo__error">
          {{ contentErrorMessage }}
        </p>
      </div>
    </form>

    <DeleteConfirmationModal
      :visible="showModal"
      @cancel="closeDeleteConfirmationModal"
      @deleted="deletionSuccess"
    />
    <SnackbarSuccess
      v-if="showSuccessSnackbar"
      :message="snackbarMessage"
      @close="showSuccessSnackbar = false"
    />
    <SnackbarFailure
      v-if="showFailureSnackbar"
      :message="snackbarMessage"
      @close="showFailureSnackbar = false"
    />
  </div>
</template>
