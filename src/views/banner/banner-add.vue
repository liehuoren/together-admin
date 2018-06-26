<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div class="image-editor">
        <div class="common-div">
            <Card>
                <Form ref="formBanner" :model="formBanner" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col>
                            <FormItem label="广告标题" prop="title">
                                <Input v-model="formBanner.title" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="广告图片" prop="advertUrl">
                                <img :src="formBanner.advertUrl" style="width: 348px; height: 240px">
                                <Upload
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :on-exceeded-size="handleMaxSize"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="4096"
                                    multiple
                                    type="drag"
                                    name="file"                                   
                                    action="//up-z2.qbox.me/"
                                    :data="{token: uploadConfig.token}"
                                    style="display: inline-block;width:58px;"
                                    >
                                    <div class="upload-icon">
                                        <Icon type="ios-cloud-upload" size="30"></Icon>
                                    </div>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="跳转文章" prop="id">
                                <Select v-model="id" @on-change="select">
                                    <Option v-for="item in articles" :value="item.id" :key="item.id">{{item.title}}</Option>         
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="10">
                        <Col class="image-editor-con">
                            <div class="image-editor-con-btn-con margin-top-10">
                                <FormItem>
                                    <span><Button type="primary" class="common-button" @click="handleSaveBanner('formBanner')" icon="folder">保存</Button></span>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs';
export default {
    name: 'banner-add',
    data () {
        return {
            uploadConfig:{
                token:'',
                baseUrl:'',
            },
            articles: [],
            id:'',
            formBanner: {
                title: '',
                articleId: '',
                advertUrl: ''
            },
            ruleValidate:{
                title:[{required: true, message: '广告标题不能为空', trigger: 'blur'}],
                advertUrl:[{required: true, message: '图片地址不能为空', trigger: 'blur'}]
            },
            cropper: {},
            option: {
                showCropedImage: false,
                cropedImg: ''
            },
        };
    },
    methods: {
        handleSaveBanner(formBanner){
            this.$refs[formBanner].validate((valid) => {
                if (valid) {
                    this.$api.createBanner(this.formBanner).then(res => {
                        this.$Message.success('Success!');
                        this.$router.push({
                            name: 'banner-list'
                        });
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleSuccess(res){
            this.formBanner.advertUrl = this.uploadConfig.baseUrl+res.key
            this.$Message.success('上传广告图成功!')
        },
        handleError(){
          this.$Message.success('上传广告图失败!')
        },
        handleMaxSize(){
            this.$Message.warning( '文件太大，不能超过 4M');
        },
        select(item){
            console.log(item)
            this.formBanner.articleId = item
        }
    },
    mounted () {
        this.$api.getArticleList().then(res => {
            this.articles = res.data

        })
        var id = this.$route.params.id
        this.uploadConfig = this.$api.getUploadToken()
    }
};
</script>

<style>

</style>
