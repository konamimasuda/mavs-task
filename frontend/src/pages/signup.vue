<!-- ユーザーの新規登録画面。余力があれば実装する -->
<template>
  <div>
    <h2>ユーザー登録</h2>
    <form>
      <label for="username">ユーザー名(半角英数6-16文字)</label>
      <input
        name="username"
        type="username"
        id="username"
        placeholder="半角英数のみ"
      />
      <!-- <p class="error">{{ usernameErrorMessage }}</p> -->
      <label for="email">メールアドレス(6-254文字)</label>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="mail@example.com"
      />
      <!-- <p class="error">{{ emailErrorMessage }}</p> -->
      <label for="password">パスワード(8-128文字)</label>
      <input
        name="password"
        type="password"
        id="password"
        autocomplete="on"
        placeholder="password"
      />
      <!-- <p class="error">{{ passwordErrorMessage }}</p> -->
      <button type="submit">登録する</button>
    </form>
  </div>
</template>
