<template>
  <div class="power-manage">
    <div class="view-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="view-content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="power-list-div">
            <el-row>
              <el-col :span="24">
                <el-table :data="tableData" stripe style="width: 100%" :default-sort="{order: 'descending'}"
                          @cell-click="cellClick">
                  <el-table-column prop="name" label="角色列表">
                  </el-table-column>
                  <el-table-column prop="operate" label="" :render-header="renderHeader">
                    <template slot-scope="scope">
                      <el-button class="del-icon" @click.stop="onSubmit"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="power-content-div" v-show="flag">
            <el-tabs v-model="activeName">
              <el-tab-pane label="基本信息" name="first">
                <el-form ref="form" :model="baseform" label-width="80px">
                  <el-form-item label="角色名称">
                    <el-input v-model="baseform.name" placeholder="信息系统管理"></el-input>
                  </el-form-item>
                  <el-form-item label="排序">
                    <el-input v-model="baseform.sortNum" placeholder="1"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="baseform.remark" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 54%;text-align: right;">
                    <el-button type="primary" @click="onSubmit" class="org-info-submit">确定</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="权限信息" name="second">
                <el-tree :data="powerData" class="power-tree" show-checkbox default-expand-all node-key="id" ref="tree"
                         highlight-current :props="defaultProps" @check="handelCheck" @check-change="handelCheckChang">
                </el-tree>
              </el-tab-pane>
              <el-tab-pane label="用户信息" name="third">
                <el-table :data="userInfo" stripe style="width: 100%" :default-sort="{order: 'descending'}">
                  <el-table-column prop="userNum" label="工号" sortable>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" sortable>
                  </el-table-column>
                  <el-table-column prop="" label="部门" sortable>
                  </el-table-column>
                  <el-table-column prop="" label="岗位" sortable>
                  </el-table-column>
                </el-table>
                <div class="page-div">
                  <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage4"
                                   :page-sizes="[100, 200, 300, 400]" :page-size="100"
                                   layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import role from "@/api/role";
  import toTreeData from "@/api/sysOrg"
  import EmployeeManage from "@/api/EmployeeManage";

  export default {
    name: 'power-manage',
    data() {
      let count = 0;
      return {
        dialogVisible: false,
        // table数据
        tableData: [],
        activeName: 'first',
        flag: false,//初始不显示右侧面板
        baseform: { //基本信息
          name: '',
          sortNum: '',
          kid: '',
          remark: '',
          desc: ''
        },
        // 所有的权限数据
        powerData: [],
        rolePowData: [],//当前角色已拥有的权限数据
        defaultProps: {
          label: 'label',
          id: 'id',
          children: 'children',
          parentid: 'parentid',
          parentname: 'parentname',
          remark: 'remark',
          model: 'model'
        },
        // table数据
        userInfo: [],
        // 分页
        currentPage4: 1
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      cellClick(row, column, cell, event) {
        //row表示当前单元格的数据对象
        this.baseform = row;
        this.initUserInfo(row.kid);
        this.flag = true;
        //获取当前角色的权限信息
        role.getSysPageByRoleId(row.kid).then(res=>{
          if (res.status===200){
            console.log(res.data.data)
          }
        })
      },
      onSubmit() {
        //提交表单数据，修改角色基本信息
        role.updateRole(this.baseform).then(res => {
          if (res.status === 200) {
            //成功之后清除表单信息，刷新总列表
            this.$message.success("修改成功");
          }
        })
      },
      // 分页插件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      initUserInfo(data) {
        EmployeeManage.queryUserInfosByRoleId(data).then(res => {
          if (res.status === 200) {
            //初始化员工信息
            this.userInfo = res.data.data;
          }
        })
      },
      handelCheck() {
        if (!this.baseform.kid) {
          this.$message.error("请先保存角色基本信息后再添加角色！")
        } else {

        }
      },
      initRowPages(page) {
        let objpagerow = {
          roleId: this.baseform.kid,//包裹角色id
          kid: page.id,
          model: page.model
        };
        role.savePages(objpagerow).then(res => {
          //
        })
      },

      handelCheckChang(data, flage1, flag2) {
        //flage1 表示当前节点是否被选中，flage2表示当前节点的子树中是否有被选中的节点
        if (flage1 || flag2) {
          //添加
          this.initRowPages(data)
        } else {
          //删除
          this.removeByRoleIdAndPageId(data.parentid);//删除父节点
          this.removeByRoleIdAndPageId(data.id);//删除子节点
        }

        /* if (!flag2){
           if (flag2) {

           }
         }
         if (!flage1){
           //删除权限信息
           console.log(data);
         }*/
        //构造后台添加角色权限对象

      },
      removeByRoleIdAndPageId(pageid) {
        let objpage = {
          kid: pageid,
          roleId: this.baseform.kid
        };
        role.deletePages(objpage).then(res => {

        })
      },
			// render 事件
      renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'div',
          [ 
            h('span', column.label),
            h('i', {
              class:'creat-icon',
              style:'display:inline-block;vertical-align:middle;cursor:pointer;',
							on:{
								click:function() {
									alert(1);
								}
							}
            })
          ],
        );
      }
    },
    mounted() {
      //初始化角色数据
      role.getAllRole().then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data;//初始化角色数据

        }
      });
      //初始化权限信息列表
      role.getAllSysPage().then(res => {
        if (res.status === 200) {
          this.powerData = toTreeData(res.data.data);
        }
      })
    }
  }
</script>

<style scoped>
  .power-list-div {
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
  }


  .power-content-div {
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
    padding: 30px;
  }

  .el-form-item .el-select {
    width: 50%;
  }

  .el-form-item .el-input {
    width: 50%;
  }

  .el-form-item .el-textarea {
    width: 50%;
  }

  .org-info-submit {
    background-color: #554C9D;
    color: white;
    font-size: 14px;
    border: 1px solid #554C9D;
    width: 90px;
    height: 35px;
    line-height: 35px;
    padding: 0;
  }

</style>
