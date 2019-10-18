<template>
    <div class="browser">
        <ul>
            <li>
                <ul>
                    <li><router-link :to="{name: 'index'}">Index</router-link></li>
                </ul>
            </li>
            <li>
                <h3>Section One</h3>
                <ul>
                    <li><router-link :to="{ name: 'sdc.logins' }">Logins</router-link></li>
                    <li><router-link :to="{name: 'messenger'}">Messages</router-link></li>
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
        padding: $globalPadding;

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
                    padding: 0.25em 0;
                    margin: 0;
                }
            }
        }
    }
</style>