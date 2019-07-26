const Sty_Image = require("../../models").Sty_Image;
const Variant = require("../../models").Variant;
const _ = require("lodash");


module.exports = {
  variantImageCreate(req, res) {
    const files = req.files;
    /* console.log("req file = ", req.params); */
    var brand = req.user.brand;
    var imgUrlArray = [];

      _.forEach(files, function(_file) { 
        imgUrlArray.push({ 
          url: 'http://localhost:8080/images/brands/'+ brand.brand_name.toLowerCase().split(' ').join('_') + "_" +  brand.id + '/product/' + _file.filename,
          primary_img: false
        })
      });

    return  Sty_Image.create({
        style_id: req.params.style_id,
        brand_id: req.user.brand_id,
        img_urls: imgUrlArray
      }).then(styImg => {

        /* console.log("img id ", styImg.id ); */
        var imgId = styImg.id;
        var variants = JSON.parse(req.body.variants_ids);

        var promises = [];
        _.forEach(variants, function(_vid) {
          promises.push(
            Variant.update(
              {
                img_id: imgId
              },
              {
                where: { id: _vid, style_id: req.params.style_id }
              }
            )
          )
        });

        Promise.all(promises).then(data => {
          var errorCount = 0;
          data = data.map(entry => {
            if (entry[0] === 0) {
              errorCount = errorCount + 1;
            }
          });
          console.log(" Variant img error  = ", errorCount);
        });


        return res.status(200).send({
          data: { response: styImg },
          status: "success"
        });
        
        
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });



    
    
}

};

