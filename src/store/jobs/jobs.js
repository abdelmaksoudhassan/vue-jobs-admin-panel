const namespaced=true
const state={
    waitedjobs : []
}
const getters={
    waitedjobs(state){
        return state.waitedjobs
    }
}
const mutations={
    SET_WAITED_JOBS(state,x){
        state.waitedjobs = x
    }
}
const actions={
    setWaitedJobs({commit},x){
        commit('SET_WAITED_JOBS',x)
    }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}