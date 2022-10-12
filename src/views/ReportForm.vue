<script lang="ts">
import mitt from 'mitt'

export const emitter = mitt()
</script>

<script setup lang="ts">
import DropDownMenu from '../components/DropDownMenu.vue'
import MustFillLabel from '../components/MustFillLabel.vue'
import SectionTitle from '../components/SectionTitle.vue'
import CheckBox from '../components/CheckBox.vue'
import { useInfoStore } from '../stores/useInfoStore'
import useSingleCheckbox from '../hooks/useSingleCheckbox'
import useSymptomCheckbox from '../hooks/useSymptomCheckbox'
import InputBox from '../components/InputBox.vue'
import { useRouter } from 'vue-router'

const infoStore = useInfoStore()
const router = useRouter()

const checkers = {
  checkName: () => {
    return infoStore.name != ''
  },
  checkGender: () => {
    return infoStore.gender != ''
  },
  checkYear: () => {
    return infoStore.birthday.year != ''
  },
  checkMonth: () => {
    return infoStore.birthday.month != ''
  },
  checkDay: () => {
    return infoStore.birthday.day != ''
  },
  checkIdType: () => { 
    return infoStore.identifier.type != '' 
  },
  checkIdNumber: () => { 
    return infoStore.identifier.number != '' 
  },
  checkPhoneDistrict: () => { 
    return infoStore.phone.district != '' 
  },
  checkPhoneNum: () => { 
    return infoStore.phone.number != '' 
  },
  checkSymptons: () => { 
    return infoStore.symptom.length != 0 
  },
  checkDangerousTouch: () => {
    return infoStore.dangerousTouch != null
  }
}



const submit = () => {
  let pass = true

  for (let checker of Object.values(checkers)) {
    if (!checker()) {
      pass = false
      break
    }
  }

  if (pass) {
    router.push('/result')
    return
  }
  emitter.emit('submit')
}

</script>

<template>
  <div class="p-2">
    <SectionTitle :text="'个人资讯'" />
    <div class="bg-white my-1 px-2 py-0.5">

      <MustFillLabel :text="'姓名：'" />
      <InputBox :name="'name'" :indicator="'请输入'" :setter="(value) => { infoStore.name = value }"
        :getter="() => { return infoStore.name }"
        :checker="checkers.checkName" />

      <MustFillLabel :text="'性别：'" />
      <DropDownMenu :name="'gender'" :indicator="'-请选择-'" :options="infoStore.getGenders()"
        :setter="(value) => { infoStore.gender = value == '男' ? '男' : '女' } " :getter="() => { return infoStore.gender }" :checker="checkers.checkGender" />

      <MustFillLabel :text="'出生日期：'" />
      <div class="grid grid-cols-3 space-x-4">
        <DropDownMenu :name="'year'" :indicator="'年'" :options="infoStore.getYears(100)"
          :setter="(value) => { infoStore.birthday.year = value }" :getter="() => { return infoStore.birthday.year }" :checker="checkers.checkYear" />
        <DropDownMenu :name="'month'" :indicator="'月'" :options="infoStore.getMonths()"
          :setter="(value) => { infoStore.birthday.month = value }" :getter="() => { return infoStore.birthday.month }" :checker="checkers.checkMonth" />
        <DropDownMenu :name="'day'" :indicator="'日'" :options="infoStore.getDays(1)"
          :setter="(value) => { infoStore.birthday.day = value }" :getter="() => { return infoStore.birthday.day }" :checker="checkers.checkDay" />
      </div>

      <MustFillLabel :text="'入境澳门证件：'" />
      <CheckBox :name="'identifier'" :cols="2" :options="infoStore.getIdentifierTypes()" :restrictor="useSingleCheckbox"
        :setter="(options) => { infoStore.identifier.type = options[0] }" :getter="() => { return [infoStore.identifier.type] }" :checker="checkers.checkIdType" />
      <MustFillLabel :text="'证件号：'" />
      <InputBox :name="'identifier-num'" :indicator="'请输入'" :setter="(value) => { infoStore.identifier.number = value }"
        :getter="() => { return infoStore.identifier.number }"
        :checker="checkers.checkIdNumber" />

      <MustFillLabel :text="'联络电话：'" />
      <div class="grid grid-cols-4 space-x-2 mb-2 mr-2">
        <DropDownMenu :name="'district'" :indicator="'-区号-'" :options="infoStore.getPhoneDistricts()"
          :setter="(value) => { infoStore.phone.district = value }"
          :getter="() => { return infoStore.phone.district }"
          :checker="checkers.checkPhoneDistrict" />
        <InputBox class="col-span-3" :name="'phone-num'" :indicator="'请输入'"
          :setter="(value) => { infoStore.phone.number = value }"
          :getter="() => { return infoStore.phone.number }"
          :checker="checkers.checkPhoneNum" />
      </div>
    </div>


    <SectionTitle :text="'您今天是否出现以下症状？'" />
    <div class="bg-white my-1 p-4">
      <CheckBox :name="'symptom'" :cols="1" :options="infoStore.getSymptons()" :restrictor="useSymptomCheckbox"
        :setter="(options) => { infoStore.symptom = options[0] == '没有以上症状' ? ['没有以上症状'] : options }"
        :getter="() => { return infoStore.symptom}"
        :checker="checkers.checkSymptons" />
    </div>


    <SectionTitle :text="'您在过去 14 天中是否在无防疫措施下接触过新冠确诊病人？'" />
    <div class="bg-white my-1 p-4">
      <CheckBox :name="'touch'" :cols="2" :options="['是', '否']" :restrictor="useSingleCheckbox"
        :setter="(options) => { infoStore.dangerousTouch = options[0] == '是' }"
        :getter="() => { return infoStore.dangerousTouch ? ['是'] : infoStore.dangerousTouch == null ? [] : ['否'] }"
        :checker="checkers.checkDangerousTouch" />
    </div>

    <div class="grid grid-cols-2">
      <div class="p-4 bg-white border text-center m-2 cursor-pointer">重置</div>
      <div class="p-4 bg-blue-500 text-white text-center m-2 cursor-pointer" @click="submit()">下一步</div>
    </div>

  </div>

</template>

<style scoped>

</style>
