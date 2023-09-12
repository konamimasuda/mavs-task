<template>
  <div class="layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100%;
}
</style>
