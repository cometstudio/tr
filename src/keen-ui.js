import Vue from 'vue'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css'; // All Keen UI components
import 'keen-ui/src/bootstrap'; // Required to setup Keen UI, should be imported only once in your project

import UiToolbar from 'keen-ui/src/UiToolbar.vue';
import UiButton from 'keen-ui/src/UiButton.vue';

Vue.use(KeenUI, {
    UiToolbar: {
        progressPosition: 'top',
        loading: false,
        raised: false
    }
});