module.exports = {
	'secret': 'supersecret',


	'facebookAuth': {
		'clientID': '475419656529638',
		'clientSecret': '4a00ee73d7abc87e8f0209e9ed6330d6',
		'callbackURL': 'http://localhost:3000/api/auth/facebook/callback'
		// 'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

	},

	'googleAuth': {
		'clientID': '396276295747-56m9ho1o0dhklbqd95u6ql5n3uj1luue.apps.googleusercontent.com',
		'clientSecret': 'your-client-secret-here',
		'callbackURL': 'http://localhost:3000/auth/google/callback'
	}

};