<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">
        {{ $t("login.title") }}
        <lang class="set-language"/>
      </div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" :placeholder="$t('login.username')">
            <template #prepend>
              <el-button icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" :placeholder="$t('login.password')" v-model="param.password"
                    @keyup.enter="submitForm(login)">
            <template #prepend>
              <el-button icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">{{ $t('login.button-name') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue"
import {useRouter} from "vue-router"
import type {FormInstance, FormRules} from 'element-plus'
import {useTagsStore} from '@/store/tags'
import {usePermissionStore} from '@/store/permission'
import lang from '@/components/lang.vue';
import {text} from "@/utils/i18n";
import {commonRequest, Urls} from "@/api";

const router = useRouter();
const param = reactive({
  username: "admin",
  password: "123456",
});

const rules: FormRules = {
  userId: [
    {required: true, message: text("login.username-check"), trigger: "blur"},
  ],
  password: [
    {required: true, message: text("login.password-check"), trigger: "blur"},
  ],
};

const login = ref<FormInstance>();

interface UserInfo {
  userName: string
  age: number
}

const permission = usePermissionStore()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      // commonRequest<UserInfo>(Urls.Login, param, "success").then(function (res) {
      //   if (res) {
      //     localStorage.setItem("user", res.userName)
      //     router.push('/');
      //   }
      // })
      localStorage.setItem("user", "admin")
      permission.SetPermission({roles: ["1001"], perms: ["search:delete", "menu:/dashboard", "menu:/search"]})
      router.push('/');
    }
  });
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #2b499d;
  border-bottom: 1px solid #ddd;

  .set-language {
    color: #fff;
    position: absolute;
    top: 1px;
    font-size: 18px;
    right: 10px;
    cursor: pointer;
  }
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>