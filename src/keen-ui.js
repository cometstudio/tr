import Vue from 'vue'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css'; // All Keen UI components
import 'keen-ui/src/bootstrap'; // Required to setup Keen UI, should be imported only once in your project

import UiToolbar from 'keen-ui/src/UiToolbar';
import UiButton from 'keen-ui/src/UiButton';
import UiTextbox from 'keen-ui/src/UiTextbox';
import UiAlert from 'keen-ui/src/UiAlert';

Vue.use(KeenUI, {
    UiToolbar: {
        progressPosition: 'top',
        loading: false,
        raised: false
    }
});