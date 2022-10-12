import { defineStore } from "pinia";

type Gender = '男' | '女' | ''

type Birthday = {
  year: string,
  month: string,
  day: string
}

type Identifier = {
  type: string
  number: string
}

type Phone = {
  district: string
  number: string
}

type Symptom = string[]

type InfoStore = {
  name: string
  gender: Gender
  birthday: Birthday
  identifier: Identifier
  phone: Phone
  symptom: string[]
  dangerousTouch: boolean | null
  getGenders: () => string[]
  getYears: (n: number) => string[]
  getMonths: () => string[]
  getDays: (m: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) => string[]
  getIdentifierTypes: () => string[]
  getPhoneDistricts: () => string[]
  getSymptons: () => string[]
  fetchResult: () => string
}

export const useInfoStore = defineStore('info', (): InfoStore => ({
  name: '',
  gender: '',
  birthday: {
    year: '',
    month: '',
    day: ''
  },
  identifier: {
    type: '',
    number: ''
  },
  phone: {
    district: '',
    number: ''
  },
  symptom: [],
  dangerousTouch: null,
  getYears(n): string[] {
    const years = []
    for (let y = 2022; y > 2022 - n; y--) {
      years.unshift(y.toString())
    }
    return years
  },
  getMonths(): string[] {
    const months = []
    for (let m = 1; m <= 12; m++) {
      months.push(m.toString())
    }
    return months
  },
  getDays(m: number): string[] {
    const days = []
    for (let d = 1; d <= 31; d++) {
      days.push(d.toString())
    }
    return days
  },
  getGenders() {
    return ['男', '女']
  },
  getIdentifierTypes() {
    return ['澳门居民身份证', '香港居民身份证', '往来港澳通行证','外国护照']
  },
  getPhoneDistricts() {
    return ['853', '852', '86']
  },
  getSymptons() {
    return ['发烧', '乏力', '干咳，咽痛', '嗅/味觉减退等症状', '没有以上症状']
  },
  fetchResult() {
    let color = 'green'
    
    if (this.symptom[0] != '没有以上症状')
    color = 'gold'

    if (this.dangerousTouch)
    color = 'red'

    return `${this.name}-${this.identifier.number}-${color}`
  }
}))
