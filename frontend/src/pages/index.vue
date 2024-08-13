<!-- メモの新規作成画面 -->
<script setup lang="ts">
import { defineRule, useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { CreateArticleResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// タイトルまたはコンテンツのどちらかが入力されているかを確認するカスタムバリデーションを作成
defineRule("atLeastOneRequired", (_value, _, ctx) => {
  // フォーム全体の値にアクセスして、titleかcontentのいずれかが入力されているかを確認する
  const { title, content } = ctx.form;

  // どちらかが入力されていればOK
  if (title || content) {
    return true;
  }
  // 両方空の場合に下記のエラーメッセージを表示する
  return "タイトルまたはコンテンツのどちらかを入力してください";
});

// フォームの設定
const { handleSubmit, isSubmitting } = useForm({
  // バリデーションルール
  validationSchema: {
    title: "atLeastOneRequired",
    content: "atLeastOneRequired",
  },
});

// フィールドの値とエラーメッセージを取得
const { value: title, errorMessage: titleErrorMessage } =
  useField<string>("title");
const { value: content, errorMessage: contentErrorMessage } =
  useField<string>("content");
const { value: author_id, errorMessage: author_idErrorMessage } =
  useField<string>("author_id");

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

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    console.log("FEのレスポンスデータ", response);
  } catch (error) {
    console.log(error);
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
      <p class="memo__error">{{ (titleErrorMessage, contentErrorMessage) }}</p>
    </form>
  </div>
</template>
