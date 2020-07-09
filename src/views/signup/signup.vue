
<template>
    <div class="view">
        <sign-up-form></sign-up-form>
    </div>
</template>
<script>
export default {
    components:{
        'sign-up-form':()=>import('../../components/sign-up-form/sign-up-form')
    }
}
</script>