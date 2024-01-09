const cloudinary = require('cloudinary').v2;



const getPublicID = async (url) => {

    // Extract public ID from the URL (assuming the URL follows Cloudinary conventions)
    const publicId = url.split('/').pop().split('.')[0];
    return (publicId);
    console.log(publicId)


};

module.exports = {
    getPublicID
};
