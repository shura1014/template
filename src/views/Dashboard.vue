<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../assets/img/avatar.gif" class="user-avator" alt/>
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ userId }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2023-07-13</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>北京</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-button class="grid-button grid-con-1" @click="card">
                <div class="grid-cont-right">
                  <div class="grid-text">card1</div>
                </div>
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-button class="grid-button grid-con-2" @click="card">
                <div class="grid-cont-right">
                  <div class="grid-text">card2</div>
                </div>
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-button class="grid-button grid-con-3" @click="card">
                <div class="grid-cont-right">
                  <div class="grid-text">card3</div>
                </div>
              </el-button>
            </el-card>


          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

const name = "admin";
const userId = "SUPERUSR";

const card = () => {
  console.log('card')
};
</script>

<style scoped>
.grid-button {
  flex: 1;
  align-items: center;
  text-align: center;
  height: 100px;
  width: 100%;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-text {
  font-size: 20px;
  font-weight: bold;
}

.grid-con-1 .grid-text {
  color: rgb(45, 140, 240);
}


.grid-con-2 .grid-text {
  color: rgb(45, 140, 240);
}


.grid-con-3 .grid-text {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 111px;
  height: 92px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.tips-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

</style>
