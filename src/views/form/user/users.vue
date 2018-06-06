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
      userData: [],
      pageData: {
        cursor: 1,
        limit: 10
      }
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
    changePage (index) {
      this.pageData.cursor = index
      this.getuserList(this.pageData)
    },
    getUserList(pageData) {
      this.$api.getUserList(pageData).then(res => {
        this.userData = res.data
        this.dataCount = res.headers['x-slice-total-count']
      })
    }
  },
  created () {
    this.getUserList(this.pageData)
  }
}
</script>
