<template>
    <div class="browser">
        <ul>
            <li>
                <h3>Section One</h3>
                <ul>
                    <li><router-link :to="{name: 'index'}">properties</router-link></li>
                </ul>
            </li>
            <li>
                <h3>Section Two</h3>
                <ul>
                    <li><router-link :to="{name: 'about'}">about</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Browser"
    }
</script>

<style lang="scss" scoped>
    .browser{
        ul{
            > li{
                margin-top: 2rem;
                &:first-child{
                    margin-top: 0;
                }
            }
            ul{
                padding-left: 1rem;
                li{
                    padding: 0.5rem 0;
                }
            }
        }
    }
</style>