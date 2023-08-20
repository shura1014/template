<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="sidebar.collapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
    <div class="logo">{{$t("app-title")}}</div>
    <div class="header-right">
      <div class="header-user-con">
        <el-space size="small">
          <el-tooltip content="字体" effect="dark" placement="bottom">
            <Font id="font-select" class="right-menu-item hover-effect" />
          </el-tooltip>

          <lang class="right-menu-item hover-effect"/>

          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../assets/img/avatar.gif" />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSidebarStore } from "@/store/sidebar";
import { useRouter } from "vue-router";
import Lang from "@/components/lang.vue";
import Font from "@/components/font.vue";
const username = "admin";

const sidebar = useSidebarStore();
const collapseChange = () => {
  sidebar.handleCollapse();
}; // 侧边栏折叠

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChange();
  }
});
const infoVisible = ref(false);

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
  if (command == "loginout") {
    localStorage.removeItem("user");
    router.push("/login");
  } else if (command == "user") {
    router.push("/user");
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(200, 215, 215, 100);
      }
    }
  }
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
