<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// フォームの設定
const { handleSubmit, isSubmitting } = useForm({
  // バリデーションルール
  validationSchema: {
    email(value: string) {
      // 必須
      if (!value) {
        return "メールアドレスを入力してください";
      }
      // メールアドレスの形式
      const emailPattern =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return "メールアドレスの形式が正しくありません";
      }
      return true;
    },
    password(value: string) {
      if (!value) {
        return "パスワードを入力してください";
      }
      return true;
    },
  },
});
// フィールドの値とエラーメッセージを取得
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: password, errorMessage: passwordErrorMessage } =
  useField("password");

/**
 * サインイン処理
 */
const onSubmit = handleSubmit(async () => {
  try {
    // ログインAPIを呼び出す -> /backend/src/routes/auth/auth.router.tsを参照
    const { data } = await useFetch<SignInResponse>(
      `${apiBaseUrl}/auth/signin`,
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    // トークンの有無でログインできたか判断
    const hasToken = response && !!response.token;
    if (hasToken) {
      // 成功の場合はトークンを保存
      userStore.token = response.token;
      userStore.email = response.email;
      // トップページに遷移
      $router.push("/");
    } else {
      // 失敗の場合はフィールドをクリア
      email.value = "";
      password.value = "";
    }
  } catch (error) {
    console.log(error);
  }
});

// ページのタイトルなどを設定
useHead({
  title: "ログイン",
});
</script>

<template>
  <div class="form">
    <h2 class="form__ttl">ログイン</h2>
    <form class="form__table" @submit="onSubmit">
      <label for="email" class="form__label">メールアドレス</label>
      <input
        class="form__input"
        v-model="email"
        name="email"
        type="email"
        id="email"
        placeholder="mail@example.com"
      />
      <p class="form__error">{{ emailErrorMessage }}</p>
      <label for="password" class="form__label">パスワード</label>
      <input
        class="form__input"
        v-model="password"
        name="password"
        type="password"
        id="password"
        autocomplete="on"
        placeholder="password"
      />
      <p class="form__error">{{ passwordErrorMessage }}</p>
      <button class="form__btn" type="submit" :disabled="isSubmitting">
        ログイン
      </button>
      <p>
        <NuxtLink to="/signup">ユーザー登録はこちら</NuxtLink>
      </p>
    </form>
  </div>
</template>
