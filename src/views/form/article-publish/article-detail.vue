<style lang="less">
    @import '../../../styles/common.less';
    @import './article-detail.less';
</style>

<template>
    <div class="detail-main">
        <div class="common-div">
            <Row>
                <Col>
                    <div>
                        <Card>
                            <h1 class="detail-publish-title">{{ articleTitle }}</h1>
                            <h4 class="detail-publish-author">{{author}}</h4>
                            <p class="detail-publish-time"><Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ createTime }}</p>
                            <div class="detail-content-con" v-html="content"></div>
                            <!--<div class="detail-line">
                                <Button class="detail-line-button common-button" @click="goBack" >返回</Button>
                            </div>-->
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      articleTitle: '',
      author: '',
      content: '',
      createTime: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 'article-list'
      })
    }
  },
  mounted () {
    this.id = localStorage.articleId
    this.$api.getArticle(this.id).then(res => {
        this.articleTitle = res.data.title
        this.author = res.data.author
        this.createTime = res.data.createTime
        this.content = res.data.content
    })
    
  }
}
</script>
