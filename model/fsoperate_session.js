const FileOperate = require("../module/fsoperate").FileOperate;

class FileOperateStructure {
    constructor(rootPath = null, cwd = null) {
        this.rootPath = rootPath;
        this.cwd = cwd;
        // this.fso = new FileOperate(rootPath);
    }

    // fileOperate() {
    //     return this.fso;
    // }

    // rootPath(rootPath) {
    //     if (rootPath) {
    //         this._rootPath = rootPath;
    //         this.fso = new FileOperate(rootPath);
    //         return this._rootPath;
    //     } else {
    //         return this._rootPath;
    //     }
    // }

    // cwd(cwdp) {
    //     if (cwdp) {
    //         this._cwd = cwdp;
    //         return this._cwd;
    //     }
    //     return this._cwd;
    // }

}


class UseFileOperate {
    constructor(fileOperateStructure) {
        this.fileOperate = new FileOperate(fileOperateStructure.rootPath);
        this.fileOperateStructure = fileOperateStructure;
    }

    cwd(cwdp) {
        if (cwdp) {
            this.fileOperateStructure.cwd = cwdp;
            return this.fileOperateStructure;
        }
        return this.fileOperateStructure.cwd;
    }

}




exports.FileOperateStructure = FileOperateStructure;
exports.UseFileOperate = UseFileOperate;