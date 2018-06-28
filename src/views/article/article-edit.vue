<style lang="less">
    @import '../../styles/common.less';
    @import './article-edit.less';
</style>

<template>
    <div>
      <Row>
        <Col span="18">
          <Card>
              <Form :label-width="80">
                  <FormItem label="文章标题" :error="articleError">
                      <Input v-model="article.title" @on-blur="handleTitleBlur" icon="android-list"/>
                  </FormItem>
                  <FormItem label="文章作者" :error="articleError">
                      <Input v-model="article.author" @on-blur="handleAuthorBlur" icon="android-list"/>
                  </FormItem>
                  <FormItem label="文章简介" :error="articleError" placeholder="文章简介（不超过50字）">
                      <Input v-model="article.introduction" icon="android-list" />
                  </FormItem>
                  <FormItem label="文章头图" :error="articleError">
                      <img :src="article.imgUrl" style="width: 348px; height: 240px">
                      <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :on-success="handleSuccess"
                          :on-error="handleError"
                          :on-exceeded-size="handleMaxSize"
                          :format="['jpg','jpeg','png']"
                          :max-size="4096"
                          type="drag"
                          name="file"
                          action="//up-z2.qbox.me"
                          :data="{token: uploadConfig.token}"
                          style="display: inline-block; width:58px;"
                          >
                          <div class="upload-icon">
                              <Icon type="ios-cloud-upload" size="30"></Icon>
                          </div>
                      </Upload>
                      <span>（请上传宽高比为348:240的图片，大小不超过1M）</span>
                  </FormItem>
              </Form>
              <div class="margin-top-20">
                  <textarea id="articleEditor"></textarea>
              </div>
              <Row class="margin-top-10 publish-button-con">
                  <span class="publish-button"><Button class="common-button" @click="save">保存</Button></span>
              </Row>
          </Card>
        </Col>
        <Col span="6" class="padding-left-10">
          <Card>
            <p slot="title">
                <Icon type="paper-airplane"></Icon>
                文章内图片上传
            </p>
            <p class="margin-top-10">
              <img :src="imgUrl" style="width: 348px; height: 240px">
              <Input type="textarea" v-model="imgUrl" icon="android-list" readonly />
              <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleImgSuccess"
                  :on-error="handleError"
                  :on-exceeded-size="handleMaxSize"
                  :format="['jpg','jpeg','png']"
                  :max-size="4096"
                  type="drag"
                  name="file"
                  action="//up-z2.qbox.me"
                  :data="{token: uploadConfig.token}"
                  style="display: inline-block; width:58px;"
                  >
                  <div class="upload-icon">
                      <Icon type="ios-cloud-upload" size="30"></Icon>
                  </div>
              </Upload>
              <span>（请上传大小不超过1M的图片，可复制图片地址到文章编辑器的图片上传源中）</span>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
import tinymce from 'tinymce'
import Cookies from 'js-cookie'
export default {
  name: 'artical-edit',
  data () {
    return {
      uploadConfig:{
        token:'',
        baseUrl:'',
      },
      article: {
        title: '',
        author: '', 
        imgUrl: '',
        introduction: '',
        content: ''
      },
      articleError: '',
      imgUrl: ''
    }
  },
  methods: {
    handleTitleBlur () {
      if (this.article.title == '') {
        this.$Message.error('文章标题不可为空哦')
      }
    },
    handleAuthorBlur () {
      if (this.article.author == '') {
        this.$Message.error('文章作者不可为空哦')
      }
    },
    canPublish () {
      if (this.article.title == '') {
        this.$Message.error('请输入文章标题')
        return false
      } else {
        return true
      }
    },
    save () {
      if (this.canPublish()) {
        this.article.content = tinymce.activeEditor.getContent()
        
        var id = this.article.id
        this.$api.updateArticle(id, this.article).then(res => {
            this.$store.commit('removeTag', this.$route.name);
            this.$router.push({
              name: 'article-list'
            })
        })
      }
    },
    handleSuccess(res){
      this.article.imgUrl = this.uploadConfig.baseUrl+res.key
      this.$Message.success('上传图成功!')
    },
    handleImgSuccess(res) {
      this.imgUrl = this.uploadConfig.baseUrl+res.key
      this.$Message.success('上传图成功!')
    },
    handleError(){
      this.$Message.success('上传图失败!')
    },
    handleMaxSize(){
      this.$Message.warning( '文件太大，不能超过 4M');
    },
  },
  mounted () {
    tinymce.init({
      selector: '#articleEditor',
      branding: false,
      elementpath: false,
      height: 600,
      language: 'zh_CN.GB2312',
      menubar: 'edit insert view format table tools',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
        'searchreplace visualblocks visualchars code fullscreen fullpage',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
      ],
      toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
      autosave_interval: '20s',
      image_advtab: true,
      table_default_styles: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    })

    var id = this.$route.params.id
    this.$api.getArticle(id).then(res => {
        this.article = res.data
        tinymce.activeEditor.setContent(this.article.content)
    })
    
    this.uploadConfig = this.$api.getUploadToken()
  },
  destroyed () {
    tinymce.get('articleEditor').destroy()
  }
}
</script>
