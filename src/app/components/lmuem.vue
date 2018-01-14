<template lang="html">
	<div class="letsgo">
		<div class="m-lmuem-items">
			<div v-for="item in items" v-on:click="filesOperate">
				<span v-if="item.title"  class="m-lmuem-items-title">
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
.m-lmuem-items {
}

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
  background-color: #999999;
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
export default {
  props: ["filesHub"],
  methods: {
    filesOperate() {
      console.log("操作文件栈:");
      let stack = this.filesHub.get("CompFiles", []);
      console.log(JSON.stringify(stack));
    }
  },
  data() {
    let that = this;
    return {
      items: [
        {
          name: "基本功能",
          class: "",
          api: "",
          title: true
        },
        {
          name: "刷新",
          class: "glyphicon glyphicon-open",
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
          name: "复制",
          class: "glyphicon glyphicon-certificate",
          api: ""
        },
        {
          name: "移动",
          class: "glyphicon glyphicon-pencil",
          api: ""
        },
        {
          name: "删除",
          class: "glyphicon glyphicon-trash",
          api: ""
        }
      ]
    };
  }
};
</script>