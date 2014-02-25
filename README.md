#Appendit [![NPM version](https://badge.fury.io/js/appendit.png)](http://badge.fury.io/js/appendit) [![Build Status](https://travis-ci.org/stefanbuck/appendit.png?branch=master)](https://travis-ci.org/stefanbuck/appendit) [![Coverage Status](https://coveralls.io/repos/stefanbuck/appendit/badge.png)](https://coveralls.io/r/stefanbuck/appendit) [![Dependency Status](https://david-dm.org/stefanbuck/appendit.png?theme=shields.io)](https://david-dm.org/stefanbuck/appendit)

Appendit allows you easily to add text at a specific line. It will works with any plain text format like ```.txt``` ```.md``` ```.js``` ...

## Installation

```npm install --save appendit```

# Example

Below a quick example how to use appendit:


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
Call the ```appendit``` function with the following parameters:

```
var fs = require('fs');
var appendit = require('appendit');

var content = appendit({
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
appendit({
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
