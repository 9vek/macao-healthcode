<script setup lang='ts'>
import { computed, reactive, ref } from '@vue/reactivity';
import { watch } from 'vue';
import { emitter } from '../views/ReportForm.vue'


const props = defineProps<{
  name: string,
  cols: number,
  options: string[]
  restrictor: (optionValues: boolean[], index: number) => void
  setter: (selectedOptions: string[]) => void
  getter: () => string[]
  checker: () => boolean
}>()

const hasError = ref(false)

emitter.on('submit', () => {
  if (!props.checker()) {
    hasError.value = true
  }
})

const optionValuesPre: boolean[] = []
const storedValues = props.getter()

console.log(storedValues)
console.log(props.options)

props.options.forEach((option) => {
  optionValuesPre.push(storedValues.find((value) => {
    return value == option
  }) != undefined)
})
console.log(props.name, optionValuesPre)

const optionValues = reactive(optionValuesPre)

const colsClass = computed(() => {
  if (props.cols == 3) {
    return 'grid-cols-3'
  }
  else if (props.cols == 2) {
    return 'grid-cols-2'
  }
  else {
    return 'grid-cols-1'
  }
})

watch(optionValues, () => {
  props.setter(props.options.filter((_, index) => {
    return optionValues[index]
  }))
})

</script>

<template>
  <div class="grid mt-2" :class="colsClass, { 'border border-gray-400': !hasError, 'border-2 border-red-600': hasError }"
  @click="hasError = false">
    <div class="my-1 ml-2" v-for="option, index in props.options">
      <input :id="props.name + index" class="mr-1" type="checkbox" v-model="optionValues[index]"
        @click="props.restrictor(optionValues, index)">
      <label :for="props.name + index">{{ option }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>
