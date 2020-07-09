<template>
    <div class="view">
        <log-in-form></log-in-form>
    </div>
</template>
<script>
export default {
    components:{
        'log-in-form':()=>import('../../components/log-in-form/log-in-form')
    }
}
</script>