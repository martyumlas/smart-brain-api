const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'de319c321b4a441ea089c8fee08832d4'
});


const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
       return res.json(data)
    }).catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body
    db('users')
    .where('id', id)
    .increment('entries',  1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage, 
    handleApiCall
}