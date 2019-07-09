<template>
  <div class="orgpage">
    <div class="view-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
		
    <el-container class="container-css">
      <el-aside style="background-color: #ffffff; width: 30%;height: 100%">
        <el-tree :data="dataArray" :props="defaultProps" @node-click="handleNodeClick" node-key="id" :default-expanded-keys="keys">
          <span slot-scope="{ node, data }">
        <span>{{node.label }}</span>
        <span>
          <el-button @click.stop="creatOrg(data)" type="primary" size="mini" icon="el-icon-circle-plus-outline" circle title="添加产品分类"></el-button>
          <el-button size="mini" v-show="node.data.parentid!='0'" type="danger" icon="el-icon-delete" circle
                     title="删除产品分类" @click.stop="deleteOrgInfo(node,data)"></el-button>
        </span>
      </span>
        </el-tree>
      </el-aside>
      <el-main style="background-color: #ffffff;margin-left: 3%;padding: 0;">
        <div class="org-edit" v-if="orgDiv">
          <div class="dep-top">
            {{ viewName }}
          </div>
          <div class="dep-content">
            <el-tabs v-model="activeName">
              <el-tab-pane label="产品分类信息" name="first">
                <el-form ref="defaultProps" :model="defaultProps" label-width="80px">
									<span style="position: absolute;left: 0;top: 15px;color: red;">*</span>
									<span style="position: absolute;left: 0;top: 77px;color: red;">*</span>									
									<el-input type=hidden v-model="defaultProps.parentId"></el-input>
                  <el-form-item label="产品分类名称">
                    <el-input v-model="defaultProps.name" placeholder="请输入部门名称，不得超过30个汉字"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input type="textarea" v-model="defaultProps.remark" placeholder="请输入描述，不得超过200个汉字"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 54%;text-align: right;">
                    <el-button type="primary" @click="onSubmit" class="org-info-submit">确定</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="产品明细" name="second" v-if="tabShow">
                <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                  <el-table-column prop="name" label="产品类型名称" sortable width="180">
                  </el-table-column>
                  <el-table-column prop="code" label="产品编号" sortable width="180">
                  </el-table-column>
                  <el-table-column prop="serviceMoney" label="服务费(元)">
                  </el-table-column>
									<el-table-column prop="processName" label="独立流程">
									</el-table-column>
                  <el-table-column prop="status" label="产品状态">
                  </el-table-column>
                </el-table>
                <div class="page-div">
                  <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="pageParams.pageNum"
                                   :page-sizes="[10, 20, 30, 40,50]" :page-size="pageParams.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="totals">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
	import sysProduct from "@/api/sysProduct"

  export default {
    data() {
      return {
        dataArray: [],
        tableData: [],
        defaultProps: {
          label: 'label',
          id: 'id',
          children: 'children',
          parentid: 'parentid',
          parentname: 'parentname',
          remark: 'remark',
          name: ''
        },
        viewName: '新建产品分类信息',
        activeName: 'first',
        tabShow: true,
        orgDiv: false,
        // 分页
        pageParams: {
          pageNum: 1,
          pageSize: 10,
          deptId:''
        },
        node: '',//当前点击的节点,
        keys: [],
        totals: ''
      }
    },
    methods: {
      handleNodeClick(node) {
				this.tabShow = true;
        const name = node.label;
        this.defaultProps.name = name; //直接给defaultProps.label赋值会导致node中的label失效，所以用name来替代
        this.defaultProps.parentname = node.parentname;
        this.defaultProps.id = node.id;
        this.defaultProps.remark = node.remark;
        this.defaultProps.parentid = node.parentid;
        this.orgDiv = true;
        this.viewName = "编辑产品分类信息 / 【" + node.label + "】";
        this.node = node;
        //this.pageParams.deptId = this.node.id
        //this.getUserInfos();//获取用户信息
      },
      deleteOrgInfo(node, data) {// 删除部门
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //查询当前节点下面的用户
          EmployeeManage.queryUserInfosByDeptId(data.id).then(res => { //查询用户信息
            if (res.status === 200) {

              if (res.data.data.length > 0) {
                //表示当前部门下面包含员工，不可删除
                this.$alert('部门下包含人员不可删除，请先清除人员后再进行操作', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                });
								return;
              }
							if(node.childNodes.length > 0){
								//删除部门信息
								this.$alert('部门下包含子部门不可删除，请先清除子部门后再进行操作', '提示', {
								  confirmButtonText: '确定',
								  type: 'warning'
								});
								return;
							}
							deleteOrgInfo(node.data.id).then(res => {
							  if (res.status === 200) {
							    //删除成功后刷新列表
							    this.$message.success("删除成功");
							    const parent = node.parent;
							    const children = parent.data.children || parent.data;
							    const index = children.findIndex(d => d.id === data.id);
							    children.splice(index, 1);
							    //隐藏编辑页
							    this.tabShow = true;
							    this.orgDiv = false;
							  } else {
							    this.$message.success("删除失败")
							  }
							});
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      creatOrg(data) { //表示当前操作节点
        this.node = data;
        this.orgDiv = true;
        this.tabShow = false;
        this.defaultProps.name = '';
        this.defaultProps.parentname = data.label
        this.defaultProps.id = ''
        this.defaultProps.remark = ""
        this.defaultProps.parentid = data.id
      },
      onSubmit() {
				if(this.defaultProps.name == ''){
					this.$alert('请填写产品分类','提示',{
						confirmButtonText:'确定',
						type:'warning'
					});
					return;
				}
        //添加产品分类
        let data = {
          name: this.defaultProps.name,
          parentId: this.defaultProps.parentid,
          remark: this.defaultProps.remark,
          status: 1,
          kid: this.defaultProps.id
        }
        if (!data.kid) {
          //表示添加
          sysProduct.addProductType(data).then(res => {
            //添加成功之后，清空输入信息
            let data = res.data.data;
            this.defaultProps.name = '';
            this.defaultProps.id = ''
            this.defaultProps.remark = ""
            this.defaultProps.parentid = res.data.data.parentId
            if (res.status === 200) {
              this.$message.success("添加成功");
              const newChild = {
                id: data.kid, label: data.name, children: [], parentid: data.parentId,
                parentname: 'parentname', remark: data.remark
              };
              if (!this.node.children) {
                this.$set(this.node, 'children', []);
              }
              this.node.children.push(newChild);
            } else {
              this.$message.success("添加失败");
            }
            this.keys.push(this.node.id);//展开父节点
          })
        } else {
          //表示修改
          sysProduct.updateProductType(data).then(res => {
            if (res.status === 200) {
              //表示修改成功
              this.$message.success("修改成功");
              this.node.label = res.data.data.name
              this.node.remark = res.data.data.remark
            } else {
              this.$message.success("修改失败");
            }
          })
        }

      },

      //改变每页显示数量
      handleSizeChange(val) {
        this.pageParams.pageSize = val
        this.pageParams.deptId=this.node.id
        //获取数据
        //this.getUserInfos();
      },
      //更改当前页码
      handleCurrentChange(val) {
        this.pageParams.pageNum = val
        this.pageParams.deptId=this.node.id
        //获取数据
        //this.getUserInfos();
      },
      //获取分类下面的所有产品
     /* getUserInfos() {
        EmployeeManage.queryUserInfosByDeptId(this.pageParams).then(res => { //查询用户信息
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.totals = res.data.totalCount;
          }
        })
      }*/
    },
    mounted() {
      sysProduct.getAllProductType().then(res => {
        if (res) {
          let parent = [];
          this.dataArray = sysProduct.toTreeData(res.data.data);
        }
      })

    }
  };
</script>
<style scoped="scoped">
  .left-css {
    width: 500px;
    height: 810px;
  }

  .container-css {
    margin: 2%;
    height: 550px;
  }

  .el-button--mini.is-circle {
    margin-left: 25%;
    padding: 0.5px;
  }


  .org-edit {
    background-color: white;
  }

  .dep-top {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 32px;
    color: #625C65;
    font-size: 14px;
    border-bottom: 1px dashed #E5E0E9;
  }

  .dep-content {
    padding: 0 30px 30px;
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
