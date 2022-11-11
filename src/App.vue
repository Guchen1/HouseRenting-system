<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch, reactive } from "vue";
import { useStore } from "./stores/user.js";
import { loadFull } from "tsparticles";
import { ElMessage } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const loginfo = reactive({
  username: "",
  password: "",
});
const sideshow = ref(false);
const vis = ref(false);
onMounted(() => {
  if (store.logged) {
    if (store.identity === "owner" && route.path == "/") {
      router.push("/owner");
      store.centershow = false;
      sideshow.value = true;
    } else if (store.identity === "tenant" && route.path == "/") {
      router.push("/tenant");
      store.centershow = false;
      sideshow.value = true;
    }
  } else {
    router.push("/");
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
const back = () => {
  router.push("/");
  bdisabled.value = true;
  store.logged = false;
  sideshow.value = false;
  setTimeout(() => {
    store.centershow = true;
  }, 250);
  setTimeout(() => {
    store.identity = null;
    bdisabled.value = false;
  }, 500);
};
const go = (path) => {
  if (loginfo.username == "guchen" && loginfo.password == "123456") {
    ElMessage.success("登录成功");
    vis.value = false;
    store.logged = true;
    store.identity = path;
    store.centershow = false;
    router.push("/" + path);
    bdisabled.value = true;

    setTimeout(() => {
      sideshow.value = true;
    }, 250);
    setTimeout(() => {
      bdisabled.value = false;
    }, 500);
  } else ElMessage.error("用户名或密码错误");
};
watch(
  () => route.path,
  (path) => {
    if (path === "/" && store.logged) {
      router.push("/" + store.identity);
    }
  }
);
const bdisabled = ref(false);
async function particlesInit(engine) {
  await loadFull(engine);
}
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
          :duration="250"
          enter-active-class="animate__animated animate__lightSpeedInLeft"
          leave-active-class="animate__animated animate__slideOutLeft"
        >
          <el-aside style="height: 100%" width="200px" v-if="sideshow">
            <el-menu :default-active="route.path" style="height: 100%" router>
              <el-menu-item
                :index="store.identity == 'owner' ? '/owner' : '/tenant'"
                v-if="store.identity == 'owner'"
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>主页</span>
              </el-menu-item>

              <el-menu-item
                index="/owner/house"
                v-if="store.identity == 'owner'"
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋信息登记</span>
              </el-menu-item>

              <el-menu-item
                index="/tenant/rent"
                v-if="store.identity == 'tenant'"
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋租赁</span>
              </el-menu-item>
              <el-menu-item
                index="/owner/state"
                v-if="store.identity == 'owner'"
                class="menucenter"
              >
                <el-icon>
                  <Menu />
                </el-icon>
                <span>房屋状态变更</span>
              </el-menu-item>
              <el-menu-item
                index="/owner/charge"
                v-if="store.identity == 'owner'"
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
                v-if="store.identity == 'owner'"
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
        <el-main style="height: 100%">
          <RouterView v-slot="{ Component }">
            <Transition mode="out-in" name="el-zoom-in-top">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
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
.centerdia {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  max-width: 800px;
}
</style>
