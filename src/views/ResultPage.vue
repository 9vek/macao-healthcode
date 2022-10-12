<script setup lang='ts'>
import { useInfoStore } from '../stores/useInfoStore';
import useQRCode from '../hooks/useQRCode'
import { onMounted, Ref, ref } from 'vue';

const infoStore = useInfoStore()

const qrCode: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const result = infoStore.fetchResult()
  let qrCodeStr = useQRCode(result)

  if (result.indexOf('green') > -1)
  qrCodeStr = qrCodeStr.replace('fill="black"', 'fill="green"')

  else if (result.indexOf('gold') > -1)
  qrCodeStr = qrCodeStr.replace('fill="black"', 'fill="gold"')

  else if (result.indexOf('red') > -1)
  qrCodeStr = qrCodeStr.replace('fill="black"', 'fill="red"')

  if (qrCode.value)
  qrCode.value.innerHTML = qrCodeStr;
})  


</script>

<template>
  <div>
    <div ref="qrCode" class="w-[206px] h-[206px] mx-auto mt-16"></div>
    <div class="mt-4 p-4 grid grid-cols-2 mx-auto w-72 rounded-md bg-white shadow-lg space-y-1">
      <div>姓名：</div><div>{{ infoStore.name }}</div>
      <div>性别：</div><div>{{ infoStore.gender }}</div>
      <div>出生日期：</div><div>{{ infoStore.birthday.year }}-{{ infoStore.birthday.month }}-{{ infoStore.birthday.day }}</div>
      <div>身份证件：</div><div>{{ infoStore.identifier.type }}: {{ infoStore.identifier.number }}</div>
      <div>联系方式：</div> <div>+{{ infoStore.phone.district }} {{ infoStore.phone.number }}</div>
      <div>症状：</div><div>
        {{ infoStore.symptom[0] == '没有以上症状' ? '没有以上症状' : infoStore.symptom }}
      </div>
      <div>接触史：</div><div>
        {{ infoStore.dangerousTouch ? '过去 14 天有过危险接触' : '过去 14 天没有危险接触' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
svg {
  @apply w-full h-full block;
}
</style>
