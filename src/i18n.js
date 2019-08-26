import Vue from 'vue'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import { languages } from './i18n/index.js'
import { defaultLocale } from './i18n/index.js'

const messages = Object.assign(languages)
const i18nOptions = {
    locale: defaultLocale,
    messages,
    fallbackLocale: 'en',
    silentFallbackWarn: true
}
const i18n = new VueI18n(i18nOptions)

export default i18n