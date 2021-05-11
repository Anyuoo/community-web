import { SendVerifyCode, Register } from "@/graphql/user.gql"
export default {
    name: "Register",
    data() {
        // 密码验证
        const validPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.registerForm.checkPassword !== "") {
                    this.$refs.registerForm.validateField("checkPassword");
                }
                callback();
            }
        };
        // 确认密码验证
        const validCheckPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.registerForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        //
        return {
            registerForm: {
                email: "",
                emailType: "@qq.com",
                password: "",
                checkPassword: "",
                code: "",
            },

            loading: false,
            formRules: {
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                    { validator: validPass, trigger: "blur" },
                ],
                checkPassword: [
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
    methods: {
        // 获取验证码
        getCode() {
            let email = this.registerForm.email + this.registerForm.emailType
            this.$apollo.mutate({
                mutation: SendVerifyCode,
                variables: {
                    email: email,
                },
            }).then(promise => {
                console.log(promise.data)
                if (promise.data.sendVerifyCode) {
                    this.$message({
                        message: '邮件验证码已发送',
                        type: 'success'
                    });
                } else {
                    this.$message.error('邮件验证码发送失败');
                }
            }).catch(error => {
                this.$message.error(error.message);
            })
        },
        register(regForm) {
            console.log()
            this.loading = true
            this.$refs[regForm].validate((valid) => {
                if (valid) {
                    this.$apollo.mutate({
                        mutation: Register,
                        variables: {
                            email: this.registerForm.email + this.registerForm.emailType,
                            password: this.registerForm.password,
                            code: this.registerForm.code,
                        }
                    }).then(promise => {
                        console.log(promise.data);
                        //注册成功
                        this.loading = false
                        if (promise.data.register) {
                            this.$confirm('注册成功, 是否跳转登录页?', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'info',
                                center: true
                            }).then(() => {
                                this.$router.push('Login')
                            }).catch(()=>{
                                this.$router.push({name:'Index'})
                            })
                        } else {
                            this.$message.error("注册失败");
                        }
                    }).catch((error) => {
                         //注册失败
                        this.loading = false
                        this.$message.error(error.message);
                    })
                }
            });
            this.loading = false
        },
        //跳转注册页
        goLoginPage() {
            this.$router.push('login')
        }
    },
};