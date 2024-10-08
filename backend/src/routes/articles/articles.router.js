import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import ArticleService from '../../services/articles/ArticleService.js';

const router = express.Router();
const articleService = new ArticleService();

/**
 * メモ関連
 */

// メモ新規作成
router.post('/createArticle', authenticate, async (req, res, next) => {
  try {
    // リクエストパラメータ
    const { title, content, author_id } = req.body;

    // メモの新規作成処理(サービス層)
    const newArticle = await articleService.createArticle(title, content, author_id);

    // 作成されたメモをレスポンスとして返す
    res.status(200).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// メモ編集保存
router.post('/updateArticle', authenticate, async (req, res, next) => {
  try {
    // リクエストボディから受け取るデータ
    const { article_id, title, content, updated_at } = req.body;
    // メモの更新保存処理(サービス層)
    const updateArticle = await articleService.updateArticle(article_id, title, content, updated_at);

    // 更新されたメモをレスポンスとして返す
    res.status(200).json(updateArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

// メモ一覧取得
router.get('/getArticleList', authenticate, async (req, res, next) => {
  try {
    const user_id = 1; // 後ほど修正する
    // サービス層からメモ一覧を取得する
    const articles = await articleService.getArticleList(user_id);

    // メモ一覧データをレスポンスとして返す
    res.status(200).json({ articles });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({});
  }
});

// 指定したメモの詳細を取得
router.get('/getArticle', authenticate, async (req, res, next) => {

  // クエリからメモのIDを取り出す
  const { article_id } = req.query;
  try {
    // サービス層からメモの詳細情報を取得する
    const article = await articleService.getArticle(article_id);
    // メモ詳細データをレスポンスとして返す
    res.status(200).json({article});
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

// 指定したメモの削除
router.delete('/deleteArticle', authenticate, async (req, res, next) => {
  try {
    // 削除したいメモのIDを受け取る
    const { article_id } = req.query;
    const deleteArticle = await articleService.deleteArticle(article_id);

    // 削除成功/失敗の結果をレスポンスとして返す
    res.status(200).json(deleteArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});



export default router;
