# Face Detection

Main project Forked: [face-api.js](https://github.com/justadudewhohacks/face-api.js)

### Technologies used:
 
 * [nvm install](https://github.com/nvm-sh/nvm)   without SUDO

 	`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`
 	`nvm install 10`
 
 * tensorFlow Node = 1.7.0
 * node = 10
 * typescript

### Install global package 

	# Or globally with TypeScript.
	npm install -g typescript
	npm install -g ts-node

### NPM packages to install:
	
	npm i face-api.js@0.22.2 canvas@2.6.1 @tensorflow/tfjs-node@1.7.0 --save

### Execute the task:

	ts-node faceDetection.ts



## Suport typeScript

Step step for install [support typescript](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
Install package necessary

	npm i typescript tsc-watch

Add on ̀̀̀̀̀̀̀`package.json`

	"scripts": {
		"dev": "tsc-watch --onSuccess \"node ./dist/server.js\""
	}

Create file config typescript: ̀̀̀̀̀̀̀̀̀̀̀̀`tsconfig.json`

	npx tsc --init --moduleResolution node --resolveJsonModule --target es6 --noImplicitAny --sourceMap --lib dom,es2017 --outDir dist



![face detection flashman yellow](./README/faceDetection.jpg)