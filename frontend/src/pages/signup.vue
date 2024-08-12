<!-- ユーザーの新規登録画面。余力があれば実装する -->
<template>
  <div class="form">
    <h2 class="form__ttl">ユーザー登録</h2>
    <form class="form__table">
      <label for="username" class="form__label"
        >ユーザー名(半角英数6-16文字)</label
      >
      <input
        class="form__input"
        name="username"
        type="username"
        id="username"
        placeholder="半角英数のみ"
      />
      <p class="form__error">エラーメッセージを表示する</p>
      <label for="email" class="form__label">メールアドレス(6-254文字)</label>
      <input
        class="form__input"
        name="email"
        type="email"
        id="email"
        placeholder="mail@example.com"
      />
      <p class="form__error">エラーメッセージを表示する</p>
      <label for="password" class="form__label">パスワード(8-128文字)</label>
      <input
        class="form__input"
        name="password"
        type="password"
        id="password"
        autocomplete="on"
        placeholder="password"
      />
      <p class="form__error">エラーメッセージを表示する</p>
      <button class="form__btn" type="submit">登録する</button>
    </form>
  </div>
</template>
