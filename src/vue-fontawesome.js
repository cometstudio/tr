import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)
library.add(faTimes)
library.add(faEye)
library.add(faEyeSlash)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)