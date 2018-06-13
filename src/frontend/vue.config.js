const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 7070
    },
    configureWebpack: () => {
        module: {
            rules: [{
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            "libraryName": 'vant',
                            "libraryDirectory": 'es',
                            "style": true
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                exclude: /node_modules/
            }]
        }
    },

}