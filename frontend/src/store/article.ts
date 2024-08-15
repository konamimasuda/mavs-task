import { defineStore } from "pinia";
import { Articles, GetArticleListResponse, GetArticleResponse } from "~/types/api";


interface State {
    articles: Articles[];
    selectedArticle: GetArticleResponse | null;
}

export const useArticleStore = defineStore('article', {
    state: (): State => ({
        articles: [],
        selectedArticle: null,
    }),

    actions: {
        // メモ一覧の取得
        async fetchArticles(apiBaseUrl: string, token: string) {
            try {
                const { data } = await useFetch<GetArticleListResponse>(
                    `${apiBaseUrl}/articles/getArticleList`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    }
                );
                this.articles = data.value?.articles || [];
            } catch (error) {
                console.log(error);
            }
        },

        // メモの詳細情報を取得
        async fetchArticleDetail(apiBaseUrl: string, token: string, articleId: number | null) {
            try {
                const { data } = await useFetch<GetArticleResponse>(
                    `${apiBaseUrl}/articles/getArticle`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                        query: {
                            article_id: articleId,
                        },
                    }
                );
                const response = data.value;
                // レスポンスがある場合、selectedArticleを更新
                if (response && response.article) {
                    this.selectedArticle = response;
                } else {
                    // レスポンスがない場合は、selectedArticleをnullにする
                    this.selectedArticle = null;
                }
            } catch (error) {
                console.log(error);
            }
        },

        // メモの更新後にメモ一覧を再取得
        async refreshArticles(apiBaseUrl: string, token: string) {
            await this.fetchArticles(apiBaseUrl, token);
        },

        // メモの選択
        async selectArticle(article: GetArticleResponse | null) {
            this.selectedArticle = article;
        },
    },

    getters: {
        // 記事の一覧を取得
        getArticleList(state) {
            return state.articles;
        },

        // 選択されたメモを取得
        getSelectedArticle(state) {
            return state.selectedArticle;
        },
    },
});