module.exports = {
    devServer: {
        proxy: 'http://tr.local'
    },
    pluginOptions: {
        // html: {
        //     template: "./src/index.html"
        // }
    },
    css: {
        loaderOptions: {
            sass: {
                data: '' +
                '@import "@/scss/_vars.scss";' +
                '@import "@/scss/_mixins.scss";'
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end();
    }
}
