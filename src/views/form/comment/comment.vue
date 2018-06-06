<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="comment">
        <div>
            <Table border :columns="comments" :data="commentData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>

        </div>
    </div>
</template>

<script>

export default {
  name: 'comment',
  data () {
    return {
      ajaxCommentData: [],
      // 初始化信息总条数
      dataCount: 15,
      // 每页显示多少条
      pageSize: 10,
      comments: [
        {
          title: '评论标识',
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
          title: '用户标识',
          key: 'userId',
          width: 90,
          align: 'center'
        },
        {
          title: '是否已审核',
          key: 'audit',
          width: 100,
          align: 'center'
        },
        {
          title: '是否置顶',
          key: 'toTop',
          width: 90,
          align: 'center'
        },
        {
          title: '评论内容',
          key: 'content',
          width: 200,
          align: 'center'
        },
        {
          title: '评论时间',
          key: 'createTime',
          width: 155,
          align: 'center'
        },
        {
          title: '回复内容',
          key: 'replyContent',
          width: 200,
          align: 'center'
        },
        {
          title: '回复时间',
          key: 'replyTime',
          width: 155,
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
              }, '回复'),
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
      commentData: [],
      pageData: {
        cursor: 1,
        limit: 10
      }
    }
  },
  methods: {
    show (index) {
      localStorage.actionType = 'view'
      localStorage.commentId = this.commentData[index].id
      localStorage.commentAudit = this.commentData[index].audit
      localStorage.commentToTop = this.commentData[index].toTop
      localStorage.commentUser = this.commentData[index].userId
      localStorage.commentArticle = this.commentData[index].articleId
      localStorage.commentContent = this.commentData[index].content
      localStorage.commentTime = this.commentData[index].createTime
      localStorage.commentReply = this.commentData[index].replyContent
      this.$router.push({
        name: 'commentView'
      })
    },
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.commentId = this.commentData[index].id
      localStorage.commentAudit = this.commentData[index].audit
      localStorage.commentToTop = this.commentData[index].toTop
      localStorage.commentUser = this.commentData[index].userId
      localStorage.commentArticle = this.commentData[index].articleId
      localStorage.commentContent = this.commentData[index].content
      localStorage.commentTime = this.commentData[index].createTime
      localStorage.commentReply = this.commentData[index].replyContent
      this.$router.push({
        name: 'commentEdit'
      })
    },
    remove (index) {
      this.commentData.splice(index, 1)
    },
    getDiscussList (pageData) {
      this.$api.getDiscussList(pageData).then(res => {
        console.log(res)
        this.commentData = res.data
        this.dataCount = res.headers['x-slice-total-count']
      })
    },
    changePage (index) {
      this.pageData.cursor = index
      this.getDiscussList (this.pageData)
    }
  },
  created () {
    this.getDiscussList(this.pageData)
  }
}
</script>
