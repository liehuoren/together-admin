<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <div class="article">
        <Row class="text-right">
          <Button type="primary" @click="handleAddArticle" class="long-add-btn common-button" long>新建文章</Button>
        </Row>
        <Row class="margin-top-10">
            <Table border :columns="articles" :data="articleData"></Table>
        </Row>
        <Row class="margin-top-10 text-right">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>
        </Row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      ajaxArticleData: [],
      // 初始化信息总条数
      dataCount: 10,
      // 每页显示多少条
      pageSize: 15,
      articles: [
        {
          title: '文章ID',
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
          title: '发布时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let argu = { id: params.row.id };
                    this.$router.push({
                        name: 'article-edit',
                        params: argu
                    });
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error'
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
        limit: 15
      }
    }
  },
  methods: {
    getArticles (pageData) {
      this.$api.getArticleList(pageData).then(res => {
        console.log(res)
        this.articleData = res.data
        this.dataCount =  parseInt(res.headers['x-slice-total-count'])
      })
    },
    handleAddArticle () {
      localStorage.actionType = 'add'
      this.$router.push({
        name: 'article-add'
      })
    },
    remove (index) {
      this.$api.deleteArticle(this.articleData[index].id).then(res => {
        
      })
      this.articleData.splice(index, 1)
    },
    changePage (index) {
      this.pageData.cursor = index
      this.getArticles(this.pageData)
    }
  },
  created () {
    this.getArticles(this.pageData)
  }
}
</script>
