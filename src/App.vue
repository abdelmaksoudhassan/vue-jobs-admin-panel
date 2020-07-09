<template>
  <div id="app">
    <div class="container">
      <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn" 
                  leave-active-class="animate__animated animate__fadeOut">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('auth/autoLogin')
  }
}
</script>