<script setup lang='ts'>
import { Ref, ref, watch } from 'vue';
import { emitter } from '../views/ReportForm.vue'

const props = defineProps<{
  name: string
  indicator: string
  setter: (value: string) => void
  getter: () => string
  checker: () => boolean
}>()

const hasError = ref(false)

emitter.on('submit', () => {
  if (!props.checker()) {
    hasError.value = true
  }
} )

const inputValue = ref('')
inputValue.value = props.getter()

watch(inputValue, () => {
  props.setter(inputValue.value)
})

</script>

<template>
  <div @click="hasError = false">
    <input :placeholder="props.indicator" class="h-8 w-full outline-none rounded-sm p-2" v-model="inputValue"
    :class="{ 'border border-gray-400': !hasError, 'border-2 border-red-600': hasError }">
  </div>
</template>

<style scoped>
</style>
