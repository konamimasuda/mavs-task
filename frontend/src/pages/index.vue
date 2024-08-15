<!-- メモの新規作成画面 -->
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useArticleStore } from "~/store/article";
import { useUserStore } from "~/store/user";
import { CreateArticleResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// スナックバー関連
const showSuccessSnackbar = ref(false);
const showFailureSnackbar = ref(false);
const snackbarMessage = ref("");

const articleStore = useArticleStore();

// フォームの設定
const { handleSubmit, isSubmitting, resetForm, errors } = useForm({
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
const { value: title } = useField<string>("title");
const { value: content } = useField<string>("content");
const { value: author_id } = useField<number>("author_id");

/**
 * メモの保存処理
 */
const onSubmit = handleSubmit(async () => {
  try {
    // メモ新規作成APIを呼び出す -> /backend/src/routes/articles/articles.router.tsを参照
    const { data } = await useFetch<CreateArticleResponse>(
      `${apiBaseUrl}/articles/createArticle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userStore.token,
        },
        body: {
          title: title.value,
          content: content.value,
          author_id: 1, //後ほど修正する
        },
      }
    );

    // 保存後、メモ一覧表示に反映させる
    await articleStore.fetchArticles(apiBaseUrl, userStore.token);

    // 保存に成功したら、入力フォームをクリアして成功のsnackbarを表示する
    resetForm();
    showSuccessSnackbar.value = true;
    snackbarMessage.value = "保存に成功しました";
    // 3秒後に自動でsnackbarを削除する
    setTimeout(() => {
      showSuccessSnackbar.value = false;
    }, 3000);
  } catch (error) {
    console.log(error);

    // 保存に失敗した場合、失敗のsnackbarを表示する
    showFailureSnackbar.value = true;
    snackbarMessage.value = "保存に失敗しました";
    // 3秒後に自動でsnackbarを削除する
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
  <div class="memo">
    <form class="memo__form" @submit="onSubmit">
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
      <button class="memo__btn" type="submit" :disabled="isSubmitting">
        メモを保存する
      </button>
      <div class="memo__errorbox">
        <p v-if="errors.title" class="memo__error">{{ errors.title }}</p>
        <p v-if="errors.content" class="memo__error">{{ errors.content }}</p>
      </div>
    </form>
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
