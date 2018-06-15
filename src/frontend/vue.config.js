const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: 7070
    },
    chainWebpack: config => {
        config.module
            .rule("ts")
            .test(/\.(ts|tsx)$/)
            .use("ts-loader")
            .loader("ts-loader")
            .options({
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [
                        tsImportPluginFactory({
                            libraryName: "vant",
                            libraryDirectory: "es",
                            style: true
                        })
                    ]
                }),
                compilerOptions: {
                    module: "es2015"
                }
            });
    },
    configureWebpack: () => {
        external: {
            "BMap"
        }
    }
};