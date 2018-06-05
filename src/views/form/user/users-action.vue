<style lang="less">
    @import '../../../styles/common.less';
    @import './users.less';
</style>

<template>
    <div class="users">
        <div class="common-div">
            <Card>
                <Form ref="usersAction" :model="usersAction" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <Row>
                                <Col>
                                    <FormItem label="用户昵称" prop="nickName">
                                        <Input v-model="usersAction.nickName" :readonly="true" icon="android-list"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem label="手机号码" prop="phone">
                                        <Input v-model="usersAction.phone" :readonly="true" icon="android-list"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem label="性别"  prop="deleted">
                                        <Select v-model="usersAction.gender" disabled>
                                            <Option value="1">男</Option>
                                            <Option value="0">女</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem label="注册时间" prop="createTime">
                                        <Input v-model="usersAction.createTime" :readonly="true" icon="android-list"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem label="最近登录" prop="lastLoginTime">
                                        <Input v-model="usersAction.lastLoginTime" :readonly="true" icon="android-list"/>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="10" class="users-avatar">
                            <div><span>用户头像</span></div>
                            <div class="users-avatar-img">
                                <img id="cropImg" alt="" :src="usersAction.avatarUrl"><!---->
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'usersAction',
  data () {
    return {
      usersAction: {
        id: '',
        phone: '',
        nickName: '',
        avatarUrl: '',
        gender: '',
        createTime: '',
        lastLoginTime: ''
      }
    }
  },
  mounted () {
    this.usersAction.id = localStorage.userId
    this.usersAction.phone = localStorage.userPhone
    this.usersAction.nickName = localStorage.userNick
    this.usersAction.avatarUrl = localStorage.userAvatar
    this.usersAction.gender = localStorage.userGender
    this.usersAction.createTime = localStorage.userTime
    this.usersAction.lastLoginTime = localStorage.userLast
  }
}
</script>
