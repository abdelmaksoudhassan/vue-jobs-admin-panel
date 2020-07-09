<template>
    <div class="body">
        <div class="form">
            <form @submit.prevent>
                <fieldset class="uk-fieldset">
                    <div class="uk-margin">
                        <input v-model="form.email"  @input="$v.form.email.$touch()" class="uk-input" type="text" placeholder="Email">
                    </div>
                    <alert-danger v-if="!$v.form.email.required && $v.form.email.$dirty">
                        Email Is Required
                    </alert-danger>
                    <alert-danger v-if="!$v.form.email.email && $v.form.email.$dirty">
                        Email Must Be In Avalid Format
                    </alert-danger>
                    
                    <div class="uk-margin">
                        <input v-model="form.password" @input="$v.form.password.$touch()" class="uk-input" type="password" placeholder="Password">
                    </div>
                    <alert-danger v-if="!$v.form.password.required && $v.form.password.$dirty">
                        Password Is Required
                    </alert-danger>
                    <alert-danger v-if="!$v.form.password.minLength && $v.form.password.$dirty">
                        Password Must Be At Least {{$v.form.password.$params.minLength.min}} Characters
                    </alert-danger>
                    
                    <div class="uk-margin">
                        <input v-model="form.confirmPassword" @input="$v.form.confirmPassword.$touch()" class="uk-input" type="password" placeholder="Confirm Password">
                    </div>
                    <alert-danger v-if="!$v.form.confirmPassword.required && $v.form.confirmPassword.$dirty">
                        Confirm Password Is Required
                    </alert-danger>
                    <alert-danger v-if="!$v.form.confirmPassword.sameAs && $v.form.confirmPassword.$dirty">
                        Confirm Password And Password Must Be Same
                    </alert-danger>

                    <loader v-if="loading"></loader>

                    <alert-danger v-if="errMsg">
                        {{errMsg}}
                    </alert-danger>
                    
                    <p uk-margin>
                        <button type="button" class="uk-button uk-button-primary btn-margin uk-button-small" @click="onSignUp">SignUp</button>
                        <button type="button" class="uk-button uk-button-default btn-margin uk-button-small" @click="onResetForm">Reset Form</button>
                        <button type="button" class="uk-button uk-button-link uk-button-small" @click="goLogIn">I already have account</button>
                    </p>
                </fieldset>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '../../axios-instances/axios-auth'
import { email,required,minLength,sameAs } from 'vuelidate/lib/validators'
export default {
    components:{
        'alert-danger':()=>import('../alert-danger/alert-danger'),
        loader:()=>import('../loader/loader')
    },
    data(){
        return{
            form:{
                email:'',
                password:'',
                confirmPassword:''
            },
            loading:false,
            errMsg:null
        }
    },
    validations:{
        form:{
            email:{
                required,
                email
            },
            password:{
                required,
                minLength:minLength(6)
            },
            confirmPassword:{
                required,
                sameAs:sameAs(function(){
                    return this.form.password
                })
            }
        }
    },
    methods:{
        goLogIn(){
            this.$router.push('login')
        },
        onSignUp(){
            this.loading = true
            axios.post('/accounts:signUp?key=AIzaSyBzNBaRGnnfHsGV8TboDOeSg-RDwBq9RbI',{
                email:this.form.email,
                password:this.form.password,
                returnSecureToken:true
            }).then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve(response.data)
                    }else{
                        reject("This Email Already in Use By Another One")
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
            this.form.confirmPassword=''
        }
    }
}
</script>
<style scoped>
.form{
    padding: 10%;
}
</style>