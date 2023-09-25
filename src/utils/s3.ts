import * as AWS from 'aws-sdk';
import { Image } from '~/services/post';

AWS.config.update({
  accessKeyId: 'AKIAQTYTLWIRU62VFLHY',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
});

const s3 = new AWS.S3();

export const uploadImage = async (imageFile: Image) => {
  const body = await getBlob(imageFile.uri);

  const params = {
    Bucket: 'kioku-storage',
    Key: imageFile.key,
    Body: body,
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      console.log('Uploaded Image error:', err, err.stack);
    } else {
      console.log('Uploaded Image:', data);
    }
  });
};

const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const getS3Image = (key: string) => {
  return `https://kioku-storage.s3.ap-southeast-1.amazonaws.com/${key}`;
};

export default AWS;
