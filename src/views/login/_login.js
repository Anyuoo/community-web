import Login from '@/graphql/login.gql'
import { onLogin } from "@/vue-apollo";
import SvgIcon from '@/components/svg-icon.vue'
import IdentifyCode from '@/components/identify-code.vue'
export default {
    name: "login",
    components: {
        SvgIcon,
        IdentifyCode
    },
    inject: ['reload'],
    data() {
        var validCode = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('验证码不能为空'));
            }
            if (value !== this.code) {
                return callback(new Error('验证码错误'));
            }
            return callback()
        };

        return {
            loginForm: {
                principal: "",
                password: "",
                code: "",
            },
            loading: false,
            loginRules: {
                principal: [
                    { required: true, message: "请输入手机号或邮箱", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { validator: validCode }
                ],
            },
            code: '',
        };
    },
    methods: {
        //登录
        login(loginForm) {
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    this.$refs.loginForm.validate((valid) => {
                        this.loading = true
                        if (valid) {
                            this.$apollo.mutate({
                                mutation: Login,
                                variables: {
                                    principal: this.loginForm.principal,
                                    password: this.loginForm.password,
                                },
                            }).then(promise => {
                                this.loading = false
                                let token = promise.data.login
                                if (token !== '') {
                                    onLogin(this.$apolloProvider.defaultClient, token)
                                    console.log(localStorage.getItem('apollo-token'))
                                    this.reload()
                                    this.$router.push('Index')
                        
                                }else{
                                    this.$message.error('登录失败')
                                    this.$router.push({ path: this.redirect })
                                }
                            }).catch(e => {
                                this.loading = false
                                this.$message.error(e.message)
                            })
                        }
                    })
                }  
            });
        },
        //跳转注册页
        goRegisterPage() {
            this.$router.push('Register')
        }
    },
};