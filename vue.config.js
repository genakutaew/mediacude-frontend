const path = require('path')

module.exports = {
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true,
                secure: false
            },
            '/storage': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true,
                secure: false
            }
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.sass'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
}
