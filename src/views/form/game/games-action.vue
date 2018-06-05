<style lang="less">
    @import '../../../styles/common.less';
    @import './game.less';
</style>

<template>
    <div class="feedback">
        <div class="common-div">
            <Card>
                <Form ref="gameAction" :model="gameAction" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="游戏名称" prop="name">
                                <Input v-model="gameAction.name" :readonly="isView" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="是否热门" prop="hot">
                                <Select v-model="gameAction.hot" :disabled="isView">
                                    <Option value="true">是</Option>
                                    <Option value="false">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="是否停用" prop="deleted">
                                <Select v-model="gameAction.deleted" :disabled="isView">
                                    <Option value="true">是</Option>
                                    <Option value="false">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="feedback-form-btn">
                            <span><Button v-show="!isView" type="primary" class="common-button" @click="handleSaveBanner('gameAction')" icon="folder">保存</Button></span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'gameAction',
  data () {
    return {
      gameAction: {
        id: '',
        name: '',
        hot: true,
        deleted: false,
        createTime: ''
      },
      isView: false
    }
  },
  methods: {
    handleSaveBanner (formAbout) {
      this.$Message.success('Success!')
      this.$router.push({
        name: 'games'
      })
    }
  },
  mounted () {
    if (localStorage.actionType != 'add') {
      this.gameAction.id = localStorage.gameId
      this.gameAction.name = localStorage.gameName
      this.gameAction.hot = localStorage.gameHot
      this.gameAction.deleted = localStorage.gameDeleted
      this.gameAction.createTime = localStorage.gameTime
    }
  },
  created () {
    if (localStorage.actionType == 'view') {
      this.isView = true
    }
  }
}
</script>
