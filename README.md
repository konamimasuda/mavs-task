# Nuxt,js + Express.js のベースプロジェクトです。

## 環境構築方法

Nodeのバージョンは16.10.0です。  
Voltaをインストールしている場合は自動でバージョンが切り替わります。

### リポジトリのフォーク

リポジトリの右上にあるフォークボタンをクリック

https://user-images.githubusercontent.com/51960141/232392797-4d1946b2-4f82-4363-9e00-b72be8e4eefc.mov


```
git clone git@github.com:ユーザー名/mavs-task.git
cd mavs-task
```

### パッケージインストール

フロントエンドのパッケージインストール&環境変数追加
```
cd frontend
yarn install
touch .env
```

.envファイルに以下の記述を追加し保存
```
API_BASE_URL=http://localhost:3001
```


バックエンドのパッケージインストール
```
cd ../
cd backend
yarn install
```

### Docker を起動（ルートディレクトリで実行）
Docker Desktop を起動しておきます。
```
cd ../
docker compose up --build
```

ターミナルにこのように表示されていれば問題なく動作しています。
![image](https://user-images.githubusercontent.com/51960141/232393291-f191f501-128b-4b95-8508-d3c2d39f3ea1.png)



※postgresql には初期構築時にテストデータが投入されます。

### 動作確認

http://localhost:3000

このように表示できていればokです！
![スクリーンショット 2023-04-17 14 32 45](https://user-images.githubusercontent.com/51960141/232390173-19e2dc28-d662-4abb-af3c-88917bdda4f1.png)

## ログインアカウント

| メールアドレス  | パスワード |
| --------------- | ---------- |
| sample@test.com | password   |

http://localhost:3000/signin にアクセスし、上記のメールアドレス、パスワードを入力しログインボタンクリック
右上にメールアドレスが表示されていればログイン処理が正常に動作しています！


https://user-images.githubusercontent.com/51960141/232391022-42eb0ef7-75e2-4cd0-899e-3e7ffa29bde1.mov



## データベースクライアントツール

pgAdmin を使用してテーブルを見ることができます。

### アクセス方法

http://localhost

| メールアドレス | パスワード |
| -------------- | ---------- |
| root@test.com  | root       |

### データベース登録

Create Server から下記内容を設定する
| タブ | 設定項目 | 設定値 |
| ---------- | -------------------- | -------- |
| General | Name | postgres |
| Connection | Host | postgres |
| | Port | 5432 |
| | Maintenance Database | postgres |
| | Username | root |
| | Password | root |
