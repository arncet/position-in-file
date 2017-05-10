# position-in-file

A [node.js](https://nodejs.org/en/) util to find element position on a file of a folder.

## How to use :

Install `position-in-file` via npm :

```
npm install --save position-in-file
```

Use it : 

```javascript
const positionInFile = require('position-in-file')

//positionInFile(needle, haystack, options)

//Exemple :
positionInFile('element-to-look-for', 'where-to-search', {deep: false, ...})

//Result : 
[
	{file: 'finded-in-this-file.ext', lines: {2: [5]}}, //Line 2 column 5
	{file: 'finded-here.too.ext', lines: {1: [2, 19]}}, //Line 1 column 5, line 1 column 19
	...
]
```

If node doest display deep object you can use [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options) : 

```javascript
	const inspect = require('util').inspect

	const result = positionInFile('element-to-look-for', 'where-to-search', {deep: false, ...})
	console.log(inspect(result, {showHidden: false, depth: null}))
```

## Parameters

* **`needle`** *(String || RegExp)* : The element to search, can be a *string* or a *regular expression*.
* **`haystack`** *(String)* : The path where the research will be executed, it can be a file or folder path. If *haystack* is not defined the research will be excecuted in the current folder.
* **`options`** *(Object)* : Some aditionnals options :
	* **`deep`** *(Boolean)* : If the research will be apply on deep folder. Default : ```true```.
	* **`ignore `** : *(Array)* An array to define the file/filter to ignore. Default : empty array.
	* **`fullPathRequired `** *(Boolean)* : If full path need to be specified on ```option.ignore``` or just the file name. Default : ```true```.
	* **`gitIgnore `** *(Boolean)* : If .gitIgnore's file/folder need to be ignored. Default : ```true```.
	
## License :

MIT







