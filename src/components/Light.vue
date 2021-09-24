<template>
    <div class="light" v-bind:style="{backgroundColor: color}">
        <span class="light__time">{{time}}</span>
    </div>
</template>

<script>
    import {getColorFromPath} from "@/utils/checkColorFromPath";
    import {GREEN, RED, YELLOW} from "@/constatnts/colors";

    export default {
        data(){
            return{
                color: this.getColor(),
                time: this.setTime()
            }
        },
        methods: {
            getColor(){
                return getColorFromPath(this.$route.path)
            },
            setTime(){
                const color = this.getColor()
                if(color === RED)
                    return 10
                if(color === YELLOW)
                    return 3
                if(color === GREEN)
                    return 15
            }
        },
        watch:{
            $route (to, from){
                this.color = this.getColor()
                this.time = this.setTime()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .light{
        width: 100vw;
        height: 100vh;
        background: #6aad6a;
        display: flex;
        justify-content: center;
        align-items: center;
        &__time{
            color: #fff;
            font-size: 10em;
            letter-spacing: 15px;
         }
    }
</style>