<script setup lang='ts'>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="text-lg mt-4 mb-1 ml-1 text-gray-500 font-bold">{{ props.text }}</div>
</template>

<style scoped>
</style>
