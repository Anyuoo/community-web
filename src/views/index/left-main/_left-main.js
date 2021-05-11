// left-main js
import PostList from '@/components/post-list.vue'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import CommentList from '@/components/comment-list.vue'
import { PublishPost, Post } from '@/graphql/post.gql'
export default {
    name: "LeftMain",
    components: {
        PostList,
        MarkdownItVue,
        CommentList
    },
    data() {
        return {
            dialogVisible: false,

            mdMode: false,
            //发布帖子内容
            postContent: {
                title: "",
                content: "",
            },
            // 正在浏览帖子列表数据
            postTabs: [],
            // 正在浏览帖子列
            editTabName: "index",

        };
    },
    computed: {
        // 是否登录
        isLogin() {
            return typeof localStorage !== 'undefined' && localStorage.getItem('apollo-token')
        }

    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(r => {
                    console.log(r)
                    done();
                })
                .catch(r => {
                    console.log(r)
                });
        },
        hdlCmplete() {
            console.log('reder complete')
        },

        // 发帖子
        publishPost() {
            if(this.postContent === {} ||this.postContent.title === '' || this.postContent.content==''){
                this.$message.error("帖子数据不能为空")
                return;
            }
            this.$apollo.mutate({
                mutation: PublishPost,
                variables: {
                    postInput: {
                        title: this.postContent.title,
                        content: this.postContent.content,
                    }
                }
            }).then(promise => {
                if (promise.data.publishPost) {
                    this.$message({
                        message: '帖子发布成功！',
                        type: 'success'
                    });
                    // 置空
                    this.postContent.title =""
                    this.postContent.content=""
                    this.dialogVisible=false

                }else{
                    this.$message.error("帖子发布失败");
                }
            }).catch(error=>{
                this.$message.error("帖子发布失败"+error.message);
            })
        },
        //点击标题刷新
        handlePostTabClick(tab) {
            if (tab.name !== "index") {
                this.addPostTab(tab.name)
            }
        },
        //打开新的帖子浏览
        addPostTab(postId) {
            // 转字符
            postId = postId + ''
            //避免重复打开
            this.postTabs = this.postTabs.filter(tab => tab.id !== postId);
            // 获取数据
            this.$apollo.query({
                query: Post,
                variables: { id: postId }
            }).then(promise => {
                let data = promise.data
                if (data.postDetails != null) {
                    let post = data.postDetails
                    // 添加
                    this.postTabs.push({
                        ...post
                    });
                    // 激活
                    this.editTabName = postId;
                }
            })
        },
        // 关闭新的帖子浏览
        removePostTab(targetTabName) {
            // 打开的帖id
            let activeTabName = this.editTabName;
            let tabs = this.postTabs;
            // 删除当前页
            if (activeTabName === targetTabName) {
                tabs.forEach((tab, index) => {
                    if (tab.id === targetTabName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeTabName = nextTab.id + '';
                        } else {
                            activeTabName = "index"
                        }
                    }
                });
            }
            this.editTabName = activeTabName;
            // 更新data数据
            this.postTabs = tabs.filter(tab => tab.id + '' !== targetTabName);
        },
    }

};