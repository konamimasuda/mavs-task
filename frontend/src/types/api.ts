export interface SignInResponse {
  token: string
  email: string
}

export interface CreateArticleResponse {
  id: number
  author_id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

export interface UpdateArticleResponse {
  token: string
  title: string
  content: string
}

export interface GetArticleListResponse {
  token: string
  user_id: number
}

export interface GetArticleResponse {
  token: string
  user_id: number
  article_id: number
}

export interface DeleteArticleResponse {
  token: string
}