class FileListPlugin {
    constructor(options) {
        this.options = options;
    }
    //插件安装时被调用
    apply(compiler) {
        console.log("-------插件初始化了---------");
        //compiler包含webpack信息
        //console.log(compiler);
        compiler.plugin('emit', (compilation, callback) => {
            //console.log(JSON.stringify(compilation.hooks))
            // 创建一个头部字符串：
            var filelist = 'In this build:\n\n';

            // 检查所有编译好的资源文件：
            // 为每个文件名新增一行
            for (var filename in compilation.assets) {
                filelist += ('- ' + filename + '\n');
            }

            // 把它作为一个新的文件资源插入到 webpack 构建中：
            compilation.assets['filelist.md'] = {
                source: function () {
                    return filelist;
                },
                size: function () {
                    return filelist.length;
                }
            };
            callback()
        })
    }
}

module.exports = FileListPlugin;