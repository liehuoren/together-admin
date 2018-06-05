<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="user">
        <div>
            <Table border :columns="users" :data="userData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>

        </div>
    </div>
</template>

<script>
let testData = {
  'users': [
    {
      id: '1',
      phone: '12345678901',
      nickName: '昵称',
      avatarUrl: '../../../images/logo.jpg',
      gender: 1,
      createTime: '2017-12-13 12:03:20',
      lastLoginTime: '2017-12-13 12:03:20'
    }
  ]
}
export default {
  name: 'users',
  data () {
    return {
      ajaxUserData: [],
      // 初始化信息总条数
      dataCount: 15,
      // 每页显示多少条
      pageSize: 10,
      users: [
        {
          title: '用户标识',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '用户昵称',
          key: 'nickName',
          width: 90,
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center'
        },
        {
          title: '头像链接',
          key: 'avatarUrl',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '最近登录时间',
          key: 'lastLoginTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
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
              }, '详情')
            ])
          }
        }
      ],
      userData: []
    }
  },
  methods: {
    show (index) {
      localStorage.actionType = 'view'
      localStorage.userId = this.userData[index].id
      localStorage.userNick = this.userData[index].nickName
      localStorage.userPhone = this.userData[index].phone
      localStorage.userGender = this.userData[index].gender
      localStorage.userAvatar = this.userData[index].avatarUrl
      localStorage.userTime = this.userData[index].createTime
      localStorage.userLast = this.userData[index].lastLoginTime
      this.$router.push({
        name: 'usersAction'
      })
    },
    handleListApproveUser () {
      // 保存取到的所有数据
      this.ajaxUserData = testData.users
      this.dataCount = testData.users.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.users.length < this.pageSize) {
        this.userData = this.ajaxUserData
      } else {
        this.userData = this.ajaxUserData.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.userData = this.ajaxUserData.slice(_start, _end)
    }
  },
  created () {
    this.handleListApproveUser()
  }
}
</script>
