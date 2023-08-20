<template>
  <el-dropdown class="font-select" trigger="click" @command="handleSetFont">
    <div class="font-select__icon">
      <svg-icon class-name="size-icon" icon-class="font"/>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
            v-for="item of fontOptions"
            :key="item.value"
            :disabled="(fontName || 'Light') == item.name"
            :command="item"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {ElMessage} from 'element-plus';

import SvgIcon from '@/components/Svg.vue';
import useAppStore from '@/store/app';

const app = useAppStore();

const fontName = computed(() => app.font);

const fontOptions = ref([
  {name: 'PuHui-Light', value: 'AlibabaPuHuiTi-3-45-Light'},
  {name: 'PuHui-Thin', value: 'AlibabaPuHuiTi-3-35-Thin'},
  {name: 'JetBrains-Light', value: 'JetBrainsMono-Light'},
  {name: 'JetBrains-LightItalic', value: 'JetBrainsMono-LightItalic'},
  {name: 'Bold', value: 'JetBrainsMono-Bold'},
  {name: 'Italic', value: 'JetBrainsMono-Italic'},
  {name: 'Bold-Italic', value: 'JetBrainsMono-Bold-Italic'},
  {name: 'ExtraBold', value: 'JetBrainsMono-ExtraBold'},
  {name: 'Regular', value: 'JetBrainsMono-Regular'},
  {name: 'Medium', value: 'JetBrainsMono-Medium'},
  {name: 'Medium-Italic', value: 'JetBrainsMono-Medium-Italic'},
]);
const node = document.body;
node.style.setProperty('font-family', "AlibabaPuHuiTi-3-45-Light");

function handleSetFont(font: { name: string, value: string }) {
  node.style.setProperty('font-family', font.value);
  app.setFont(font.name);
  ElMessage.success('字体切换成功');
}
</script>

<style lang="scss" scoped>
.font-select__icon {
  line-height: 50px;
}
</style>
