<template>
    <footer class="footer">
        <div>
            Footer here
        </div>

    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss" scoped>
    .footer{
        display: grid;
        grid-template-rows: 2rem auto 2rem;
        grid-template-columns: 2rem auto 2rem;

        > div{
            grid-row: 2;
            grid-column: 2;
        }
    }
</style>