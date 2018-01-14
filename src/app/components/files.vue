<template lang="html">
	<div class="m-files-panel">
		<!--表头-->
		<table class="m-table" width="100%">
			<tr>
				<th width="4%" style="">
					<input type="checkbox" v-model="checkboxAll">
				</th>
				<th width="40%">文件名</th>
				<th width="10%">类型</th>
				<th width="10%">文件大小</th>
				<th width="20%">创建时间</th>
				<th width="16%">特殊</th>
			</tr>
			<tr>
				<td><input type="checkbox" aria-checked="false" value="on" disabled="disabled"></td>	
				<td style="color: blue;cursor: pointer;">返回上层目录</td>
				<td>指令</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr v-for="item in fileList" v-on:click="fileSelectedEvent(item)">
				<td><input type="checkbox" v-model="item.checkbox"></td>
				<td v-text="item.name"></td>
				<td>文件</td>
				<td v-text="item.name"></td>
				<td v-text="item.name"></td>
				<td v-text="item.name"></td>
			</tr>
		</table>


	</div>
</template>

<style lang="css">
.m-files-panel {
  /*padding: 0 8px;*/
}
.m-table th {
  background-color: darkgray;
}
.m-table th,
.m-table td {
  padding: 8px;
  border-bottom: 1px solid #dcdcdc;
}
.m-table td {
  padding: 4px 8px;
}
.m-table tr:hover {
  background-color: #d4d4d4;
}
</style>

<script>
import hubMoudle from "../module/hub";

export default {
  props: ["fileList", "commonHub"],
  data() {
    return {
      checkboxAll: false,
      selectedStack: []
    };
  },
  methods: {
    //文件选择事件
    fileSelectedEvent(item) {
      if (item) item.checkbox = !item.checkbox;
      this.reloadStack();
    },
    //刷新提交栈
    reloadStack() {
      let selectedStack = [];
      for (let v of this.fileList) {
        if (v.checkbox) selectedStack.push(v);
      }
      // this.selectedStack = selectedStack;
      console.log(selectedStack);
      //载入null
      // let stack = null;
      // if (selectedStack.length > 0) stack = selectedStack;
      this.commonHub.set("CompFiles", selectedStack);
    }
  },
  watch: {
    checkboxAll() {
      console.log("selectAll------------");
      for (let v of this.fileList) {
        v.checkbox = this.checkboxAll;
      }
      this.reloadStack();
      return this.checkboxAll;
    }
  }
};
</script>