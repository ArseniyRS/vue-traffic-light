<template>
    <span class="light-time" :class="{isBlinkText: isGreenFinishing}">{{time}}</span>
    <div class="light" :class="{isBlink: isGreenFinishing}" :style="{backgroundColor: color}">
    </div>
</template>

<script>
    import {getColorFromPath} from "@/utils/checkColorFromPath";
    import {GREEN, RED, YELLOW} from "@/constatnts/colors";
    import {PATH_GREEN, PATH_RED, PATH_YELLOW} from "../constatnts/routes";

    export default {
        data() {
            return {
                color: this.getColor(),
                time: localStorage.getItem('time') || this.setTime(),
                isGreenFinishing: false
            }
        },
        methods: {
            getColor() {
                return getColorFromPath(this.$route.path)
            },
            setTime() {
                const color = this.getColor()
                if (color === RED)
                    return 10
                if (color === YELLOW)
                    return 3
                if (color === GREEN)
                    return 15
            },
            chooseRoute() {
                if (this.color === RED) {
                    this.$router.push(PATH_YELLOW)
                }
                if (this.color === YELLOW) {
                    this.$router.push(PATH_GREEN)
                }
                if (this.color === GREEN) {
                    this.$router.push(PATH_RED)
                }
                return this.setTime()

            }
        },
        watch: {
            $route(to, from) {
                this.color = this.getColor()
                this.time = this.setTime()
            },
            time(to, from) {
                if (this.time <= 3 && this.color === GREEN)
                    return this.isGreenFinishing = true
                return this.isGreenFinishing = false
            }
        },
        mounted() {
            setInterval(() => {
                if (this.time > 1) {
                    this.time--
                    localStorage.setItem('time', this.time)
                } else
                    this.chooseRoute()
            }, 1000)
        },
    }
</script>

<style scoped>
    .light {
        width: 100vw;
        height: 100vh;
    }

    .light-time {
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        color: #fff;
        font-size: 10em;
        letter-spacing: 15px;
    }

    @keyframes blinking {
        from {
            opacity: 1.0;
        }
        to {
            opacity: 0.0;
        }
    }

    @keyframes textBlinking {
        from {
            opacity: 1.0;
        }
        to {
            opacity: 0.0;
            font-size: 30em
        }
    }

    .isBlink {
        text-decoration: blink;
        animation-name: blinking;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: alternate;
    }

    .isBlinkText {
        text-decoration: blink;
        animation-name: textBlinking;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }
</style>