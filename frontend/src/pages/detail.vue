<!-- 保存済みメモの編集または削除画面 -->
<script setup lang="ts">
// モーダルの表示状態を管理する
const showModal = ref(false);
// モーダルを開く関数
const openDeleteConfirmationModal = () => {
  showModal.value = true;
};
// モーダルを閉じる関数
const closeDeleteConfirmationModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div>
    <form class="memo" action="">
      <input class="memo__input" type="text" name="title" placeholder="無題" />
      <textarea
        class="memo__textarea"
        name="contents"
        id=""
        placeholder="文字を入力する"
      ></textarea>
      <div class="memo__btnbox">
        <button class="memo__btn" type="button">メモを保存する</button>
        <button
          class="memo__delete"
          type="button"
          @click="openDeleteConfirmationModal"
        >
          メモを削除する
        </button>
      </div>
    </form>

    <DeleteConfirmationModal
      :visible="showModal"
      @cancel="closeDeleteConfirmationModal"
    />

    <SnackbarSuccess />
    <SnackbarFailure />
  </div>
</template>
