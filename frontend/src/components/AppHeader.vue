<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <h1>
      <nuxt-link to="/">メモアプリ</nuxt-link>
    </h1>
    <div>
      <div v-if="isLogin">
        <p>{{ username }}</p>
        <button type="button" @click="logout">ログアウト</button>
      </div>
      <div v-else>
        <nuxt-link to="/signin">サインイン</nuxt-link>
        <nuxt-link to="/signup">新規登録</nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    // Tokenの有無でログインしているかどうかを判断
    isLogin() {
      return !!this.$store.state.auth.token
    },
    username() {
      return this.$store.state.auth.username
    },
  },
  methods: {
    // ログアウト処理
    logout() {
      // store/auth.jsのactionsのlogoutを実行
      this.$store.commit('auth/setToken', null)
      this.$store.commit('auth/setUsername', null)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
