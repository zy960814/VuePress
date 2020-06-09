<template>
  <div class="page-footer">
    <ul>
      <li>Copyright Reserved 2014-2019 版权所有 国家文物局 京ICP备13034673号-1</li>
      <li>网站管理：国家文物局 技术服务电话：86-18510525562</li>
      <li>网站标识码：bm72000002</li>
      <li>
        <a href="//bszs.conac.cn/sitename?method=show&id=0C1EC20C5B04404AE053012819AC0B79" target="_blank">
          <img src="//dcs.conac.cn/image/red.png" alt="党政机关">
        </a>
        <a href="//pucha.kaipuyun.cn/exposure/jiucuo.html?site_code=bm72000002&url=http%3A%2F%2Fwww.sach.gov.cn%2F" target="_blank">
          <img src="//www.ncha.gov.cn/picture/0/1609210945420343214.png" alt="政府网站找错">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "PageFooter"
  }
</script>

<style lang="scss" scoped>
 
  .page-footer {
    
    color: #333;
    text-align: center;
    font-size: 14px;
    padding: 15px 0 8px;

    li {
      line-height: 1.8;

      &:last-child {
        height: 80px;

        img {
          vertical-align: middle;
        }
      }
    }
  }
</style>
