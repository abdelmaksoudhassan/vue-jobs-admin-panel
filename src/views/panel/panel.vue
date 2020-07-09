<template>
    <div>
        <div class="header">
            <h4>Hello {{userName}}, You Are Authenticated As Admin</h4>
            <div>
                <button class="uk-button uk-button-danger uk-button-small logout" @click="logout">
                    LogOut
                </button>
            </div>
        </div>
        <hr>
        <div class="center" v-show="loading">
            <loader></loader>
        </div>
        <add-category></add-category>
        <hr>
        <table class="uk-table uk-table-hover uk-table-divider">
            <thead>
                <tr>
                    <th class="centeralize hide">id</th>
                    <th class="centeralize">job title</th>
                    <th class="centeralize hide">posted in</th>
                    <th class="centeralize">confirmation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(job,index) in waitedjobs" :key="index">
                    <td class="centeralize hide">{{index+1}}</td>
                    <td class="centeralize">{{job.jobName}}</td>
                    <td class="centeralize hide">{{job.date}}</td>
                    <td class="centeralize">
                        <approve-btn :job="job"></approve-btn>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from '../../axios-instances/axios-read'
import { mapGetters,mapActions }from 'vuex'
export default {
    data(){
        return{
            loading:false
        }
    },
    components:{
        'loader':()=>import('../../components/loader/loader'),
        'approve-btn':()=>import('../../components/approve-btn/approve-btn'),
        'add-category':()=>import('../../components/add-category/add-category')
    },
    computed:{
        ...mapGetters('auth',['user','userName']),
        ...mapGetters('jobs',['waitedjobs'])
    },
    methods:{
        ...mapActions('auth',['logout'])
    },
    created(){
        this.loading = true
        axios.get('/waited-jobs.json').then(response=>{
            const data = response.data
            const arr = []
            return new Promise((resolve,reject)=>{
                if(response.request.status == 200){
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            element.id = key
                            arr.push(element)
                        }
                    }
                    resolve(arr)
                }else{
                    reject('connection error,please reload the page')
                }
            })
        }).then(res=>{
            this.filterdjobs = res
            this.$store.dispatch('jobs/setWaitedJobs',res)
            this.loading = false
        }).catch(err=>{
            alert(err)
            this.loading = false
        })
    },
}
</script>
<style scoped>
.header{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.logout{
    margin-top: 10px;
}
.centeralize{
    text-align : center;
}
@media(max-width: 600px){
    .hide{
        display: none;
    }
}
</style>