const fs = require("fs");
const path_moduel = require("path");
// const os = require("os");
const {
    BaseFileOperate
} = require("./base_fsoperate");



//文件操作具体
class FileOperate extends BaseFileOperate {

    constructor(args) {
        super(args);
    }

    type(path) {
        return this.pathAccessCheck(path, (absPath) => {
            let info = fs.statSync(absPath);
            // let other = "";
            // other = info.isFIFO() ? "FIFO" :
            //     info.isSocket() ? "Socket" :
            //     info.isCharacterDevice() ? "CharacterDevice" :
            //     info.isBlockDevice() ? "BlockDevice" :
            //     info.isSymbolicLink() ? "SymbolicLink" : "";
            return {
                name: path_moduel.basename(absPath),
                size: info.size,
                isFile: !info.isDirectory(),
                time: info.mtime,
                // info: other,
                checkbox: false //唯一前端数据
            };
        });
    }

    ls(path) {
        return this.pathAccessCheck(path, (absPath) => fs.readdirSync(absPath));
    }

    lsType(path) {
        let result = [];
        let that = this;
        this.pathAccessCheck(path, (absPath) => {
            let list = fs.readdirSync(absPath);
            for (const v of list) {
                let pathonce = path_moduel.join(absPath, v);
                result.push(that.type(pathonce));
            }
        });
        return result;
    }

    rm(path) {
        return this.pathAccessCheck(path, (absPath) => {
            if (fs.statSync(absPath).isDirectory()) {
                fs.rmdirSync(absPath);
                return !fs.existsSync(absPath);
            }
            fs.unlinkSync(absPath);
            return !fs.existsSync(absPath);
        });
    }

    mv(srcpath, newpath) {
        return this.pathAccessCheck([srcpath, newpath], (paths) => {
            fs.renameSync(paths[0], paths[1]);
            return fs.existsSync(paths[1]) && !fs.existsSync(paths[0]);
        });
    }

    cp(srcpath, newpath) {
        return this.pathAccessCheck([srcpath, newpath], (paths) => {
            if (!fs.existsSync(paths[0]) || fs.statSync(paths[0]).isDirectory())
                return false;
            let readStream = fs.createReadStream(paths[0]);
            let writeStream = fs.createWriteStream(paths[1]);
            readStream.pipe(writeStream);
            return fs.existsSync(paths[0]) && fs.existsSync(paths[1]);
        });
    }

    //获取某目录下详细数据
    readFiles(path) {
        return this.pathAccessCheck(path, (absPath) => {
            if (!fs.statSync(absPath).isDirectory()) return null;
            let files = fs.readdirSync(absPath);
            let result = [];
            for (let v of files) {
                let info = fs.statSync(path_moduel.join(absPath, v));
                result.push(info);
            }
            if (result.length <= 0) return null;
            return result;
        });


    }

    // this.batchExectue(a, [a, b, c], [a, b, c]);
    batchExectue(exectue, ...argsList) {

        let argsListLen = argsList.length;
        let argsZeroLen = argsList[0].length; //第一个参数为参考
        let resultStack = [];
        for (let i = 0; i < argsZeroLen; i++) {
            let argsStack = [];
            for (let z = 0; z < argsListLen; z++) {
                argsStack.push(argsList[z][i]);
            }
            let result = exectue.apply(this, argsStack);
            resultStack.push(result);
        }
        return resultStack;
    }

}


exports.FileOperate = FileOperate;