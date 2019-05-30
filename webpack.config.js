const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = ['index','base','about'];
pages = pages.map(page => new HtmlWebpackPlugin({
    template:`./src/${page}.html`,
    filename:`${page}.html`,
    title:`${page}`,
    hash:true,
    chunks:['vendor',`${page}`],
    minify:{
        removeAttributeQuotes:true
    }
}))

module.exports = {
    entry:{
        index:'./src/index.js',
        base:'./src/base.js',
        about:'./src/about.js',
        vendor:'jquery'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].[hash:8].js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new CleanWebpackPlugin(),
        ...pages
        // new HtmlWebpackPlugin({
        //     template:'./src/index.html',
        //     filename:'index.html',
        //     title:'好好学习webpack4',
        //     hash:true,
        //     chunks:['vendor','index'],
        //     minify:{
        //         removeAttributeQuotes:true
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     template:'./src/base.html',
        //     filename:'base.html',
        //     title:'base',
        //     hash:true,
        //     chunks:['vendor','base'],
        //     minify:{
        //         removeAttributeQuotes:true
        //     }
        // })
    ],
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:8181,
        compress:true
    }
}