<style lang="less">
    @import '../../../../styles/common.less';
    @import './feedback.less';
</style>

<template>
    <div class="feedback">
        <div class="common-div">
            <Card>
                <Form :model="formFeedback" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="用户名称">
                                <Input v-model="formFeedback.userId" :readonly="true" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="用户邮箱">
                                <Input v-model="formFeedback.email" :readonly="true" icon="android-list"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="反馈意见">
                                <Input v-model="formFeedback.content" :readonly="true" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="处理状态">
                                <Select v-model="formFeedback.finished" :disabled="isView">
                                    <Option value="true">已处理</Option>
                                    <Option value="false">未处理</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="feedback-form-btn">
                            <span><Button v-show="!isView" type="primary" class="common-button" @click="handleSaveFeedback()" icon="folder">保存</Button></span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'feedbackAction',
  data () {
    return {
      formFeedback: {
        id: '',
        userId: '',
        email: '',
        content: '',
        createTime: '',
        finished: false
      },
      isView: false
    }
  },
  methods: {
    handleSaveFeedback () {
      this.$Message.success('Success!')
      this.$router.push({
        name: 'feedback'
      })
    }
  },
  mounted () {
    if (localStorage.actionType != 'add') {
      this.formFeedback.id = localStorage.feedbackId
      this.formFeedback.userId = localStorage.feedbackUser
      this.formFeedback.email = localStorage.feedbackEmail
      this.formFeedback.content = localStorage.feedbackContent
      this.formFeedback.finished = localStorage.feedbackFinished
    }
  },
  created () {
    if (localStorage.actionType == 'view') {
      this.isView = true
    }
  }
}
</script>
