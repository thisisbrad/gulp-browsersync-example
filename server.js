var express = require('express')
var morgan = require('morgan')
var livereload = require('connect-livereload')

var app = express()

app.use(livereload({
    port: 35729,
    ignore: ['.js', '.svg']
	}));


app.use(express.static('public'))
app.use(morgan('dev'))

app.get('*', function(req, res, next){
	res.sendFile(__dirname + '/public/index.html')
})

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('### Server is listening on PORT: ' + server.address().port)
})