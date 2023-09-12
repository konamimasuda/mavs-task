import { defineStore } from 'pinia'

interface State {
  token: string
  email: string
}

export const useUserStore = defineStore('user', {
  /**
   * ユーザーの認証情報を保持するためのState
   */
  state: (): State => {
    return {
      token: '',
      email: '',
    }
  },

  actions: {
    /**
     * ログアウト
     */
    logout() {
      this.$reset()
    },
    /**
     * ログイン
     */
    login({ token, email }: State) {
      this.token = token
      this.email = email
    },
  },

  getters: {
    /**
     * ログイン状態の判定
     */
    isLoggedIn: (state) => {
      return state.token !== ''
    },
  },
})
