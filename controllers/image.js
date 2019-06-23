const Clarifai = require('clarifai');

// Check out Clarifai for an API key
const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY_GOES_HERE'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to Work With API.  Did you include an actual url?'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to Get Entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}