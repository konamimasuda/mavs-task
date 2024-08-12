<!-- メモの新規作成画面 -->
<template>
  <div class="memo">
    <form class="memo__form" action="post">
      <input class="memo__input" type="text" name="title" placeholder="無題" />
      <textarea
        class="memo__textarea"
        name="contents"
        id=""
        placeholder="文字を入力する"
      ></textarea>
      <button class="memo__btn" type="button">メモを保存する</button>
    </form>
  </div>
</template>
