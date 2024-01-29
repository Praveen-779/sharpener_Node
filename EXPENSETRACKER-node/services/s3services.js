const AWS = require('aws-sdk');

exports.uploadTos3 = (data,filename) => {

    try {
        const BUCKET_NAME = 'expensetrackapplication';
        const IAM_USER_KEY = 'AKIAVRUVTCO4EKTUMYKF';
        const  IAM_USER_SECRET = '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';

        const s3bucket = new AWS.S3({
            accessKeyId : IAM_USER_KEY,
            secretAccessKey : IAM_USER_SECRET 

        })
            const params = {
                Bucket: BUCKET_NAME,
                Key : filename,
                Body : data,
                ACL : 'public-read'
            }

            return new Promise((resolve,reject) => {
                s3bucket.upload(params, (err,data) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(data.Location);
                })
            })
    } catch(err) {
        console.log(err);
    }
}