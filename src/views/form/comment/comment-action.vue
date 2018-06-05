<style lang="less">
    @import '../../../styles/common.less';
    @import './comment.less';
</style>

<template>
    <div class="common-div">
        <div class="comment-action">
            <Form ref="formComment" :model="formComment" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="10">
                        <FormItem label="评论用户" prop="userId" >
                            <Input v-model="formComment.userId" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="所属文章" prop="articleId">
                            <Select v-model="formComment.articleId" disabled>
                                <Option v-for="item in articles" :value="item.id">{{item.title}}</Option>
                                <!--<Option value="1">吃鸡宝典1</Option>
                                <Option value="2">吃鸡宝典2</Option>
                                <Option value="3">吃鸡宝典3</Option>-->
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="评论内容" prop="content">
                            <Input v-model="formComment.content" :readonly="true" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="评论时间" prop="createTime">
                            <Input v-model="formComment.createTime" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="是否审核" prop="audit">
                            <Select v-model="formComment.audit" v-show="!isView">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                            <Select v-model="formComment.audit" disabled v-show="isView">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="是否置顶" prop="toTop">
                            <Select v-model="formComment.toTop" v-show="!isView">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                            <Select v-model="formComment.toTop" disabled v-show="isView">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="回复内容" prop="replyContent">
                            <Input v-model="formComment.replyContent" :readonly="isView" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem class="comment-action-btn">
                    <Button v-show="!isView" type="primary" @click="handleSubmit('formComment')">保存</Button>
                    <!--<Button type="ghost" @click="handleReset('formComment')" style="margin-left: 8px">Reset</Button>-->
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      'articles': [
        {
          id: '1',
          title: '吃鸡宝典',
          author: '烈火人',
          introduction: '吃鸡宝典，简介简介简介简介简介简介简介简介简介简介',
          createTime: '2017-12-13 12:03:20',
          content: '吃鸡宝典正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文'
        },
        {
          id: '2',
          title: '吃鸡宝典',
          author: '烈火人',
          introduction: '吃鸡宝典，简介简介简介简介简介简介简介简介简介简介',
          createTime: '2017-12-13 12:03:20',
          content: '吃鸡宝典正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文'
        },
        {
          id: '3',
          title: '吃鸡宝典',
          author: '烈火人',
          introduction: '吃鸡宝典，简介简介简介简介简介简介简介简介简介简介',
          createTime: '2017-12-13 12:03:20',
          content: '吃鸡宝典正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文' +
                        '正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文'
        }
      ],
      formComment: {
        audit: false,
        toTop: false,
        userId: '',
        articleId: '',
        content: '',
        createTime: '',
        replyContent: ''
      },
      ruleValidate: {
        replyContent: [
          { required: true, message: 'Please enter reply', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      isView: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.$router.push({
            name: 'comment'
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
    /*,
            handleReset (name) {
                this.$refs[name].resetFields();
            } */
  },
  mounted () {
    if (localStorage.commentType != 'add') {
      this.formComment.audit = localStorage.commentAudit
      this.formComment.toTop = localStorage.commentToTop
      this.formComment.userId = localStorage.commentUser
      this.formComment.articleId = localStorage.commentArticle
      this.formComment.content = localStorage.commentContent
      this.formComment.createTime = localStorage.commentTime
      this.formComment.replyContent = localStorage.commentReply
    }
  },
  created () {
    if (localStorage.actionType == 'view') {
      this.isView = true
    }
  }
}
</script>
