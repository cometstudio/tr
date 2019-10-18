<template>
  <div id="app">
      <component :is="layout">
          <router-view />
      </component>
  </div>
</template>

<script>
    const default_layout = 'default'

    export default {
        computed: {
            layout(){
                return (this.$route.meta.layout || default_layout) + '-layout'
            }
        }
    }
</script>

<style lang="scss">
    @import '~reset-css';
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i&display=swap&subset=cyrillic');

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
        font-family: "IBM Plex Sans", sans-serif;
    }
    html, body{
        @include bg('gray--light');
        @include color('black');
    }
    button{
        cursor: pointer;
    }
    h2{
        font-weight: $bold;
        font-size: 1.7rem;
        line-height: 1.4em;
        margin-bottom: 2rem;
    }
    h3{
        font-weight: $bold;
        font-size: 1.2rem;
        line-height: 1.4em;
        margin-bottom: 2rem;
    }
</style>
