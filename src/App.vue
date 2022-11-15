<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch, reactive } from "vue";
import { useAxios } from "./stores/axios";
import { useStore } from "./stores/user.js";
import { loadFull } from "tsparticles";
import { ElMessage } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const axios = useAxios();
const scroll = ref(null);
const height = ref(0);
const main = ref(null);
const loginfo = reactive({
  username: "",
  password: "",
});
const sideshow = ref(false);
const vis = ref(false);
onMounted(() => {
  detect();
  window.addEventListener("resize", detect);
  if (store.logged) {
    if (store.identity === "owner" && route.path == "/") {
      store.centershow = false;
      sideshow.value = true;
    } else if (store.identity === "tenant" && route.path == "/") {
      store.centershow = false;
      sideshow.value = true;
    }
  } else {
    store.centershow = true;
  }
});
const options = {
  background: {
    color: {
      value: "#ffffff",
    },
  },
  fpsLimit: 120,
  interactivity: {
    modes: {
      bubble: {
        distance: 300,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#000000",
    },
    links: {
      color: "#000000",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};
const detect = function () {
  height.value = window.innerHeight;
  setTimeout(() => {
    scroll.value.update();
  }, 100);
};
const back = () => {
  store.last = store.identity;
  store.identity = null;
  router.push("/");
  bdisabled.value = true;
  store.logged = false;
  store.name = "";
  setTimeout(() => {
    sideshow.value = false;
  }, 50);
  setTimeout(() => {
    store.centershow = true;
    store.last = null;
  }, 250);
  setTimeout(() => {
    bdisabled.value = false;
  }, 500);
};
const check = () => {
  axios
    .post(store.url + "/login")
    .then((res) => {
      if (res.status == 200) {
        let response = JSON.parse(res.data);
        console.log(response.reason);
        if (response.isLogin) {
          vis.value = false;
          store.logged = true;
          store.identity = !response.identity ? "owner" : "tenant";
          store.name = response.data.name;
          store.centershow = false;
          router.push("/" + store.identity);
          bdisabled.value = true;
          setTimeout(() => {
            sideshow.value = true;
            loginfo.username = "";
            loginfo.password = "";
          }, 250);
          setTimeout(() => {
            bdisabled.value = false;
          }, 500);
        } else console.log(response.reason);
      }
    })
    .catch(() => {});
};

const go = (path, reg = false) => {
  if (loginfo.username != "" && loginfo.password != "") {
    axios
      .post(store.url + "/login", loginfo)
      .then((res) => {
        if (res.status == 200) {
          let response = res.data;
          if (!response.isLogin) {
            ElMessage.error(response.reason);
          } else {
            console.log(res.data);
            vis.value = false;
            store.logged = true;
            store.identity = response.identity == "1" ? "owner" : "tenant";
            store.name = response.data.name;
            store.centershow = false;
            router.push("/" + store.identity);
            bdisabled.value = true;
            setTimeout(() => {
              sideshow.value = true;
              loginfo.username = "";
              loginfo.password = "";
            }, 250);
            setTimeout(() => {
              bdisabled.value = false;
            }, 500);
          }
        } else {
          ElMessage.error("疑似网络错误");
        }
      })
      .catch(() => {
        ElMessage.error("内部错误");
      });
  } else {
    ElMessage.error("用户名或密码不能为空");
  }
  /* if (loginfo.username == "guchen" && loginfo.password == "123456") {
    if (!reg) ElMessage.success("登录成功");

    vis.value = false;
    store.logged = true;
    store.identity = path;
    store.name = "顾晨";
    store.centershow = false;
    router.push("/" + path);
    bdisabled.value = true;

    setTimeout(() => {
      sideshow.value = true;
      loginfo.username = "";
      loginfo.password = "";
    }, 300);
    setTimeout(() => {
      bdisabled.value = false;
    }, 500);
  } else ElMessage.error("用户名或密码错误"); */
};

const bdisabled = ref(false);
async function particlesInit(engine) {
  await loadFull(engine);
}
router.beforeEach((to, from, next) => {
  if (!store.logged && to.path != "/") {
    next("/");
  } else {
    if (to.path.search(store.identity) == -1 && store.identity != null) {
      next("/" + store.identity);
    } else {
      next();
    }
  }
});
check();
</script>

<template>
  <div style="height: 100%; width: 100%">
    <Transition
      :duration="1000"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <Particles
        v-if="!store.logged"
        id="tsparticles"
        :particlesInit="particlesInit"
        :options="options"
      />
    </Transition>
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="center">房屋租赁服务系统</div>
        <el-button
          type="success"
          @click="vis = true"
          class="right"
          v-if="!store.logged"
          :disabled="bdisabled"
          >登录
        </el-button>
        <el-button
          type="danger"
          class="right"
          @click="back"
          :disabled="bdisabled"
          v-else
          >注销</el-button
        >
      </el-header>
      <el-container style="height: 100%">
        <Transition
          :duration="200"
          enter-active-class="animate__animated animate__lightSpeedInLeft"
          leave-active-class="animate__animated animate__slideOutLeft"
        >
          <el-aside style="height: 100%" width="200px" v-if="sideshow">
            <el-menu :default-active="route.path" style="height: 100%" router>
              <el-menu-item
                :index="store.identity == 'owner' ? '/owner' : '/tenant'"
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>主页</span>
              </el-menu-item>

              <el-menu-item
                index="/owner/house"
                v-if="
                  route.path.search('owner') != -1 ||
                  store.last == 'owner' ||
                  store.identity == 'owner'
                "
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋信息登记</span>
              </el-menu-item>

              <el-menu-item
                index="/tenant/rent"
                v-if="
                  route.path.search('tenant') != -1 ||
                  store.last == 'tenant' ||
                  store.identity == 'tenant'
                "
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋租赁</span>
              </el-menu-item>
              <el-menu-item
                index="/owner/state"
                v-if="
                  route.path.search('owner') != -1 ||
                  store.last == 'owner' ||
                  store.identity == 'owner'
                "
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋状态变更</span>
              </el-menu-item>
              <el-menu-item
                :index="
                  store.identity == 'owner' ? '/owner/charge' : '/tenant/charge'
                "
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>手续费缴纳</span>
              </el-menu-item>
              <el-menu-item
                :index="
                  store.identity == 'owner' ? '/owner/info' : '/tenant/info'
                "
                class="menucenter"
              >
                <el-icon>
                  <Edit />
                </el-icon>
                <span>信息修改</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </Transition>
        <el-main ref="main" style="height: 100%; padding-left: 30px">
          <el-scrollbar
            ref="scroll"
            view-style="height: 100%"
            :max-height="height - 100 + 'px'"
          >
            <RouterView v-slot="{ Component }">
              <Transition mode="out-in" name="el-zoom-in-top">
                <component
                  @registered="
                    (a, b) => {
                      loginfo.username = a;
                      loginfo.password = b;
                      go('owner', true);
                    }
                  "
                  :height="height"
                  :is="Component"
                />
              </Transition>
            </RouterView>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      id="login"
      class="centerdia"
      v-model="vis"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      ><template #header><div class="submenu">用户登录</div></template>
      <el-form-item label="账户"
        ><el-input v-model="loginfo.username"></el-input></el-form-item
      ><el-form-item label="密码"
        ><el-input v-model="loginfo.password"></el-input
      ></el-form-item>
      <div class="centerbuttons">
        <el-button type="primary" @click="go('owner')">登录</el-button
        ><el-button type="danger" @click="vis = false">返回</el-button>
      </div></el-dialog
    >
  </div>
</template>

<style scoped>
.centerbuttons {
  display: flex;
  justify-content: center;
}
.center {
  line-height: 60px;
  padding-left: 40px;
  display: inline;

  user-select: none;
}

.header {
  background-color: white;
  color: var(--el-color-primary);
  border-bottom: 2px solid rgb(197, 197, 197);
  position: relative;
  z-index: 100;
}

.right {
  float: right;
  margin-top: 13px;
  margin-right: 5%;
}

span {
  user-select: none;
  width: 100%;
  justify-content: center;
  display: flex;
}
:deep(.centerdia) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  max-width: 800px;
}
:deep(#login) {
  max-width: 400px !important;
}
</style>
<style>
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
