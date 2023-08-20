<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="sidebar.collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ $t(item.title) }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"

              >
                <template #title>{{ $t(subItem.title) }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ $t(threeItem.title) }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" v-permission="['menu:'+item.index]">
                {{ $t(subItem.title) }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" v-permission="['menu:'+item.index]">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ $t(item.title) }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useSidebarStore} from '@/store/sidebar';
import {useRoute} from 'vue-router';
import {text} from "@/utils/i18n";

class Menu {
  icon: string = ""
  index: string = ""
  title: string = ""
  subs?: Menu[]
}

const items: Menu[] = [
  {
    icon: "HomeFilled",
    index: "/dashboard",
    title: "sidebar.dashboard",
  },
  {
    icon: "Search",
    index: "/search",
    title: "sidebar.search",
  }, {
    icon: "Warning",
    index: "/403",
    title: "403",
  },
];

const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});

const sidebar = useSidebarStore();

</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
