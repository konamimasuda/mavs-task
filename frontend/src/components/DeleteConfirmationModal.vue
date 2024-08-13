<!-- メモを削除する際に確認で表示するモーダル -->
<script setup lang="ts">
// モーダルの表示状態を親コンポーネントから受け取る
// TODO:削除するを押下した時の挙動は後ほど実装する
defineProps({
  visible: Boolean,
});

import { useUserStore } from "~/store/user";
import { CreateArticleResponse, DeleteArticleResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック

// // フォームの設定
// const { handleSubmit, isSubmitting } = useForm({
//   // バリデーションルール
//   validationSchema: {
//     email(value: string) {
//       // 必須
//       if (!value) {
//         return "メールアドレスを入力してください";
//       }
//       // メールアドレスの形式
//       const emailPattern =
//         /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
//       if (!emailPattern.test(value)) {
//         return "メールアドレスの形式が正しくありません";
//       }
//       return true;
//     },
//     password(value: string) {
//       if (!value) {
//         return "パスワードを入力してください";
//       }
//       return true;
//     },
//   },
// });
// フィールドの値とエラーメッセージを取得
// const { value: email, errorMessage: emailErrorMessage } = useField("email");
// const { value: password, errorMessage: passwordErrorMessage } =
//   useField("password");

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
