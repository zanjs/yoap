# React Redux React-Router 4 Webpack 2 Sass Postcss Boilerplate
### :sunglasses: React@next, React-Router@next, Redux and Webpack 2, Sass and Postcss.
This template we're usually using on front-end side :)

#### Quick start

* `git clone https://github.com/expdevelop/exp-template.git`
* `npm install` or `yarn install`
* `npm start` or `yarn start`

:tada: Congrats! 
Go to localhost:8080 and enjoy modern front-end developing.

## Features
- [X] [Webpack 2](https://github.com/webpack/webpack)
- [X] [React 15.4.2](https://github.com/facebook/react)
- [X] [React Router v4](https://github.com/ReactTraining/react-router)
- [X] [React Hot Loader v3](https://github.com/gaearon/react-hot-loader)
- [X] [Redux](https://github.com/reactjs/redux)
- [X] [Store.js](https://github.com/marcuswestin/store.js)
- [X] [GreenSock GSAP](https://github.com/greensock/GreenSock-JS)
- [X] [Sass](https://github.com/expdevelop/exp-template/blob/master/webpack/webpack.config.dev.js#L61)
- [X] [Postcss (autoprefixer)](https://github.com/expdevelop/exp-template/blob/master/postcss.config.js)
- [X] [Simple commands for creating React components](https://github.com/expdevelop/exp-template/blob/master/rcc.sh)
- [X] [Recognizing by Webpack main project import folders](https://github.com/expdevelop/exp-template/blob/master/webpack/webpack.config.dev.js#L88)
- [ ] ES Lint
- [ ] Server-side rendering

### Simple commands for creating React components
Just run `npm run rcc` to create React Class component or `npm run rcf` to create React function component 
and follow instructions in terminal.
* Write a name of the component
* Write the relative path to `./src/` (by default it's `components`)


Remember you should register your component (for example in `./src/components/index.js`)

### Recognizing main project import folders
You can import your modules & data from:
* components
* containers
* pages
* helpers
* actions
* constants
* config

anywhere in project!

#### Example
`./containers/App/App.js`
```js
import pages from 'pages'
import {
  PagesTransitions, Overlay,
  Defender, PathNotify
} from 'components'
```
Also you can [configure the folders](https://github.com/expdevelop/exp-template/blob/master/webpack/webpack.config.dev.js#L88).

## Support
You can import and use following file types:
* Javascript: `.js, .jsx, .json`
* Sass: `.sass, .scss`
* Images: `.jpg, .jpeg, .png, .gif`
* Svg: `.svg`. Only as a string, check out our [Svg component](https://github.com/expdevelop/exp-template/blob/master/src/components/Svg/Svg.js).

#### History

* 03/02/17 - Initial

## Directory

The content you should focus on to get a better idea of what is going on.

```
exp-template/
|   package.json
|
└───src/
│   │
│   └───api/
│   |     index.js
│   |     ...
│   |
│   └───components/
│   |     index.js
│   |     ...
│   |
│   └───containers/
│   |     index.js
│   |     ...
│   |
│   └───data/
│   |     images/
│   |     icons/
│   |     ...
│   |
│   └───helpers/
│   |     animation/
│   |     app/
│   |     validation/
│   |     index.js
│   |     ...
│   |
│   └───pages/
│   |     index.js
│   |     ...
│   |
│   └───store/
│   |     actions/
│   |     constants/
│   |     reducers/
│   |     index.js
│   |     ...
│   |
│   └───theme/
│   |     index.sass
│   |     ...
│   │ 
│   │ config.js
│   │ index.js
│   
│   
└───webpack/
      webpack.config.dev.js
      webpack.config.prod.js
      template.html
```

## Commands
#### Install dependencies:

`npm install` or `yarn install`

#### Launch development server:

`npm start` or `yarn start`

#### Build project:

`npm build` or `yarn build`

#### Run simple server in production mode (before this command you should build your project):

`npm prod` or `yarn prod`

#### Create React Class component:

`npm run rcc`

#### Create React function component:

`npm run rcf`
