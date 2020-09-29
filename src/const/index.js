import colors from 'color-name';

export const Title = 'Quizs & Solutions of Unisolutions';

export const Github =
  'https://github.com/likeke1997/unisolutions-quizs-and-solutions/';

export const Quizs = {
  scrollbar: {
    path: 'scrollbar',
    title: '实现滚动条功能',
    desc:
      '设计一个容器，当容器中内容高于容器高度时，出现滚动条。滚动条样式自定义，可实现上下拖动、鼠标滚动和回到顶部等功能。',
  },
  canvas: {
    path: 'canvas',
    title: '实现canvas加载和旋转图片',
    desc:
      '在canvas容器中加载一张图片，并设计一个按钮，实现点击按钮后，图片在canvas中旋转90度并保存到本地。',
  },
};

export const Colors = Object.keys(colors).map((color) => {
  return { value: color, label: color };
});
