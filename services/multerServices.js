var multer  = require('multer');


/* File Uploader Multer for Variant Images*/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
     /*  console.log("query params == ",req.query); */
      var brand = req.user.brand;
  
      cb(null, './public/images/brands/'+ brand.brand_name.toLowerCase().split(' ').join('_') + "_" +  brand.id + '/product');
    },
    filename: (req, file, cb) => {
     /*  console.log(file); */
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
  });


const createBlogpost = async (user, content) => {
  try {
    return await blogpostDb(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}


var multipleUpload = multer({ storage: storage }).array('files');
var upload = multer({ storage: storage }).single('file');


module.exports = {
  createBlogpost,
  multipleUpload,
  upload
}
