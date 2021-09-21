module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Persona 4 - Weather News";

                return args;
            })
    }
}