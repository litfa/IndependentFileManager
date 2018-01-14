import Vue from 'vue'
import componentLmuem from './components/lmuem'
import componentFiles from './components/files'

import tools from "./module/tools"
import hubModule from "./module/hub"
import ajaxMoudule from "./module/ajax"

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


new Vue({
    el: "#vm-files-items",
    components: {
        componentFiles,
    },
    data: {
        commonHub: filesHub,
        filesCollect: [{
            name: "A",
            checkbox: false
        }, {
            name: "B",
            checkbox: false
        }]
    }
});



let Ajax = new ajaxMoudule.Ajax({
    url: "/sdsd/"
}).ajax();




//tools.popWindow(123)