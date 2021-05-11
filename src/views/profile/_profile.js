import { GetLoginUser, UploadAvatar, SendEmailUpdateCode, UpdatePassword, UpdateEmail, UpdateUserInfo } from "@/graphql/user.gql";
import { onLogout } from "@/vue-apollo";
import ImageUpload from "vue-image-crop-upload/upload-2.vue";
import 'babel-polyfill'; // es6 shim
export default {
    name: "UserProfile",
    inject: ['reload'],
    components: {
        ImageUpload,
    },
    data() {
        // 密码验证
        const validPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.passForm.checkPass !== "") {
                    this.$refs.passForm.validateField("checkPass");
                }
                callback();
            }
        };
        // 确认密码验证
        const validCheckPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.passForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            // 当前选中标签页
            currentTabName: "userInfo",
            //菜单标签
            labels: [
                { name: "个人信息" },
                { name: "修改信息" },
                { name: "修改邮箱" },
                { name: "我的收藏" },
            ],
            // 头像编辑显示
            showAvatarEdit: false,
            // 头像数据
            avatarDataUrl: "",
            // 用户信息
            userInfo: {
            },
            //用户信息表单
            userInfoForm: {
                nickname: "",
                realName: "",
                gender: "",
                account: "",
                birthday: "",
            },
            // 登录手机修改
            mobileForm: {
                mobile: "",
                code: "",
            },
            // 绑定邮箱
            emailForm: {
                email: "",
                code: "",
            },
            // 登录密码
            passForm: {
                pass: "",
                checkPass: "",
            },
            // 用户信息验证规则
            userInfoFormRules: {
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                realName: [
                    { required: true, message: "请输入真实姓名", trigger: "blur" },
                    {
                        min: 2,
                        max: 5,
                        message: "长度在 2 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
            },
            // 登录手机验证规则
            mobileFormRules: {
                mobile: [
                    { required: true, message: "手机号不能为空" },
                    {
                        min: 11,
                        max: 11,
                        message: "手机号格式错误",
                        // trigger: "blur",
                    },
                ],
                code: [{ required: true, message: "请输入验证码" }],
            },
            // 绑定邮箱验证规则
            emailFormRules: {
                email: [
                    { required: true, message: "邮箱不能为空", trigger: "blur" },
                    {
                        min: 3,
                        max: 25,
                        message: "邮箱格式错误",
                        trigger: "blur",
                    },
                ],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
            // 密码验证规则
            passFormRules: {
                pass: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                    { validator: validPass, trigger: "blur" },
                ],
                checkPass: [
                    { required: true, message: "请输入确认密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                    { validator: validCheckPass, trigger: "blur" },
                ],
            },



        };
    },
    created() {
        this.getLoginUser()
    },

    methods: {
        //获取登录用户
        getLoginUser() {
            this.$apollo
                .query({
                    query: GetLoginUser,
                    variables: {}
                })
                .then((promise) => {
                    const user = promise.data.loginUser
                    if (user) {
                        this.userInfo = user;
                    }
                })
        },
        // 返回
        goBack() {
            this.$router.go(-1);
        },
        // 选择面板
        chooseTab(tab) {
            // this.$forceUpdate();
            if (tab.name === 'userInfo') {
                // this.$options.methods.getLoginUser()
            } else if (tab.name === 'userUpdate') {
                this.userInfoForm.nickname = this.userInfo.nickname
                this.userInfoForm.realName = this.userInfo.realName
                this.userInfoForm.gender = this.userInfo.gender
                this.userInfoForm.birthday = this.userInfo.birthday
                this.userInfoForm.account = this.userInfo.account.split('@ancf')[0]
            }
        },
        // 头像上传
        cropAvatarSuccess(imgDataUrl) {
            fetch(imgDataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'avatar.png', { type: "image/png" })
                    this.$apollo.mutate({
                        mutation: UploadAvatar,
                        variables: {
                            avatar: file,
                        },
                    }).then(promise => {
                        const data = promise.data.uploadAvatar
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "头像修改成功"
                            })
                            this.userInfo.avatar = data
                        } else {
                            this.$message.error("头像修改失败")
                        }
                    }).catch(error => {
                        this.$message.error("头像修改失败" + error.message)
                    })
                })

        },
        // 显示头像编辑
        avatarToggleShow() {
            this.showAvatarEdit = !this.showAvatarEdit
        },

        // 用户信息表单
        submitUserInfoForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$apollo.mutate({
                        mutation: UpdateUserInfo,
                        variables: {
                            userInput: this.userInfoForm
                        }
                    }).then(promise => {
                        if (promise.data.updateUserInfo) {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            })
                            this.userInfo.nickname = this.userInfoForm.nickname
                            this.userInfo.realName = this.userInfoForm.realName
                            this.userInfo.gender = this.userInfoForm.gender
                            this.userInfo.birthday = this.userInfoForm.birthday
                            this.userInfo.account = this.userInfoForm.account +'@ancf'
                        } else {
                            this.$message.error("修改失败")
                        }
                    }).catch(error => {
                        this.$message.error(error.message)
                    })
                }
            });
            this.userInfoForm.account = this.userInfoForm.account.split('@ancf')[0]
        },
        // 手机表单
        submitMobileForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //手机更改验证
        sendMobileCode() {

        },
        // 邮箱表单
        submitEmailForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$apollo.mutate({
                        mutation: UpdateEmail,
                        variables: {
                            email: this.emailForm.email,
                            code: this.emailForm.code,
                        }
                    }).then(promise => {
                        if (promise.data.sendEmailUpdateCode) {
                            this.$message({
                                type: "success",
                                message: "更改绑定邮箱成功"
                            })
                        } else {
                            this.$message.error("更改绑定邮箱失败")
                        }
                    }).catch(error => {
                        this.$message.error("更改绑定邮箱失败," + error.message)
                    })
                }
            });
        },
        // 发送邮箱验证
        sendEmailCode() {
            this.$apollo.mutate({
                mutation: SendEmailUpdateCode,
                variables: {
                    email: this.emailForm.email
                }
            }).then(promise => {
                if (promise.data.sendEmailUpdateCode) {
                    this.$message({
                        type: "success",
                        message: "激活码发送成功"
                    })
                } else {
                    this.$message.error("激活码发送失败")
                }
            }).catch(error => {
                this.$message.error("激活码发送失败," + error.message)
            })
        },
        // 密码表单
        submitPassForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$apollo.mutate({
                        mutation: UpdatePassword,
                        variables: {
                            password: this.passForm.pass
                        }
                    }).then(promise => {
                        if (promise.data.updatePassword) {
                            this.$confirm('密码修改成功，是否重新登录?', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning'
                            }).then(() => {
                                //重置登录状态
                                onLogout(this.$apolloProvider.defaultClient);
                                this.reload()
                                this.$router.push({ name: 'Login' })
                            }).catch(() => {
                                //重置登录状态
                                onLogout(this.$apolloProvider.defaultClient);
                                this.reload()
                                this.$router.push({ name: "Index" });
                            });
                        } else {
                            this.$message.error("密码修改失败")
                        }
                    }).catch(error => {
                        this.$message.error("密码修改失败," + error.message)
                    })
                }
            });
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
    },
};