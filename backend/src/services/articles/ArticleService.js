// import db  from "../../models";
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
    const newArticle =  await db.Articles.create({
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
   * @return ランダム値
   */
  getArticleList(user_id) {
    return [{}];
  }
  /**
   * 記事情報取得
   * @param user_id
   * @return ランダム値
   */
  getArticle(user_id, article_id) {
    return {};
  }
}

export default ArticleService;
