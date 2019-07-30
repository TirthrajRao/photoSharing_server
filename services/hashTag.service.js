const hashTagModel = require('../model/hashtag.model');

/**
 * @param {object} hashTagData
 * add hashTag
 */
module.exports.addTag = (hashTagData) => {
    console.log('hashTag=========>', hashTagData)
    const hashTag = new hashTagModel(hashTagData)
    return new Promise((resolve, reject) => {
        hashTagModel.findOneAndUpdate({ hashTag: hashTagData.hashTag }, { $inc: { count: 1 } }, { upsert: true, new: true })
            .exec((err, foundTag) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                    console.log('err------------------>', err);
                } else if (!foundTag) {
                    hashTag.save((err, tag) => {
                        if (err) {
                            reject({ status: 500, message: 'Internal Serevr Error' });
                            console.log('err------------------>', err);
                        } else {
                            console.log('hastag=================>', tag);
                            resolve({ status: 200, message: 'hashTag added sucessfully', data: tag });
                        }
                    })

                } else {
                    console.log("=============foundTag=================>", foundTag);
                    resolve({ status: 200, message: ' Post Shared', data: foundTag });
                }
            })
    })
}

/**
 * get HashTag
 */
module.exports.getTag = () => {
    return new Promise((resolve, reject) => {
        hashTagModel.find({}, function (err, tag) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
                console.log('err------------------>', err);
            } else {
                console.log('all tag====================>', tag);
                resolve({ status: 200, message: 'hashTag  fetched', data: tag });
            }
        })
    })
}
