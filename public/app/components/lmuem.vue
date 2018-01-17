<template lang="html">
  <div class="letsgo">
    <div class="m-lmuem-items">
      <div v-for="item in items" v-on:click="filesOperate(item)">
        <span v-if="item.title" class="m-lmuem-items-title">
          {{ item.name }}
        </span>
        <span v-else>
          <span v-bind:class="item.class" style="margin-right: 5px;"></span> {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css">
  /* .m-lmuem-items {} */

  .m-lmuem-items div {
    width: 100%;
    color: #777;
    text-align: left;
    padding: 6px 0px 6px 14px;
    margin: 0;
    border-bottom: 1px solid #dcdcdc;
    cursor: pointer;
  }

  .m-lmuem-items div:hover {
    background-color: #fbfbfb;
  }

  .m-lmuem-items-title {
    font-size: 16px;
    color: black;
    padding-top: 3px;
    padding-bottom: 3px;
    display: block;
  }
</style>

<script>
  // import ajaxMoudule from "../module/ajax";
  import functionMudule from "../module/function";
  import tools from "../module/tools";

  export default {
    props: ["filesHub"],
    methods: {
      filesOperate(item) {
        console.log("----------------- 操作文件栈 -------------------");
        let stack = this.filesHub.get("CompFiles", []);
        console.log(stack);
        if (item.title) return;
        switch (item.name) {
          case "刷新":
            location.reload();
            break;
          case "上传文件":
            break;
          case "复制":
            functionMudule.copy(this.getFileStack());
            tools.popWindow("已复制到临时区域,使用粘贴即可粘贴到当前目录");
            break;
          case "剪贴":
            functionMudule.cponce(this.getFileStack());
            tools.popWindow("已复制到临时区域,使用粘贴即可移动到当前目录");
            break;
          case "粘贴":
            functionMudule.paste();
            location.reload();
            break;
          case "删除":
            if (confirm("您确定要删除这(些)文件吗?")) {
              functionMudule.remove(this.getFileStack());
              location.reload();
            }
            break;
          case "重命名":
            if (this.getFileStack().length != 1) {
              tools.popWindow("非法操作，不能同时重命名多个文件或未选择文件");
              break;
            }
            functionMudule.rename(
              this.getFileStack(),
              prompt("对于您选中的文件，请输入一个新的文件/目录名", "")
            );
            location.reload();
            break;
          default:
            console.error("--------------- 选择操作未执行 ---------------");
            break;
        }
        this.filesHub.set("CompFiles", []);
      },
      getFileStack() {
        let stack = this.filesHub.get("CompFiles", []);
        return stack;
      }
    },
    data() {
      let that = this;
      return {
        items: [{
            name: "基本功能",
            class: "",
            api: "",
            title: true
          },
          {
            name: "刷新",
            class: "glyphicon glyphicon-refresh",
            api: ""
            //   action: that.methods.refreshOperate
          },
          {
            name: "上传文件",
            class: "glyphicon glyphicon-open",
            api: ""
          },
          {
            name: "文件操作",
            class: "",
            api: "",
            title: true
          },
          {
            name: "重命名",
            class: "glyphicon glyphicon-credit-card",
            api: ""
          },
          {
            name: "复制",
            class: "glyphicon glyphicon-duplicate",
            api: ""
          },
          {
            name: "剪贴",
            class: "glyphicon glyphicon-scissors",
            api: ""
          },
          {
            name: "粘贴",
            class: "glyphicon glyphicon-paste",
            api: ""
          },
          {
            name: "删除",
            class: "glyphicon glyphicon-trash",
            api: ""
          },
          {
            name: "用户操作",
            class: "",
            api: "",
            title: true
          },
          {
            name: "退出",
            class: "glyphicon glyphicon-log-out",
            api: ""
          }
        ]
      };
    }
  };
</script>