const multer = require('multer');

const upload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log("files--------->>>>>>", file);
                cb(null, './uploads/')
            },
            filename: function (req, file, cb) {
                let ext = '';
                console.log("ext")
                if (file.originalname.split(".").length > 1)
                    ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, file.fieldname + '_' + Date.now() + ext)
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log('hello');
        next();
    }
}
module.exports = {
    upload
}