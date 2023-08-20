<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {ElConfigProvider} from 'element-plus';
// ElementPlus语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import {computed, ref, watch} from 'vue';
import useAppStore from "@/store/app";

const app = useAppStore();

const language = computed(() => app.language);

const locale = ref();
watch(
    language,
    (value) => {
      locale.value = value == 'en' ? en : zhCn;
    },
    {
      // 初始化立即执行
      immediate: true,
    }
);</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
