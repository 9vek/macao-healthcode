<script setup lang='ts'>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="mt-4 mb-1">
    <span class="text-red-600 font-bold">* </span>
    <span class="">{{ props.text }}</span>
  </div>
</template>

<style scoped>

</style>
