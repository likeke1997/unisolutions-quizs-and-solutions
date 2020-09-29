<template>
  <div>
    <canvas
      class="container-canvas"
      width="1000px"
      height="1000px"
      ref="container-canvas"
    />
    <div class="controls">
      <a-button-group>
        <a-button @click="handleRotateImage(-90)">逆时针旋转90°</a-button>
        <a-button @click="handleRotateImage(90)">顺时针旋转90°</a-button>
        <a-button @click="handleSaveImage">保存图片</a-button>
        <a-button @click="handleRotateAndSaveImage(90)"
          >顺时针旋转90°并保存图片</a-button
        >
      </a-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionCanvas",
  data() {
    return {
      canvasElement: null,
      canvasContext: null,
      imageSrc:
        "http://47.100.139.31:2333/srcs/06f1196317abf6cf3e3075cc52ffe8e5.png",
    };
  },
  mounted() {
    this.initCanvasElement();
    this.initCanvasContext();
    this.drawImageInCanvas();
  },
  methods: {
    initCanvasElement() {
      this.canvasElement = this.$refs["container-canvas"];
    },
    initCanvasContext() {
      const context = this.canvasElement.getContext("2d");
      context.translate(500, 500);
      this.canvasContext = context;
    },
    createImageElement() {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = this.imageSrc;
      return image;
    },
    drawImageInCanvas(degree = 0) {
      return new Promise((resolve, reject) => {
        const context = this.canvasContext;
        const angle = (degree / 180) * Math.PI;
        const image = this.createImageElement();
        image.onload = () => {
          context.rotate(angle);
          context.drawImage(image, -500, -500);
          resolve();
        };
      });
    },
    async handleRotateImage(degree) {
      return await this.drawImageInCanvas(degree);
    },
    handleSaveImage() {
      const canvasElement = this.canvasElement;
      const imageURL = canvasElement.toDataURL("image/png");
      const aElement = document.createElement("a");
      aElement.download = "avatar.png";
      aElement.href = imageURL;
      aElement.click();
    },
    async handleRotateAndSaveImage(degree) {
      await this.handleRotateImage(degree);
      this.handleSaveImage();
    },
  },
};
</script>

