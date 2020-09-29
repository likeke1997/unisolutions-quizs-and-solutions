<template>
  <div>
    <div
      class="container-scrollbar"
      ref="container-scrollbar"
      :style="containerStyle"
      contenteditable
    >
      这是一个可编辑容器。江阴市地处太湖水网平原北侧、长江南部冲积平原地带，境内地势平缓，平均海拔6米左右，西南边缘地势偏低，中部、东北部有零星低丘散布其间，地势较高；中部山丘多在海拔200米左右，以定山273.8米为最高，东北部黄山海拔91.7米。这是一个可编辑容器。
    </div>
    <div class="controls">
      <a-form
        layout="inline"
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
      >
        <a-form-item label="容器宽度">
          <a-input v-model="containerWidth" suffix="px" />
        </a-form-item>
        <a-form-item label="容器高度">
          <a-input v-model="containerHeight" suffix="px" />
        </a-form-item>
        <a-form-item label="容器颜色">
          <a-select v-model="containerColor" :options="colorList" />
        </a-form-item>
        <a-form-item label="文本字号">
          <a-input v-model="fontSize" suffix="px" />
        </a-form-item>
        <a-form-item label="文本颜色">
          <a-select v-model="fontColor" :options="colorList" />
        </a-form-item>
        <a-form-item label="滚动条模式">
          <a-select v-model="barMode" :options="barModeList" />
        </a-form-item>
        <a-form-item label="滚动条宽度">
          <a-input v-model="barWidth" suffix="px" />
        </a-form-item>
        <a-form-item label="滚动条圆角尺寸">
          <a-input v-model="barRadiusSize" suffix="px" />
        </a-form-item>
        <a-form-item label="滚动条轨道颜色">
          <a-select v-model="barTrackColor" :options="colorList" />
        </a-form-item>
        <a-form-item label="滚动条滑块颜色">
          <a-select v-model="barThumbColor" :options="colorList" />
        </a-form-item>
        <a-button class="controls-button" @click="handleBackTop">
          回到顶部
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Colors } from "@/const";
export default {
  name: "SolutionScrollbar",
  data() {
    return {
      containerElement: null,
      containerWidth: 400,
      containerHeight: 160,
      containerColor: "lightblue",
      fontSize: 32,
      fontColor: "black",
      barMode: "auto",
      barWidth: 16,
      barRadiusSize: 8,
      barTrackColor: "whitesmoke",
      barThumbColor: "blue",
      barModeList: [
        { value: "auto", label: "自适应" },
        { value: "scroll", label: "始终显示" },
        { value: "hidden", label: "始终隐藏" },
      ],
      colorList: Colors,
    };
  },
  computed: {
    containerStyle() {
      return {
        width: `${this.containerWidth}px`,
        height: `${this.containerHeight}px`,
        "background-color": this.containerColor,
        "font-size": `${this.fontSize}px`,
        color: this.fontColor,
        "overflow-y": this.barMode,
      };
    },
  },
  watch: {
    barWidth(val) {
      this.changeBarStyle("width", val);
    },
    barRadiusSize(val) {
      this.changeBarStyle("radiusSize", val);
    },
    barTrackColor(val) {
      this.changeBarStyle("trackColor", val);
    },
    barThumbColor(val) {
      this.changeBarStyle("thumbColor", val);
    },
  },
  mounted() {
    this.initContainerElement();
  },
  methods: {
    initContainerElement() {
      this.containerElement = this.$refs["container-scrollbar"];
    },
    changeBarStyle(prop, val) {
      const rules = [];
      switch (prop) {
        case "width":
          rules.push({
            selector: "::-webkit-scrollbar",
            style: `width: ${val}px`,
          });
          break;
        case "radiusSize":
          rules.push(
            {
              selector: "::-webkit-scrollbar-track",
              style: `border-radius: ${val}px`,
            },
            {
              selector: "::-webkit-scrollbar-thumb",
              style: `border-radius: ${val}px`,
            }
          );
          break;
        case "trackColor":
          rules.push({
            selector: "::-webkit-scrollbar-track",
            style: `background-color: ${val}`,
          });
          break;
        case "thumbColor":
          rules.push({
            selector: "::-webkit-scrollbar-thumb",
            style: `background-color: ${val}`,
          });
          break;
      }
      rules.forEach((rule) => {
        document.styleSheets[0].addRule(
          `.container-scrollbar${rule.selector}`,
          `${rule.style} !important`
        );
      });
    },
    handleBackTop() {
      this.containerElement.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="less">
.container-scrollbar {
  margin: auto;
  overflow-x: hidden;
  background-color: lightcyan;
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: whitesmoke;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: blue;
  }
}
.controls {
  .controls-button {
    width: 320px;
  }
}
</style>
