<!-- 保存済みメモの編集または削除画面 -->
<script setup lang="ts">
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

import { useUserStore } from "~/store/user";
import {
  CreateArticleResponse,
  GetArticleListResponse,
  GetArticleResponse,
  UpdateArticleResponse,
} from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

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
