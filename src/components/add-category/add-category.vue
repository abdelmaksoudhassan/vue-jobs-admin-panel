<template>
    <div>
        <a class="uk-button uk-button-primary" href="#modal-sections" uk-toggle>
            add category
        </a>

        <div id="modal-sections" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close @click="resetForm"></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Add Category</h2>
                </div>
                <div class="uk-modal-body">
                     <div class="uk-margin">
                         <alert-danger v-if="!$v.title.required && $v.title.$dirty">
                             Category title is required
                        </alert-danger>
                        <alert-danger v-if="!$v.title.minLength && $v.title.$dirty">
                             Category title must be at least {{$v.title.$params.minLength.min}} letters
                        </alert-danger>
                        <alert-danger v-if="!$v.title.alpha && $v.title.$dirty">
                             Category title must be alphabetic
                        </alert-danger>
                        <input v-model="title" @focus="$v.title.$touch()" class="uk-input" 
                               type="text" placeholder="Category title..">
                    </div>
                    <button :disabled="$v.$invalid" @click="onAdd" class="uk-button uk-button-primary uk-button-small">
                        Add Category
                    </button>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-danger uk-modal-close uk-button-small" type="button" @click="resetForm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required,minLength,alpha } from 'vuelidate/lib/validators'
import axios from '../../axios-instances/axios-write'
import {mapGetters} from 'vuex'
export default {
    components:{
        'alert-danger':()=>import('../../components/alert-danger/alert-danger')
    },
    computed:{
        ...mapGetters('auth',['idToken'])
    },
    data(){
        return{
            title:''
        }
    },
    validations:{
        title:{
            required,
            minLength:minLength(4),
            alpha
        }
    },
    methods:{
        onAdd(){
            axios.post('/categories.json?auth='+this.idToken,{title:this.title}).then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve('Category added')
                        return
                    }
                    reject('Connection error or unauthorized request')
                })
            }).then(res=>{
                alert(res)
                this.resetForm()
            }).catch(err=>{
                alert(err)
                this.resetForm()
            })
        },
        resetForm(){
            this.title = ''
        }
    }
}
</script>