<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          {{ $t('common.search') }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!--        <el-form-item>-->
        <el-input v-model="query.key" placeholder="学号" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="handleSearch">
          <el-icon>
            <Search/>
          </el-icon>
          {{ $t('common.search') }}
        </el-button>
        <el-button type="primary" @click="addVisible = true">
          <el-icon>
            <Plus/>
          </el-icon>
          {{ $t('common.add') }}
        </el-button>
        <!--        </el-form-item>-->
      </div>
      <el-table :data="tableData" size="small" border class="table" ref="multipleTable"
                header-cell-class-name="table-header">
        <el-table-column prop="id" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>

        <el-table-column label="操作" width="120" align="left">
          <template #default="scope">
            <!--            <el-button text :icons="Delete" class="red" @click="deleteStudent(scope.row)">-->
            <el-button text class="red" @click="deleteStudent(scope.row)" v-permission="['search:delete']">
              <el-icon>
                <Delete/>
              </el-icon>
              {{ $t('common.delete') }}
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.current"
                       :page-size="query.pageSize" :total="pageTotal"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <el-dialog title="新增" v-model="addVisible" width="30%">
      <el-form :model="addForm" :rules="rules" ref="paramValid" label-width="120px">
        <el-form-item label="学号" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="addForm.class"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addItem">新 增</el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElForm, ElMessage, ElMessageBox} from 'element-plus';
import {fetchData} from '@/api';
import {Delete, Search, Plus} from '@element-plus/icons-vue';

const query = reactive({
  key: "",
  current: 1,
  pageSize: 5,
});

interface addForm {
  id: string;
  name: string;
  class: string;
}

const addVisible = ref(false);

const addForm = reactive<addForm>({
  id: "1001",
  name: "wendell",
  class: "20161101"
});


const rules = {
  id: [
    {required: true, message: "学号不能为空", trigger: "blur",},
  ],
  name: [
    {required: true, message: "姓名不能为空", trigger: "blur",},
  ],
  class: [
    {required: true, message: "班级不能为空", trigger: "blur"},
  ],
};

const paramValid = ref(ElForm);

const addItem = () => {
  paramValid.value.validate((valid: any) => {
    if (valid) {
      ElMessage.success("新增成功 " + addForm.name)
    }
  })
}

const tableData = ref([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  fetchData().then(res => {
    tableData.value = res.data.students
  });
};

getData();

// 查询操作
const handleSearch = () => {
  getData();
};


const deleteStudent = (row: any) => {
  ElMessageBox.confirm("确定要删除" + row.name + "吗", "提示", {
    type: 'warning'
  })
      .then(() => {
        ElMessage.success("删除成功 " + row.name)
        getData()
      })
      .catch(() => {
      });
};


// 分页导航
const handlePageChange = (val: number) => {
  query.current = val;
  getData();
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 150px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}


.mr10 {
  margin-right: 10px;
}

.red {
  color: #ff0000;
}

</style>
