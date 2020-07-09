<template>
    <div>
        <div v-show="approve">
            <p uk-margin>
                <button class="uk-button uk-button-default btn-margin uk-button-small" @click="onApprove">
                    Approve
                </button>
                <button class="uk-button uk-button-secondary btn-margin uk-button-small" @click="onReject">
                    Reject
                </button>
            </p>
        </div>
        <div v-show="done">
            <strong>Done</strong>
        </div>
        <div v-if="confirm">
            <span>This Post Will Be Rejected</span>
            <p uk-margin>
                <button class="uk-button uk-button-danger uk-button-small btn-margin" @click="onConfirm">
                    Confirm
                </button>
                <button class="uk-button uk-button-primary uk-button-small btn-margin" @click="onBack">
                    Back
                </button>
            </p>
        </div>
    </div>
</template>
<script>
import axiosWrite from '../../axios-instances/axios-write'
import { mapGetters } from 'vuex'
export default {
    props:{
        job:{
            required:true,
            type:Object
        }
    },
    data(){
        return{
            confirm: false,
            approve:true,
            done: false
        }
    },
    computed:{
        ...mapGetters('auth',['idToken'])
    },
    methods:{
        onApprove(){
            axiosWrite.delete('/waited-jobs/'+ this.job.id +'.json?auth='+this.idToken).then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve()
                        return
                    }
                    reject('Connection error or unauthorized request !!')
                })
            }).then(()=>{
                axiosWrite.post('/jobs.json?auth='+this.idToken,this.job).then(response=>{
                    return new Promise((resolve,reject)=>{
                        if(response.request.status == 200){
                            resolve('Operation done successfully')
                            return
                        }
                        reject('Connection error or unauthorized request !!')
                    })
                }).then(res => { 
                    alert(res)
                    this.done=true
                    this.confirm=false
                    this.approve=false
                }).catch(err => { alert(err)})
            }).catch(err => { alert(err) })
        },
        onReject(){
            this.done=false
            this.confirm=true
            this.approve=false
        },
        onConfirm(){
            axiosWrite.delete('/waited-jobs/'+ this.job.id +'.json?auth='+this.idToken).then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve('Operation done successfully')
                        return
                    }
                    reject('Connection error or unauthorized request !!')
                })
            }).then(res => { 
                alert(res)
                this.done=true
                this.confirm=false
                this.approve=false
            }).catch(err => { alert(err) })
        },
        onBack(){
            this.done=false
            this.confirm=false
            this.approve=true
        }
    }
}
</script>
<style scoped>
.fade-enter{
    opacity: 0;
}
.fade-enter-active{
    transition: all 0.3s;
}
.fade-leave-active{
    opacity: 0;
    transition: all 0.3s;
}
</style>