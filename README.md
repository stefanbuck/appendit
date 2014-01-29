#Appender [![Build Status](https://travis-ci.org/stefanbuck/appender.png?branch=master)](https://travis-ci.org/stefanbuck/appender)


## Installation

```npm install --save appender```

# Example

Below a quick example how to use appender:


The ```index.html``` looks like that:

```
<html>
	<head>
		<title></title>
		<!-- anchor -->
	</head>
	<body>
	</body>
</html>
```
Call the ```appender``` function with the following parameters:

```
var fs = require('fs');
var appender = require('appender');

var content = appender({
  source: fs.readFileSync('index.html', 'utf8'),
  anchor: '<!-- anchor -->',
  content: [
    '<script src="main.js"></script>'
  ]
});

fs.writeFileSync('index.html', content);
```

Output: 

```
<html>
	<head>
		<title></title>
		<script src="main.js"></script>
		<!-- anchor -->
	</head>
	<body>
	</body>
</html>
```

###One more

Let's add a headline to the body:

```
appender({
  source: fs.readFileSync('index.html', 'utf8'),
  anchor: '</body>',
  content: [
    '<h1>Hello Node!</h1>'
  ]
})
```

Output: 

```
<html>
	<head>
		<title></title>
		<script src="main.js"></script>
		<!-- anchor -->
	</head>
	<body>
		<h1>Hello Node!</h1>
	</body>
</html>
```

# Testing
Running ```npm test```will run the unit tests with mocha
