<template>
       <nav class="nav-color">
              <router-link to="/red">red</router-link>
              <router-link to="/yellow">yellow</router-link>
              <router-link to="/green">green</router-link>
       </nav>
       <router-view></router-view>
</template>
<script>
    export default {
        name: "App",
    }
</script>


<style lang="scss">
    @import './styles/app';
</style>