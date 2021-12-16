module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3380',
                ws: false,
                changeOrigin: true,
                pathRewrite:{
                    '^/':''
                }
            }
        }
    }
}