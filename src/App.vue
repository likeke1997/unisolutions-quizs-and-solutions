<template>
  <div id="app">
    <a-card
      class="card"
      :title="Title"
      :tabList="tab.list"
      :activeTabKey="tab.active"
      @tabChange="handleChangeTab"
    >
      <template slot="extra" class="card-extra">
        <a-button
          slot="extra"
          type="primary"
          icon="github"
          @click="handleOpenGithub"
          >查看源代码</a-button
        >
      </template>

      <div class="card-content">
        <router-view />
      </div>
      <div class="card-desc">
        <a-divider orientation="left">题目描述</a-divider>
        <p>{{ Quizs[tab.active].desc }}</p>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Title, Github, Quizs } from "@/const";
export default {
  name: "App",
  data() {
    return {
      Title,
      Github,
      Quizs,
      tab: {
        list: [],
        active: "",
      },
    };
  },
  created() {
    this.initTabList();
  },
  methods: {
    initTabList() {
      const tabList = this.tab.list;
      const quizsKeys = Object.keys(Quizs);
      quizsKeys.forEach((key, index) => {
        const quiz = Quizs[key];
        tabList.push({
          key,
          tab: `${index + 1}.${quiz.title}`,
        });
      });
      this.tab.active = tabList[0].key;
    },
    handleChangeTab(key) {
      this.tab.active = key;
      this.$router.push(Quizs[key].path);
    },
    handleOpenGithub() {
      window.open(Github);
    },
  },
};
</script>

<style lang="less">
#app {
  padding: 32px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: whitesmoke;
  .card {
    width: 100%;
    height: 100%;
    .card-extra {
    }
    .card-content {
    }
    .card-desc {
    }
  }
}

.ant-card-head-title {
  font-weight: 800 !important;
}
.ant-form-item {
  width: 320px !important;
}
</style>
