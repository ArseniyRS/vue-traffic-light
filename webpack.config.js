const {VueLoaderPlugin} = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const path = require("path");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`


const plugins = () => {
    const base = [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new OptimizeCssAssetsPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: "./public/favicon.ico"
        })
    ]

    // if (isProd) {
    //     base.push(new BundleAnalyzerPlugin())
    // }

    return base
}


module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/"
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.jsx', '.json'],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@c": path.resolve(__dirname, "src/components"),
            "@s": path.resolve(__dirname, "src/styles"),
            "@a": path.resolve(__dirname, "src/assets"),
        }
    },
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        presets: [["@babel/preset-env", {"corejs": 3}]],
                        plugins: [
                            "@babel/plugin-transform-destructuring",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-template-literals"
                        ],
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.s?css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            }
                        }
                    },
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader",
                options: {
                    context: "src/assets/fonts",
                    name: "[path][name].[ext]",
                    outputPath: "fonts"
                }
            },
            {
                test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                loader: "file-loader",
                options: {
                    context: "src/assets/img",
                    name: "[path][name].[ext]",
                    outputPath: "img"
                }
            }
        ]
    },
    plugins: plugins(),
    performance: {
        hints: false
    },
    devtool: isDev ? 'source-map' : undefined,
    devServer: {
        hot: isDev,
        host: "127.0.0.1",
        port: "5000"
    }
};