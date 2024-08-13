<!-- 保存または削除に成功した時に表示するスナックバー -->
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// snackbarに表示するメッセージ
defineProps({
  message: String,
});

// スナックバーを閉じるためのイベントを発行
const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeSnackbar = () => {
  emit("close");
};
</script>
<template>
  <div class="snackbar">
    <div class="snackbar__content">
      <p class="snackbar__img">
        <img class="snackbar__svg" src="/img/check.svg" />
      </p>
      <p>{{ message }}</p>
      <p class="snackbar__close" @click="closeSnackbar">
        <img class="snackbar__svg" src="/img/close.svg" />
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.snackbar {
  &__content {
    background-color: $colorGreen;
  }
}
</style>
