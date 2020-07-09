<template>
    <div class="body">
        <div class="form">
            <form>
                <fieldset class="uk-fieldset">
                    <div class="uk-margin">
                        <input v-model="form.email" class="uk-input" type="text" placeholder="Email">
                    </div>
                    
                    <div class="uk-margin">
                        <input v-model="form.password" class="uk-input" type="password" placeholder="Password">
                    </div>

                    <loader v-if="loading"></loader>

                    <alert-danger v-if="errMsg">
                        {{errMsg}}
                    </alert-danger>
                    
                    <p uk-margin>
                        <button type="button" class="uk-button uk-button-primary btn-margin uk-button-small" @click="onLogIn">LogIn</button>
                        <button type="button" class="uk-button uk-button-default btn-margin uk-button-small" @click="onResetForm">Reset Form</button>
                        <button type="button" class="uk-button uk-button-link uk-button-small" @click="goSignUp">I don't have account</button>
                    </p>
                </fieldset>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '../../axios-instances/axios-auth'
export default {
    components:{
        'alert-danger':()=>import('../alert-danger/alert-danger'),
        loader:()=>import('../loader/loader')
    },
    data(){
        return{
            form:{
                email:'',
                password:''
            },
            loading:false,
            errMsg:null
        }
    },
    methods:{
        goSignUp(){
            this.$router.push('/signup')
        },
        onLogIn(){
            this.loading = true
            axios.post('/accounts:signInWithPassword?key=AIzaSyBzNBaRGnnfHsGV8TboDOeSg-RDwBq9RbI',{
                email:this.form.email,
                password:this.form.password,
                returnSecureToken:true
            }).then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve(response.data)
                    }else{
                        reject("Email Or Password Doesn/'t Correct")
                    }
                })
            }).then(response=>{
                this.loading = false
                this.onResetForm()
                this.$store.dispatch('auth/setUser',response)
            }).catch(err=>{
                this.loading = false
                this.errMsg = err
            })
        },
        onResetForm(){
            this.form.email=''
            this.form.password=''
        }
    }
}
</script>
<style scoped>
.form{
    padding: 10%;
}
</style>