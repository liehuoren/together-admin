<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <div class="article">
        <div class="table-add"><Button @click="handleAddArticle" class="long-add-btn common-button" long>新建文章</Button></div>
        <div>
            <Table border :columns="articles" :data="articleData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
let testData = {
  'articles': [
         
  ]
}
export default {
  data () {
    return {
      ajaxArticleData: [],
      // 初始化信息总条数
      dataCount: 20,
      // 每页显示多少条
      pageSize: 10,
      articles: [
        {
          title: '文章标识',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '文章标题',
          key: 'title',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'article'
                }
              }),
              h('strong', params.row.title)
            ])
          }
        },
        {
          title: '文章作者',
          key: 'author',
          align: 'center'
        },
        {
          title: '文章简介',
          key: 'introduction',
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
      articleData: [],
      pageData: {
        cursor: 1,
        limit: 10
      }
    }
  },
  methods: {
    getArticles (pageData) {
      this.$api.getArticleList(pageData).then(res => {
        console.log(res)
        this.articleData = res.data
        this.dataCount = res.headers['x-slice-total-count']
      })
    },
    handleAddArticle () {
      localStorage.actionType = 'add'
      this.$router.push({
        name: 'articleAdd'
      })
    },
    show (index) {
      localStorage.actionType = 'view'
      localStorage.articleId = this.articleData[index].id
      this.$router.push({
        name: 'articleView'
      })
    },
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.articleId = this.articleData[index].id
      this.$router.push({
        name: 'articleEdit'
      })
    },
    remove (index) {
      this.articleData.splice(index, 1)
    },
    // 获取文章信息
    handleListApproveArticle () {
      // 保存取到的所有数据
      this.ajaxArticleData = testData.articles
      this.dataCount = testData.articles.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.articles.length < this.pageSize) {
        this.articleData = this.ajaxArticleData
      } else {
        this.articleData = this.ajaxArticleData.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      this.pageData.cursor = index
      this.getArticles(this.pageData)
    }
  },
  created () {
    this.getArticles(this.pageData)
    this.handleListApproveArticle()
  }
}
</script>
