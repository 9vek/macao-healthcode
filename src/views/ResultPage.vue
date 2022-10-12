<script setup lang='ts'>
import { useInfoStore } from '../stores/useInfoStore';

const infoStore = useInfoStore()
</script>

<template>
  <div>
    <div class="mt-4 p-4">
      <div>{{ infoStore.name }}</div>
      <div>{{ infoStore.gender }}</div>
      <div>{{ infoStore.birthday.year }}-{{ infoStore.birthday.month }}-{{ infoStore.birthday.day }}</div>
      <div>{{ infoStore.identifier.type }}: {{ infoStore.identifier.number }}</div>
      <div>+{{ infoStore.phone.district }} {{ infoStore.phone.number }}</div>
      <div>
        {{ infoStore.symptom[0] == '没有以上症状' ? '没有以上症状' : infoStore.symptom }}
      </div>
      <div>
        {{ infoStore.dangerousTouch ? '过去 14 天有过危险接触' : '过去 14 天没有危险接触' }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
