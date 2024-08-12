<!-- 保存または削除に失敗した時に表示するスナックバー -->
<template>
  <div class="snackbar">
    <div class="snackbar__content">
      <p class="snackbar__img">
        <img class="snackbar__svg" src="/img/error.svg" />
      </p>
      <p>保存に失敗しました</p>
      <p class="snackbar__close">
        <img class="snackbar__svg" src="/img/close.svg" />
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.snackbar {
  &__content {
    background-color: $colorRed;
  }
  &__img {
    width: 36px;
    height: 36px;
  }
}
</style>
