import Vue from 'vue';
import componentLmuem from './components/lmuem';
import componentFiles from './components/files';

import tools from "./module/tools";
import hubModule from "./module/hub";
import ajaxMoudule from "./module/ajax";

const filesHub = hubModule.Hub;
// window.COMMON_HUB = commonHub;

new Vue({
    el: "#vm-leftm-items",
    data: {
        filesHub: filesHub,
    },
    components: {
        componentLmuem,
    }
});

import funcModule from "./module/function";




const vm_files_items = new Vue({
    el: "#vm-files-items",
    components: {
        componentFiles,
    },
    data: {
        commonHub: filesHub,
        filesCollect: []
    }
});

funcModule.ls().then(function name(data) {
    vm_files_items.$data.filesCollect = data;
});
//tools.popWindow(123)