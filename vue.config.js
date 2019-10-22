module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    devServer: {
        sockHost: 'localhost：5333',
        disableHostCheck: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5333',
                changeOrigin: true,
                pathRewrite: { "^/api": "/" }
            }
        }
    }
}