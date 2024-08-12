<!-- メモを削除する際に確認で表示するモーダル -->
<script setup lang="ts">
// モーダルの表示状態を親コンポーネントから受け取る
// TODO:削除するを押下した時の挙動は後ほど実装する
defineProps({
  visible: Boolean,
});
</script>
<template>
  <div class="modal" v-if="visible">
    <div class="modal__content">
      <p class="modal__message">メモを削除しますか？</p>
      <div class="modal__btnbox">
        <button class="modal__cancel" @click="$emit('cancel')">いいえ</button>
        <button class="modal__delete">削除する</button>
      </div>
    </div>
  </div>
</template>
