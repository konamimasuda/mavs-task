<!-- 保存または削除に成功した時に表示するスナックバー -->
<template>
  <div class="snackbar">
    <div class="snackbar__content">
      <p class="snackbar__img">
        <img class="snackbar__svg" src="/img/check.svg" />
      </p>
      <!-- TODO:保存/削除を受け取った単語で表示する -->
      <p>保存に成功しました</p>
      <p class="snackbar__close">
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
