const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
	accessKeyId: "AKIAJ2G5YCRRZ2OKUQZA",
	secretAccessKey: "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"
});

var s3 = new AWS.S3( { apiVersion: '2006-03-01' } );

function clearBucket() {

	var params = {
		Bucket: 'mindworms'
	}

	return new Promise((res, rej) => {
		s3.listObjects(params, (e, data) => {

			if (e) { rej(e) }

				if (data.Contents.length == 0) {
					res()
				}

				params = {
					Bucket: "mindworms",
					Delete: {
						Objects: data.Contents.map(o => ({ "Key": o.Key }))
					}
				}

				s3.deleteObjects(params, (e, d) => {

					if (!e) {
						res()
					} else {
						rej(e)
					}
				})
			});
	})	
}





function upload(file, filename) {
	return new Promise((res, rej) => {
		let params = {
			Bucket: "mindworms",
			Key: filename,
			Body: fs.createReadStream(file)
		}

		s3.upload(params, (e, d) => {
			if (!e) {
				res()
			}
		})
	})
}




module.exports = {
	clear: clearBucket,
	upload: upload
}


