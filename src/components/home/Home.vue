<template>
  <div class="home">
    <div class="container">
      <div class="top">多生物特征融合系统</div>
      <ul class="main">
        <li>
          <router-link :to="{name: 'task', params:{type:'1'}}">
            <div class="bg">
              <img src="../../assets/image/index_icon1.png">
              <div class="description">
                <!--<a href="/biosignatureManage/v1/task" target="_task">-->
                  信息比对<br/>任务管理
                <!--</a>-->

              </div>
            </div>
          </router-link>

        </li>
        <li>
          <a href="/biosignatureManage/v1/person" target="_person">
            <div class="bg">
              <img src="../../assets/image/index_icon2.png">
              <div class="description">
                <!--<a href="/biosignatureManage/v1/person" target="_person">-->
                  多生物特征<br/>信息维护
                <!--</a>-->
              </div>
            </div>
          </a>

        </li>
        <li>
          <a href="/biosignatureManage/v1/result" target="_result">
            <div class="bg">
              <img src="../../assets/image/index_icon3.png">
              <div class="description">
                  多生物特征 <br>比中信息维护
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="/biosignatureManage/v1/identity" target="_identity">
            <div class="bg">
              <img src="../../assets/image/index_icon4.png">
              <div class="description">
                  人员重复身份<br/> 信息维护
              </div>
            </div>
          </a>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import request from '@/utils/jquery-1.11.3.min'
    $(".bg").hover(function () {
		$(this).find("img").addClass("rotate");
    },function () {
        $(this).find("img").removeClass("rotate");
    })

  export default {
    name: 'home',
    data() {
      return {
       
      }
    },
    methods: {
      task(){
        this.$router.push('/task');
      }
    }
  }
</script>
<style scoped>

</style>



