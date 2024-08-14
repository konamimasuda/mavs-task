import db from "../../models/index.js";


// クラス
class ArticleService {
  /**
   * メモ新規登録
   * @param title
   * @param content
   * @param author_id
   * @return {Object}
   */
  async createArticle(title, content, author_id) {
    const newArticle = await db.Articles.create({
      title,
      content,
      author_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newArticle;
  }

  /**
   * 記事一覧取得
   * @param user_id
   * @return {Array}
   */
  async getArticleList(user_id) {
    const articleList = await db.Articles.findAll({
      where: {
        author_id: user_id,
      },
      order: [['created_at', 'DESC']]
    });
    return articleList;
  }

  /**
   * 記事情報取得
   * @param article_id
   * @return {Object}
   */
  async getArticle(article_id) {
    try {
      const article = await db.Articles.findOne({
        where: {
          id: article_id
        }
      });
      if (!article) {
        throw new Error('メモが見つかりません')
      }
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ArticleService;
