<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="banner">
        <div class="table-add"><Button @click="handleAddBanner" class="long-add-btn common-button" long>添加广告</Button></div>
        <div>
            <Table border :columns="banners" :data="bannerData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>

        </div>
    </div>
</template>

<script>
let testData = {
  'comments': [
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    },
    {
      id: '1',
      articleId: '1',
      title: '烈火人',
      advertUrl: 'http://www/baidu.com',
      createTime: '2017-12-13 12:03:20'
    }
  ]
}
export default {
  name: 'banner',
  data () {
    return {
      ajaxBannerData: [],
      // 初始化信息总条数
      dataCount: 15,
      // 每页显示多少条
      pageSize: 10,
      banners: [
        {
          title: '广告标识',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '文章标识',
          key: 'articleId',
          width: 90,
          align: 'center'
        },
        {
          title: '广告标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '广告链接',
          key: 'advertUrl',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '详细'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      bannerData: []
    }
  },
  methods: {
    handleAddBanner () {
      localStorage.actionType = 'add'
      this.$router.push({
        name: 'bannerAdd'
      })
    },
    show (index) {
      localStorage.actionType = 'view'
      localStorage.bannerId = this.bannerData[index].id
      localStorage.bannerArticle = this.bannerData[index].articleId
      localStorage.bannerTitle = this.bannerData[index].title
      localStorage.bannerUrl = this.bannerData[index].advertUrl
      localStorage.bannerTime = this.bannerData[index].createTime
      this.$router.push({
        name: 'bannerView'
      })
    },
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.bannerId = this.bannerData[index].id
      localStorage.bannerArticle = this.bannerData[index].articleId
      localStorage.bannerTitle = this.bannerData[index].title
      localStorage.bannerUrl = this.bannerData[index].advertUrl
      localStorage.bannerTime = this.bannerData[index].createTime
      this.$router.push({
        name: 'bannerEdit'
      })
    },
    remove (index) {
      this.bannerData.splice(index, 1)
    },
    handleListApproveBanner () {
      // 保存取到的所有数据
      this.ajaxBannerData = testData.comments
      this.dataCount = testData.comments.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.comments.length < this.pageSize) {
        this.bannerData = this.ajaxBannerData
      } else {
        this.bannerData = this.ajaxBannerData.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.bannerData = this.ajaxBannerData.slice(_start, _end)
    }
  },
  created () {
    this.handleListApproveBanner()
  }
}
</script>
