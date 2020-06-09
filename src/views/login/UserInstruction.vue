<template>
  <div>
    <!--<h2>欢迎使用国家文物局综合行政管理平台，本系统为非涉密信息系统，请遵守以下保密规定：</h2>
    <p>1.严禁在本系统上存储、处理国家秘密信息。</p>
    <p>2.严禁在本系统客户端及与之相连的软盘、U盘、光盘、移动硬盘存储国家秘密信息。</p>
    <p>3.严禁将涉密计算机、涉密存储设备接入本系统。</p>
    <p>4.在本系统上处理非涉密敏感信息，应报本司局主管保密单位的领导审核。</p>
    <p>5.发现本系统异常现象，请及时与信息中心联系，电话：010-56792148。</p>-->
  </div>
</template>

<style lang="scss" scoped>
  @media screen and (min-width: 1336px) and (max-width: 1615px) {
    div {
      max-width: 500px;

      h2, p {
        line-height: 1.7;
      }
    }
  }

  @media screen and (max-width: 1335px) {
    div {
      display: none;
    }
  }

  div {
    color: #FFF;
    /*padding: 10px 20px;*/
    /*background-color: rgba(255, 255, 255, 0.3);*/

    h2 {
      font-size: 18px;
    }
  }
</style>
