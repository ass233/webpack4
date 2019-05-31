const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let cssExtract = new ExtractTextWebpackPlugin('css/css.css')
let lessExtract = new ExtractTextWebpackPlugin('css/less.css')
let sassExtract = new ExtractTextWebpackPlugin('css/sass.css')
// let pages = ['index','base','about'];
// pages = pages.map(page => new HtmlWebpackPlugin({
//     template:`./src/${page}.html`,
//     filename:`${page}.html`,
//     title:`${page}`,
//     hash:true,
//     chunks:['vendor',`${page}`],
//     minify:{
//         removeAttributeQuotes:true
//     }
// }))

module.exports = {
    // entry:{
    //     index:'./src/index.js',
    //     base:'./src/base.js',
    //     about:'./src/about.js',
    //     vendor:'jquery'
    // },
    entry:'./src/main.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].[hash:8].js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // loader:["style-loader","css-loader"] 插入页面
                loader:cssExtract.extract({
                    use:["css-loader","postcss-loader"]
                })
            },
            {
                test:/\.less$/,
               // loader:["style-loader","css-loader","less-loader"]
               loader:lessExtract.extract({
                 use:["css-loader","less-loader","postcss-loader"]
                })
            },
            {
                test:/\.scss$/,
                // loader:["style-loader","css-loader","sass-loader"]
                loader:sassExtract.extract({
                    use:["css-loader","sass-loader","postcss-loader"]
                })
            },
            {
                test:/\.(png|jpg|gif|svg|bmp)/,
               loader:{
                   loader:'url-loader',
                   options:{
                       outputPath:'images/'
                   }
               }
            },
            {
                test:/\.(html|htm)/,
                loader:'html-withimg-loader'
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            title:'好好学习webpack4',
            hash:true,
            minify:{
                removeAttributeQuotes:true
            }
        }),
        cssExtract,
        lessExtract,
        sassExtract
        
    ],
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:8181,
        compress:true
    }
}