const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '356113ee31f34bf697994b5475bd2a04'
  });
const handleApiCall = (req,res) => {
    console.log(req.body.imageUrl);
    
      app.models.initModel({ id: Clarifai.CELEBRITY_MODEL })
      .then(generalModel => {
        return generalModel.predict(req.body.imageUrl);
        
      })
      .catch(err=>res.status(400).json('Wrong credentials')); 
      

}
module.exports={
    handleApiCall:handleApiCall
}
