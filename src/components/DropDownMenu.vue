<script setup lang='ts'>
import { Ref, ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside';
import { emitter } from '../views/ReportForm.vue'

const props = defineProps<{
  name: string
  indicator: string
  options: string[]
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

const menuRef: Ref<null | HTMLElement> = ref(null)
const clickedOutside = useClickOutside(menuRef)
const hideMenuHelper = ref(true)

const switchHideMenuHelper = () => {
  hideMenuHelper.value = !hideMenuHelper.value
}

const selectedOption = ref('')
selectedOption.value = props.getter()

const changeValue = (newValue: string) => {
  selectedOption.value = newValue
}

watch(selectedOption, () => {
  props.setter(selectedOption.value)
})

</script>

<template>
  <div ref="menuRef" class="bg-gray-200 rounded-sm p-1 text-gray-900" 
  :class="{ 'border border-gray-400': !hasError, 'border-2 border-red-600': hasError }"
  @click="switchHideMenuHelper(); hasError = false" >
    <div>
      <span>
        {{ selectedOption == '' ? props.indicator : selectedOption }}
      </span>
      <span class="float-right">▽</span>
    </div>
    <div class="max-h-32 overflow-y-scroll scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-thin w-32 absolute border border-gray-400" :class="{hidden: clickedOutside || hideMenuHelper}">
      <div class="bg-white w-full" v-for="option in props.options">
        <div class="hover:bg-gray-50" @click="changeValue(option)">{{ option }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
