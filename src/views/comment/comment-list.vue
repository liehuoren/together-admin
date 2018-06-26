<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div class="comment">
        <Row>
            <Table border :columns="comments" :data="commentData"></Table>
        </Row>
        <Row class="margin-top-10 text-right">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>
        </Row>
    </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      ajaxCommentData: [],
      // 初始化信息总条数
      dataCount: 10,
      // 每页显示多少条
      pageSize: 15,
      comments: [
        {
          title: '评论ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '文章ID',
          key: 'articleId',
          align: 'center'
        },
        {
          title: '用户昵称',
          key: 'user',
          align: 'center',
          render: (h,params)=>{ 
            let user = params.row.user
            return h('span',{
              props:{}
              },user.nickname)
          }
        },
        {
          title: '评论内容',
          key: 'content',
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
          align: 'center'
        },
        {
          title: '回复时间',
          key: 'replyTime',
          width: 155,
          align: 'center'
        },
        {
          title: '是否已审核',
          key: 'audit',
          width: 100,
          align: 'center',
          render: (h,params)=>{
            let text=''
            if(params.row.audit){text = '已审核'}
            else{text = '未审核'}
            return h('Button',{
              props:{
                type: 'text'
              },
              on: {
                click: () => {
                  this.audit(params.index)
                }
              }
              }, text)
          }
        },
        {
          title: '是否置顶',
          key: 'toTop',
          width: 90,
          align: 'center',
          render: (h,params)=>{
            let text=''
            if(params.row.toTop){text = '置顶'}
            else{text = '不置顶'}
            return h('Button',{
              props:{
                type: 'text'
              },
              on: {
                click: () => {
                  this.toTop(params.index)
                }
              }
              }, text)
          }
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
                  type: 'primary'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                    click: () => {
                      this.reply(params.index)
                    }
                }
              }, '回复'),
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
      commentData: [],
      pageData: {
        cursor: 1,
        limit: 10
      },
      commentParam: {
        audit: '',
        toTop: '',
        replyContent: ''
      }
    }
  },
  methods: {
    remove (index) {
      this.$api.deleteDiscuss(this.commentData[index].id)
      this.commentData.splice(index, 1)
    },
    getDiscussList (pageData) {
      this.$api.getDiscussList(pageData).then(res => {
        this.commentData = res.data
        this.dataCount = parseInt(res.headers['x-slice-total-count'])
      })
    },
    changePage (index) {
      this.pageData.cursor = index
      this.getDiscussList (this.pageData)
    },
    reply (index) {
      let id = this.commentData[index].id
      let commentParam = {
        replyContent : this.commentData[index].replyContent
      }
      this.$Modal.confirm({
          render: (h) => {
              return h('Input', {
                  props: {
                      value: commentParam.replyContent,
                      autofocus: true,
                      placeholder: '请输入回复内容'
                  },
                  on: {
                      input: (val) => {
                          commentParam.replyContent = val;
                          
                      }
                  }
              }
              );
          },
          onOk: () => {
              this.update(id, commentParam);
          }
      })
    },
    audit(index) {
      let id = this.commentData[index].id
      let commentParam = {
        audit : !this.commentData[index].audit
      }
      this.update(id, commentParam)
    },
    toTop(index) {
      let id = this.commentData[index].id
      let commentParam = {
        toTop : !this.commentData[index].toTop
      }
      this.update(id, commentParam)
    },
    update (id, commentParam) {
      var that = this
      this.$api.updateDiscuss(id, commentParam).then(res =>{
        that.getDiscussList(that.pageData)
        this.$Message.success('Success!')
      })
    }
  },
  created () {
    this.getDiscussList(this.pageData)
  }
}
</script>
