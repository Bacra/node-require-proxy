node-require-proxy  [![Build Status](https://travis-ci.org/Bacra/node-require-proxy.svg?branch=master)](https://travis-ci.org/Bacra/node-require-proxy)
==================

require modules through config proxy


## Features

* custom alias for require package
* easy `reload` package
* easy add alias by file width using `addAliasByFile`


## Notice

* `require("mload")` is no cache mode in nodejs
* alias is override


## Installation

	$ npm install mload


## Usage

Method: `load` `clear` `addAlias` `info` `addAliasByFile`

### Add alias and require package

	var mload = require('mload');
	var oAlias  = {v1: './v1', v2: './v2'};
	mload(oAlias);
	for(var i in oAlias)
	{
		mload(i);
	}

	// the following is bad
	/*
	for(var i in oAlias)
	{
		require('mload')(i);
	}
	*/


### Add alias by file

	mload.addAliasByFile('./mod/alias.js');

Note: The paths of alias in `./mod/alias.js` are based on `./mod/`

