<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div class="banner">
        <Row class="text-right">
          <Button type="primary" @click="handleAddBanner" class="long-add-btn common-button" long>添加广告</Button>
          <Button type="primary" @click="refresh" class="long-add-btn common-button" icon="android-refresh">刷新</Button>
        </Row>
        <Row class="margin-top-10">
            <Table border :columns="banners" :data="bannerData"></Table>
        </Row>
    </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      ajaxBannerData: [],
      banners: [
        {
          title: '广告ID',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '文章ID',
          key: 'articleId',
          width: 90,
          align: 'center'
        },
        {
          title: '广告标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '广告图片',
          key: 'advertUrl',
          align: 'center',
          render: (h, params) => {
            return h('span', {
              attrs: {
                style: 'width: 200px;height: 80px;'
              },
            }, [
                h('img', {
                  props: {
                    type: 'primary'
                  },
                  attrs: {
                    src: params.row.advertUrl, style: 'width: 200px;height: 80px;'
                  },
                  style: {
                  },
                }),
              ]);
          }
        },
        {
          title: '发布时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
      bannerData: []
    }
  },
  methods: {
    handleAddBanner () {
      this.$router.push({
        name: 'banner-add'
      })
    },
    remove (index) {
      this.$api.deleteBanner(this.bannerData[index].id)
      this.bannerData.splice(index, 1)
    },
    getBannerList() {
      this.$api.getBannerList().then(res => {
        this.bannerData = res.data
      })
    },
    refresh() {
      this.getBannerList()
    }
  },
  created () {
    this.getBannerList()
  }
}
</script>
