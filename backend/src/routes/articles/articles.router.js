import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import ArticleService from '../../services/articles/ArticleService.js';

const router = express.Router();
const articleService = new ArticleService();

/**
 * メモ登録関連
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
    let body = {};
    res.status(200).json(body);
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

  const { id } = req.params;
  try {
    // let body = {};
    // サービス層からメモを取得する
    const article = await articleService.getArticle(id);

    // メモ詳細データをレスポンスとして返す
    res.json({ article });
    // res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

// 指定したメモの削除
router.delete('/deleteArticle', authenticate, async (req, res, next) => {
  try {
    // let body = {};
    // サービス層からメモを取得する
    // const article = await ArticleService.getArticle();

    // 削除成功/失敗の結果のみをレスポンスとして返す
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});



export default router;
