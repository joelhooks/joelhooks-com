---
layout: post
title: 'Build an Image Gallery Using React, Redux and redux-saga'
date: 2016-03-20
---

# Building an Image Gallery

The image gallery we will build is a simple application that displays an array of image URLs loaded from a service (Flickr), and allows the user to select them individually.

![](https://s3.amazonaws.com/f.cl.ly/items/3v0l00410J1Z1j310b24/Screen%20Shot%202016-03-20%20at%203.42.17%20PM.png?v=1b32daca)

It will be built with React, using Redux and redux-saga. React is being used as the core framework to take advantage of its virtual-dom implementation. Redux will handle the management of state within the application. Finally, we will use redux-saga to handle the complexity of asynchronous sequences.

We will write the gallery in ES6 (arrow functions, modules, and template strings!), so we will need to do a bit of project setup to get going.

## Project Setup and Automation

There is a significant array of options when it comes to getting started with a React application. For this simple app, we want to keep it as minimal as possible. We are going to use Babel to transpile ES6 into good ol’ ES5 for the browser, budo/browserify to serve it locally, and tape to test.

Create a file called package.json in a new project folder and add the following contents to it:

### package.json

{
"name": "egghead-react-redux-image-gallery",
"version": "0.0.1",
"description": "Redux Saga beginner tutorial",
"main": "src/main.js",
"scripts": {
"test": "babel-node ./src/saga.spec.js | tap-spec",
"start": "budo ./src/main.js:build.js --dir ./src --verbose --live -- -t babelify"
},
"repository": {
"type": "git",
"url": "git+https://github.com/joelhooks/egghead-react-redux-image-gallery.git"
},
"author": "Joel Hooks <joelhooks@gmail.com>",
"license": "MIT",
"dependencies": {
"babel-polyfill": "6.3.14",
"react": "^0.14.3",
"react-dom": "^0.14.3",
"react-redux": "^4.4.1",
"redux": "^3.3.1",
"redux-saga": "^0.8.0"
},
"devDependencies": {
"babel-cli": "^6.1.18",
"babel-core": "6.4.0",
"babel-preset-es2015": "^6.1.18",
"babel-preset-react": "^6.1.18",
"babel-preset-stage-2": "^6.1.18",
"babelify": "^7.2.0",
"browserify": "^13.0.0",
"budo": "^8.0.4",
"tap-spec": "^4.1.1",
"tape": "^4.2.2"
}
}

With the `package.json` in place, you can run `npm install` in the project folder and install all of the dependencies that we will need.

We're also going to need to configure Babel with a .babelrc file in the project folder that contains the Babel presets that we want to use:

### .babelrc

{
"presets": ["es2015", "react", "stage-2"]
}

This file tells babel that we will be using ES2015 (ES6), React, and stage-2 features of the emerging ECMAScript standard (ES2016).

The `package.json` has two standard scripts configured called `start` and `test`. For right now, we want to get `start` working so we can load the application. The `start` script is currently configured to look inside of a folder called `src` so _create a folder called `src`_ in the project directory and add the following files:

### index.html

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>egghead: React Redux Image Gallery</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="title">
  <img src="https://cloud.egghead.io/2G021h3t2K10/download/egghead-logo-head-only.svg" class="egghead">
  <h3>Egghead Image Gallery</h3>
</div>

<div id="root"></div>

<script type="text/javascript" src="build.js"></script>
</body>
</html>
```

### main.js

```javascript
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById('root'),
);
```

### styles.css

```css
body {
  font-family: Helvetica, Arial, Sans-Serif, sans-serif;
  background: white;
}

.title {
  display: flex;
  padding: 2px;
}

.egghead {
  width: 30px;
  padding: 5px;
}

.image-gallery {
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid darkgray;
}

.gallery-image {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image img {
  width: 100%;
  max-height: 250px;
}

.image-scroller {
  display: flex;
  justify-content: space-around;
  overflow: auto;
  overflow-y: hidden;
}

.image-scroller img {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: 1px solid black;
}
```

The `index.html` loads the `styles.css` to give us some basic styling/layout. It also loads the script `build.js`, which is a _generated_ file. Our `main.js` is a very basic React application that renders an `h1` into the `#root` element inside of `index.html`. With these files in place, you should now be able to run **`npm start`** in the project folder and navigate to [https://10.11.12.1:9966/](https://10.11.12.1:9966/) and see the following:

![](https://s3.amazonaws.com/f.cl.ly/items/2I1V0o2c1d281f3i3408/Screen%20Shot%202016-03-20%20at%204.31.06%20PM.png?v=1720e99d)

Now we will build the base `Gallery` React component.

## Displaying some images in the gallery.

First thing's first, and we want to get some images displayed as quickly as possible! We will create a `Gallery` component that will display our images. In the project folder, create a file called `Gallery.js` with the following contents.

### Gallery.js

```javascript
import React, { Component } from 'react';

const flickrImages = [
  'https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg',
  'https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg',
  'https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg',
  'https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg',
  'https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg',
];

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: flickrImages,
      selectedImage: flickrImages[0],
    };
  }
  render() {
    const { images, selectedImage } = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
```

We've hard coded an array of data into this component, which is a great way to start working quickly. The `Gallery` extends `Component`, and in its constructor we set the initial state of the component. Finally, we render a basic structure with some styled markup. The `image-scroller` element uses the images array to produce multiple elements using `map`.

With the `Gallery` created, we can update `main.js` to load the gallery:

### main.js

```diff
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

+ import Gallery from './Gallery'

ReactDOM.render(
-  <h1>Hello React!</h1>,
+  <Gallery />,
  document.getElementById('root')
);
```

For now, we are using the hard-coded image URLs (via the `flickrImages` array), and displaying the first image url as the `selectedImage`. We're accessing these properties by setting a default initial state within the `Gallery` component class constructor.

![](https://s3.amazonaws.com/f.cl.ly/items/1T3G3p3T2q2H00472T1C/Screen%20Shot%202016-03-20%20at%204.51.14%20PM.png?v=afdd9bf7)

We can add interactivity to the gallery with an event handler that calls the `setState` method on the `Gallery` component:

### Gallery.js

```diff
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: flickrImages,
      selectedImage: flickrImages[0]
    }
  }
+  handleThumbClick(selectedImage) {
+    this.setState({
+      selectedImage
+   })
+  }
  render() {
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
-            <div key={index}>
+            <div key={index} onClick={this.handleThumbClick.bind(this,image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```

By adding `handleThumbClick` to the `Gallery` component class, we can access it in any elements `onClick` method. Note that we are using `bind(this,image)` in the `onClick`. By passing `image` as the second argument, it is sent as the first argument to `handleThumbClick`. This use of bind is an extermely handy way to pass _context_ to an event handler.

Looking good! Now we have some interaction, and something that resembles an "app". Now that we've dealt with getting the application running and displaying data, we can consider loading some remote data. The most obvious place to do that is one of the React component lifecycle methods. We will use `componentDidMount` and make a call to the Flickr API and load some images:

### Gallery.js

```diff
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: flickrImages,
      selectedImage: flickrImages[0]
    }
  }
+  componentDidMount() {
+    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
+    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.+getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;+
+
+    fetch(API_ENDPOINT).then((response) => {
+      return response.json().then((json) => {
+        const images = json.photos.photo.map(({farm, server, id, secret}) => {
+            return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
+        });
+
+        this.setState({images, selectedImage: images[0]});
+      })
+    })
+  }
[...]
```

We've added a new method to the Gallery class. We are using React's `componentDidMount` lifecycle method to trigger the loading of data from Flickr. Lifecycle methods are called by React at specific times in a component's lifecycle. In this case, the method will be called whenever the component is added to the DOM. Note that the Gallery component is only added to the DOM once, so this will give us our initial load of images. For a more dynamic component that is loaded and unloaded over an application's lifecycle, this might cause excessive service calls or other unforeseen results.

We are using the `fetch` browser API to make a request to Flickr. Fetch returns a promise that resolves with `response` object. Calling `response.json()` gives us another promise, which is the actual JSON result we are looking for. We'll map over the photos to create an array of Flickr image urls.

> Let's be honest. This application is simple. We could stop right here and we'd have the basic requirements done. Maybe we add an error handler in the fetch promise chain, some logic to see if there are images and _DONE!_ At this point you really have to stop and use your imagination a bit. Simple requirements rarely last in the real world. Soon the application will grow as feature requests roll in. Authentication, a slide show, the ability to load different galleries and images sets... This **is not** good enough.

So now that we have a working image gallery using React, we can start thinking about the foundation of patterns that we want to use to grow the application over time. The first order of business is to take away the `Gallery` component's power to control the state of the application.

We are going to introduce Redux to manage state instead, so let's get that setup.

## Using Redux to manage state

Anytime you use `setState` in your application _you've allowed the Component to become stateful_. While this isn't always bad, it can lead to some confusing application code over time, with state management spread from top to bottom in your application.

The Flux architecture is one solution that was introduced to help alleviate this. Flux moves logic and state into Stores. Stores are updated when Actions are dispatched in the application. Updates to Stores will trigger Views to be rendered with the new state.

So why not just drop in Flux? It's "official" architecture after all.

Well, **Redux is basically Flux**, but with some distinct advantages. Here's what [Dan Abramov (the creator of Redux) has to say](https://stackoverflow.com/a/32920459/87002):

> Redux is not that different from Flux. Overall it's the same architecture, but Redux is able to cut some complexity corners by using functional composition where Flux uses callback registration.

> It's not fundamentally different, but I find it that Redux makes certain abstractions easier, or at least possible to implement, that would be hard or impossible to implement in Flux.

The [Redux documentation](https://redux.js.org/) is great. Dan is a truly gracious and inspiring individual. If you haven't [read the code cartoons](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.7cra4lukv) or watched [Dan's free egghead.io series](https://egghead.io/series/getting-started-with-redux), now is the time!

### Bootstrapping Redux

The first thing we need to do is get Redux bootstrapped and running in our application. We don't have to install anything, that was all taken care of when we ran `npm install`, but we do need to import and configure Redux.

**The reducer function is the brain of Redux**. When an action is dispatched by the application, the reducer receives the action and creates the piece of application state that the reducer owns. Since **reducers are pure functions**, they can be composed together to create the complete state of the application. Let's create a simple reducer in the `src` folder:

### reducer.js

```javascript
export default function images(state, action) {
  console.log(state, action);
  return state;
}
```

A reducer function is a function that takes two arguments.

- `state` - this is the data that represents the state of the application. The reducer function will use this state to construct the new state. If no state has changed as result of the action, the reducer will simply return the state input.
- `action` - the event that has triggered the reducer. Actions are dispatched by the store, and handled by reducers. The action is required to have a `type` property that the reducer uses to apply changes to the new application state.

For right now, the `images` reducer will log to the console to prove that it is connected and ready for work. To use the reducer we need to configure redux in `main.js`:

### main.js

```diff
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

+ import { createStore } from 'redux'
+ import reducer from './reducer'

+ const store = createStore(reducer);

+ import {Provider} from 'react-redux';

ReactDOM.render(
+  <Provider store={store}>
    <Gallery />
+  </Provider>,
  document.getElementById('root')
);
```

We are going to import the `createStore` function from the Redux library. `createStore` is used to create the Redux store. For the most part, we don't interact directly with the store, it is something that Redux manages for us behind the scenes.

We also need to import the reducer function that we've just created so that it can be delivered to the store.

We will use `createStore(reducer)` to configure the store with our application's reducer. This example only has a single reducer, but `createStore` can take multiple reducers arguments. More on that a bit later!

Finally we import the higher-order `Provider` component from `react-Redux`. This will wrap our `Gallery` so that we can make easy use of Redux. We need to pass the store we just created to the `Provider` so that it can use it for us. You could use Redux without `Provider`, and in fact, React isn't required to use Redux at all! That's wonderful, but we are going to use `Provider` because it is very convenient.

If you open your developer tools console, you should see a message!

![](https://s3.amazonaws.com/f.cl.ly/items/2R3b143J1Y3T400i2c0w/Screen%20Shot%202016-03-20%20at%206.32.23%20PM.png?v=ba488b8e)

It may be a bit mysterious, but shows off an interesting point of Redux. _All reducers receive all actions that are dispatched in the application._ In this case we are seeing an action that Redux itself dispatches.

### Connecting the gallery component

With Redux, we will use the concept of "connected" and "un-connected" components. A connected component is wired into the store, and coordinates and controls action events and the store. Usually a connected component will have children that are "pure components" that take data as input, and render when that data is updated. These children are unconnected components.

> **note:** While React and Redux play very well together, React is _not_ required for Redux. You can use Redux without React!

react-redux provides a convenient wrapper for React components that does most of the heavy lifting required to connect a React component to a Redux store. We will add that to `Gallery` and make it our primary connected component:

### Gallery.js

```diff
import React, {Component} from 'react'
+import {connect} from 'react-redux';

-export default class Gallery extends Component {
+export class Gallery extends Component {
  constructor(props) {
    super(props);
+    console.log(props);
    this.state = {
      images: []
    }
  }
  componentDidMount() {
    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

    fetch(API_ENDPOINT).then((response) => {
      return response.json().then((json) => {
        const images = json.photos.photo.map(({farm, server, id, secret}) => {
            return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        });

        this.setState({images, selectedImage: images[0]});
      })
    })
  }
  handleThumbClick(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  render() {
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index} onClick={this.handleThumbClick.bind(this,image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

+export default connect()(Gallery)
```

Importing the `connect` function from react-redux lets us export `Gallery` by wrapping it in the connect component. Notice that `connect()(Gallery)` puts `Gallery` in a second set of parentheses. This is because `connect()` returns a function that expects a React component as an argument. The call to `connect()` configures that function. Soon we'll pass in arguments to `connect` to configure it for our applications specific actions and state structure.

We are also exporting the `connect` call as the `default` for this module. This is important! Now, when we `import Gallery` it will import the connected component and not the basic class.

![](https://s3.amazonaws.com/f.cl.ly/items/2k1Y1h3g1b0l1m0w212R/Screen%20Shot%202016-03-20%20at%206.42.19%20PM.png?v=bc54291d)

If you look at the console log that we've added to the constructor, you will see that the `Gallery` component's properties now include a `dispatch` function. This is part of what `connect` has modified for us, and gives us the ability to dispatch our own action objects to the applications reducers.

```diff
export class Gallery extends Component {
  constructor(props) {
    super(props);
+    this.props.dispatch({type: 'TEST'});
    this.state = {
      images: []
    }
  }
[...]
```

We can test it out by calling dispatch in the constructor. You should see a log statement from our reducer in your developer console. We've dispatched our first action! _Actions are plain old javascript objects_ that have a required `type` property. They can have any number of other properties as well to pass along to the reducer, but the `type` property allows reducers to listen for specific actions that they are interested in.

```diff
export default function images(state, action) {
-  console.log(state, action)
+  switch(action.type) {
+    case 'TEST':
+      console.log('THIS IS ONLY A TEST')
+  }
  return state;
}
```

Generally reducers use a `switch` block to filter messages they are interested in. The `switch` uses the action's type, and the reducer does its work when it gets an action that matches one of the `case`s of the `switch`.

Our application is now wired to receive actions. Now we need to connect it to the state provided by the Redux store.

### Default application state

Because we are using `connect`, we don't need to interact with the Redux store directly. We are going to configure a default application state to provide the Redux store.

### reducer.js

```diff
const defaultState = {
  images: []
}

export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'TEST':
-      console.log('THIS IS ONLY A TEST')
+      console.log(state, action)
+      return state;
+    default:
+      return state;
  }
-  return state;
}
```

We've created a `defaultState` object that has an empty array as its images property. We will set the `state` to default in the `images` function parameters. Now, if we log out the `state` property in our test case, you'll see that it isn't undefined! The reducer **needs to return the current state** of the application. This is important! Right now, we aren't making any changes, so we can just return the state. Note that we added a default case. The reducer should _always_ return an object representing the state.

In the `Gallery` we can also connect the applications state by mapping it to properties:

```diff
import React, {Component} from 'react'
import {connect} from 'react-redux';

export class Gallery extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch({type: 'TEST'});
+    console.log(props);
-    this.state = {
-      images: []
-    }
  }
-  componentDidMount() {
-    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
-    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.-getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;-
-
-    fetch(API_ENDPOINT).then((response) => {
-      return response.json().then((json) => {
-        const images = json.photos.photo.map(({farm, server, id, secret}) => {
-            return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
-        });
-
-        this.setState({images, selectedImage: images[0]});
-      })
-    })
-  }
-  handleThumbClick(selectedImage) {
-    this.setState({
-      selectedImage
-    })
-  }
  render() {
-    const {images, selectedImage} = this.state;
+    const {images, selectedImage} = this.props;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
-            <div key={index} onClick={this.handleThumbClick.bind(this,image)}>
+            <div key={index}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

+function mapStateToProps(state) {
+  return {
+    images: state.images
+    selectedImage: state.selectedImage
+  }
+}

-export default connect()(Gallery)
+export default connect(mapStateToProps)(Gallery)
```

We are going to remove all of the image loading and interaction in the connected component for now. If you look towards the bottom of `Gallery` you will notice that we created a function called `mapStateToProps` that takes a `state` argument and returns an object that puts `state.images` into a property called `images`. `mapStateToProps` is then passed as an argument to `connect`.

As the name suggests `mapStateToProps` is a function that takes the current state, and assigns it to properties of the component. If you `console.log(props)` in the constructor, you will see that we now have access to the images array that we set as the default state in our reducer!

```diff
const defaultState = {
-  images: []
+  images: [
+    "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
+    "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
+    "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
+    "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
+    "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
+  ],
+  selectedImage: "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg"
}

export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'TEST':
      console.log(state, action)
      return state;
    default:
      return state;
  }
}
```

If you update the `images` array in the `defaultState` you should see some images reappear in the gallery! Now we need to get image selection wired back up with an action that is dispatched when the user clicks a thumbnail.

### Updating the state

So how do we update the state with a new selected image?

We're going to configure the reducer to listen for an `IMAGE_SELECTED` action, and update the state with the action's payload.

```diff
const defaultState = {
  images: [
    "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
    "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
    "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
    "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
    "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
  ],
  selectedImage: "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg"
}

export default function images(state = defaultState, action) {
  switch(action.type) {
-    case 'TEST':
    case 'IMAGE_SELECTED':
-      return state;
+      return {...state, selectedImage: action.image};
    default:
      return state;
  }
}
```

Now the reducer is ready to receive the `IMAGE_SELECTED` action should it be dispatched! Inside of the case, we are returning a **new state object** by "spreading" the existing state and overwriting the `selectedImage` property. Checkout more on the `...state` object spread technique in [this video](https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread). It's excellent.

```diff
import React, {Component} from 'react'
import {connect} from 'react-redux';

export class Gallery extends Component {
-  constructor(props) {
-    super(props);
-    this.props.dispatch({type: 'TEST'});
-    console.log(props);
-  }
  render() {
-    const {images, selectedImage} = this.props;
+    const {images, selectedImage, dispatch} = this.props;

    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
-            <div key={index}>
+            <div key={index} onClick={() => dispatch({type:'IMAGE_SELECTED', image})}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage
  }
}

export default connect(mapStateToProps)(Gallery)
```

In the `Gallery`, we will use the `dispatch` function in the component props by calling it _inside of the body_ of the `onClick` handler function. For now we are just writing it inline for convenience, but once we make that change, we can now click a thumbnail, and it will update the selected image via the reducer!

Using dispatch can be convenient way to quickly create generic actions, but soon we will want to make reusable actions that are well named. To do this, we will make use of "action creators".

### Action Creators

Action creators are functions that return configured action objects. We will add our first action creator to an new file called `actions.js`.

### actions.js

```javascript
export const IMAGE_SELECTED = 'IMAGE_SELECTED';

export function selectImage(image) {
  return {
    type: IMAGE_SELECTED,
    image,
  };
}
```

This could now be imported directly into any file that needed to create a `selectImage` action! `selectImage` is a pure function that only returns data. It takes an image as an argument, and adds that to the action object it creates and returns.

> **note:** We are returning a plain JavaScript object, but the second property `image` might be weird if you haven't encountered this style before. Basically, in ES6, if you pass a property to an object like this it expands to `image: 'whatever value was held by image'` in the resulting object. Super handy.

```
import  * as GalleryActions from './actions.js';
[...]
onClick={() => dispatch(GalleryActions.selectImage(image))}
```

This isn't much nicer than just using `dispatch` though.

Luckily for us, this pattern is so common, Redux provides a much nicer way to do this with the `bindActionCreators` function.

```diff
import React, {Component} from 'react'
import {connect} from 'react-redux';
+ import {bindActionCreators} from 'redux';

+ import  * as GalleryActions from './actions.js';

export class Gallery extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch({type: 'TEST'});
    console.log(props);
  }
  handleThumbClick(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  render() {
-    const {images, selectedImage, dispatch} = this.props;
+    const {images, selectedImage, selectImage} = this.props;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
-            <div key={index} onClick={() => dispatch({type:'IMAGE_SELECTED', image})}>
+            <div key={index} onClick={() => selectImage(image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage
  }
}

+function mapActionCreatorsToProps(dispatch) {
+  return bindActionCreators(GalleryActions, dispatch);
+}

-export default connect(mapStateToProps)(Gallery)
+export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
```

We've added a `mapActionCreatorsToProps` function that takes the `dispatch` function as an argument. It returns the result of a call to `bindActionCreators` with our `GalleryActions` provided as an argument. Now if you log the props, you'll see that `Gallery` _no longer gets passed the `dispatch` function_, and instead has a function called `selectImage` that we can use directly!

To review, we've done several things:

- created a reducer that contains the initial (default) state of our application and listens for actions
- created a store that consumes the reducer and provides a dispatcher that we can use to dispatch actions
- connected our Gallery component to the store
- mapped the store's state to props that are passed to the Gallery
- mapped an action creator function so that the Gallery can simply call `selectImage(image)` and the application state will update.

How do we use these patterns and load data from the remote data source?

This is where it gets interesting! {% emoji wink %}

## Asyncronous activity?

You may hear the term "side effects" used when discussing a functional style of programming. Side effects are things that occur outside the boundaries of the application. Within our cozy bubble, side effects aren't really a problem, but when we reach out to a remote service the bubble is pierced. We lose some control, and we have to accept that fact.

In Redux, **reducers don't have side effects**. This means that **reducers don't handle async activity in our application**. We can't use them to load our remote data because **reducers are pure functions with no side effects**.

Redux is wonderful, and if you don’t have and side-effects like asynchronous activity you could stop right here. If you’re creating more than the most trivial example, it is likely that you are loading data from a service, and this is of course async.

> **note:** one of the coolest aspects of Redux is how tiny it is. It does so very little! It is intended to solve a very limited problem scope. Most applications will need to solve **lots** of problems! Luckily Redux provides the concept of "middleware", which are basically bits of code that sit in the midel of the action -> reducer -> store triangle and provide a mechanism for introducing side effects like async calls to remote servers

One approach is to use **[thunks](https://en.wikipedia.org/wiki/Thunk)** with the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware. Thunks work great, but can get confusing for sequences of actions and can be challenging to test effectively.

Consider our image gallery application. When the application loads, it needs to:

- request an array of images from the server
- display some notification that the images are loading
- select an initial image for display when the results have been received
- handle any errors that might occur

This is all before the user has clicked anything in the application!

So how do we do it?

This is where **redux-saga** can be of great service to our application!

## redux-saga

redux-saga is built to handle asynchronous actions in our Redux applications. It provides middleware and a handful of effects methods that make building complex sequences of asynchronous actions a breeze.

A saga is a **generator** function. Generators are an ES2015 addition to JavaScript. This might be your first encounter with generator functions, and if that’s the case, they might be a little weird. If that is the case, take a few minutes to read [ES6 Generators in Depth](https://www.2ality.com/2015/03/es6-generators.html) and watch this [short generators video](https://egghead.io/lessons/ecmascript-6-generators). Don’t fret to much if you’re still scratching your head. To use redux-saga you won’t need a PhD in JavaScript Async Programming. Promise.

Because of the way generators work, we are able to create flat sequences of commands describing complex workflows within our application. The entire image loading sequence described above could look like this:

```javascript
export function* loadImages() {
  try {
    const images = yield call(fetchImages);
    yield put({ type: 'IMAGES_LOADED', images });
    yield put({ type: 'IMAGE_SELECTED', image: images[0] });
  } catch (error) {
    yield put({ type: 'IMAGE_LOAD_FAILURE', error });
  }
}

export function* watchForLoadImages() {
  while (true) {
    yield take('LOAD_IMAGES');
    yield call(loadImages);
  }
}
```

### The first saga

We'll start with a simple example of a saga, and then we will configure redux-saga to connect it to our application. Create a file called `saga.js` in the source folder and add the following:

```javascript
export function* sayHello() {
  console.log('hello');
}
```

Our saga is simply a generator function. You can tell by the little `*` after `function*`. It's called the "super star" {% emoji star %}!

Now in `main.js` we will import our new function and execute it.

```diff
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

import { createStore } from 'redux'
import {Provider} from 'react-redux';
import reducer from './reducer'

+import {sayHello} from './sagas';
+sayHello();

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
```

No matter how long you stare at the console, your "hello" will never arrive {% emoji cry %}

This is because `sayHello` is a **generator**! Generators don't execute immediately. If you changed the line to `sayHello().next();` your greating will appear. Don't worry, we won't call `next` all the time. Like Redux, redux-saga is built to remove pain and bolierplate and make our development experience more pleasurable.

## Configure redux-saga

```diff
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

-import { createStore } from 'redux'
+import { createStore, applyMiddleware } from 'redux'
+import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux';
import reducer from './reducer'

import {sayHello} from './sagas';
-sayHello()

-const store = createStore(reducer);
+const store = createStore(
+  reducer,
+  applyMiddleware(createSagaMiddleware(sayHello))
+);

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
```

We've imported the `applyMiddleware` function from Redux, and the `createSagaMiddleware` from `redux-saga`. When we create the store, we need to supply Redux with the middleware that we want to use. In this case we call `applyMiddleware` and send it the result of `createSagaMiddleware(sayHello)`. Behind the scenes redux-saga loads in the `sayHello` function, and politely calls the initial `next` for us.

It should greet you in the console!

Now let's build a saga for loading images.

## Loading Images with a Saga

We'ill get rid of the `sayHello` saga and replace it with a `loadImages` saga in `sagas.js`.

```diff
-export function* sayHello() {
-  console.log('hello');
-}

+export function* loadImages() {
+  console.log('load some images please')
+}
```

We can't forget to update `main.js` as well:

```diff
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'

-import {sayHello} from './sagas';
+import {loadImages} from './sagas';

const store = createStore(
  reducer,
-  applyMiddleware(createSagaMiddleware(sayHello))
+  applyMiddleware(createSagaMiddleware(loadImages))
);

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
```

And now the saga is loading. Let's add our `fetchImages` method we used earlier inside of `sagas.js`:

```javascript
const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

const fetchImages = () => {
  return fetch(API_ENDPOINT).then(function(response) {
    return response.json().then(function(json) {
      return json.photos.photo.map(
        ({ farm, server, id, secret }) =>
          `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
      );
    });
  });
};

export function* loadImages() {
  const images = yield fetchImages();
  console.log(images);
}
```

The `fetchImages` method returns a promise. We are going to call `fetchImages`, but we are going to use the `yield` keyword. By dark arts and sorcery, generators _understand promises_, and as the console log will show, we've yielded an array of image urls. Looking at `loadImages`, it looks like typical syncronous code. The `yield` keyword is the secret sauce that lets us code in this syncronous style for asyncronous activity.

### Encapsulating our async API requests

Let's define the api we want to use in its own file. It is nothing special. In fact, it's the same code we used earlier to load Flickr images. We're going to create a file called `flickr.js` in the src folder:

```javascript
const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

export const fetchImages = () => {
  return fetch(API_ENDPOINT).then(function(response) {
    return response.json().then(function(json) {
      return json.photos.photo.map(
        ({ farm, server, id, secret }) =>
          `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
      );
    });
  });
};
```

This isn't strictly required, but it makes a lot of sense to me. We are at the very **boundaries of our application**, where things are a bit messy. By encapsulating the mechanics of the interaction with the remote API, our code will be cleaner and easier to update. It also makes it dead simple to _completely swap out_ the image service provider! Nice.

Our `saga.js` should now look like this:

```javascript
import { fetchImages } from './flickr';

export function* loadImages() {
  const images = yield fetchImages();
  console.log(images);
}
```

We still need to get data out of our saga and into the application state. To handle this, we will utilize "effects" provided by redux-saga.

### Update the application from a saga

We could probably call our saga with the `dispatch` function or store as an argument, but that approach would be unpleasant and perhaps a tad confusing over time. Instead, we'll rely on a method provided by redux-saga called `put`.

First we will update `reducer.js` to handle a new action type `IMAGES_LOADED`

```diff
const defaultState = {
+  images: []
}

export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'IMAGE_SELECTED':
      return {...state, selectedImage: action.image};
+    case 'IMAGES_LOADED':
+      return {...state, images: action.images};
    default:
      return state;
  }
}
```

We added the case, and also deleted the hard coded URLs from the `defaultState`. The `IMAGES_LOADED` case now returns an updated state that includes images delivered by the action.

Next we will update the saga:

```diff
import {fetchImages} from './flickr';
+import {put} from 'redux-saga/effects';

export function* loadImages() {
  const images = yield fetchImages();
+  yield put({type: 'IMAGES_LOADED', images})
}
```

After importing `put`, we add another line to `loadImages`. It `yield`s the result of the call the `put` which sends along an action object. Behind the scenes redux-saga dispatches that for us, and the reducer receives the message!

What if we don't want to loadImages implicitly like this, simply because we have wired up a saga? How do we trigger a saga with a specific type of action?

### Triggering saga workflows with actions

Sagas become much more useful if we have the ability to trigger their workflows with Redux actions. When we do this, we can leverage the power of sagas from any component in our app. First we will create a new saga called `watchForLoadImages`.

```diff
import {fetchImages} from './flickr';
-import {put} from 'redux-saga/effects';
+import {put, take} from 'redux-saga/effects';

export function* loadImages() {
  const images = yield fetchImages();
  yield put({type: 'IMAGES_LOADED', images})
}

+export function* watchForLoadImages() {
+  while(true) {
+    yield take('LOAD_IMAGES');
+    yield loadImages();
+  }
+}
```

This new saga uses a `while` loop so that it is always active and ready. Inside of the loop we are yielding a call to a new method from redux-saga called `take`. Take listens for actions of a given type, and when they occur, it advances the saga to the next yield. In this case, we are yielding a call to `loadImages`, which initiates the loading of images.

```diff
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'

-import {loadImages} from './sagas';
+import {loadImages} from './watchForLoadImages';

const store = createStore(
  reducer,
-  applyMiddleware(createSagaMiddleware(loadImages))
+  applyMiddleware(createSagaMiddleware(watchForLoadImages))
);

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
```

After updating `main.js`, the application is no longer loading images. We can add a `loadImages` action to our action creators.

```diff
export const IMAGE_SELECTED = 'IMAGE_SELECTED';
+const LOAD_IMAGES = 'LOAD_IMAGES';

export function selectImage(image) {
  return {
    type: IMAGE_SELECTED,
    image
  }
}

+export function loadImages() {
+  return {
+    type: LOAD_IMAGES
+  }
+}
```

Since we have already bound the action creators, all we need to do is call the action from the `Gallery` component.

```diff
export class Gallery extends Component {
+  componentDidMount() {
+    this.props.loadImages();
+  }
  render() {
```

### Blocking and non-blocking effects

This works fine for our application, but there is a broader issue that we should be concerned with. The `watchForLoadImages` sage contains **blocking** effects. What does that mean? Well, it means that we can only execute a single `LOAD_IMAGES` workflow at a time! It isn't obvious with a simple example like this, because we actually only load images once, but it is definitely a consideration. In fact, the general practice when listening for action evens is to use the `fork` effect instead of `yield loadImages()`.

```diff
export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
-    yield loadImages();
+    yield fork(loadImages); //be sure to import it!
  }
}
```

Using the `fork` helper will convert our `watchForLoadImages` into a non-blocking saga that can be executed regardless of whether or not a previous call is in progress. redux-saga [provides two helpers](https://yelouafi.github.io/redux-saga/docs/basics/UsingSagaHelpers.html), `takeEvery` and `takeLatest` that assist in these situations.

### Selecting the default image

Sagas are sequences of actions, so we can add more aspects to a saga easily.

```diff
import {fetchImages} from './flickr';
import {put, take, fork} from 'redux-saga/effects';

export function* loadImages() {
  const images = yield fetchImages();
  yield put({type: 'IMAGES_LOADED', images})
+  yield put({type: 'IMAGE_SELECTED', image: images[0]})
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield fork(loadImages);
  }
}
```

As part of the `loadImages` workflow, we can yield another call to `put` with the `IMAGE_SELECTED` action type and send along the image we want to select when images are loaded.

### Handling errors

If something goes wrong inside of the saga, we might want to notify the application so that it can respond accordingly. Do do this, we simply wrap the workflow in a try/catch block, and yield a `put` with a nitification that has the error as the payload.

```
import {fetchImages} from './flickr';
import {put, take, fork} from 'redux-saga/effects';

export function* loadImages() {
+  try {
    const images = yield fetchImages();
    yield put({type: 'IMAGES_LOADED', images})
    yield put({type: 'IMAGE_SELECTED', image: images[0]})
+  } catch(error) {
+    yield put({type: 'IMAGE_LOAD_FAILURE', error})
+  }
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield fork(loadImages);
  }
}
```

## Testing Sagas

Using Redux makes testing most of our app a breeze. Check out [this egghead course](https://egghead.io/series/react-testing-cookbook) for lots of techniques for testing React in general.

One of the awesome aspects of redux-saga is how easy it makes testing these bits of asynchronous code. Testing async javascript can be a real chore. With sagas, we don't need to jump through hoops to test this core functionality of our application. Sagas take the pain out of aync tests! Which means we will write more tests. Right?

We're going to use [tape](https://github.com/substack/tape). Let's set up a few tests for our saga.

```
import test from 'tape';
import {put, take} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const generator = watchForLoadImages();

  assert.end();
});
```

We'll go ahead and import everything we need for now, and add a single test. The test function takes a name and a function as arguments. Inside of the function, we create an instance of the sage generator. Armed with that instance, we can start advancing the saga to test each step.

```diff
import test from 'tape';
import {put, take} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const generator = watchForLoadImages();

+  assert.deepEqual(
+    generator.next().value,
+    false,
+    'watchForLoadImages should be waiting for LOAD_IMAGES action'
+  );

  assert.end();
});
```

The `assert.deepEqual` method takes two values and checks to see if they are equal (deeply!). The first is a call `generator.next().value` which advances the generator and gets the value. The next value is simple `false`. We want to see it fail! The final argument is a description of the expected behavior.

Run `npm test` in the project folder to see the result.

```
✖ watchLoadImages should be waiting for LOAD_IMAGES action
-----------------------------------------------------------
  operator: deepEqual
  expected: |-
    false
  actual: |-
    { TAKE: 'LOAD_IMAGES' }
```

The test fails as expected and the results are interesting. The actual result is `{ TAKE: 'LOAD_IMAGES' }`, which is the output we receive when we call `take('LOAD_IMAGES');`. In fact, our saga could yield an object instead of calling `take`, but `take` gives us a little sugar and eliminates annoying keystrokes.

```diff
import test from 'tape';
import {put, take} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const generator = watchForLoadImages();

  assert.deepEqual(
    generator.next().value,
-    false
+    take('LOAD_IMAGES'),
    'watchForLoadImages should be waiting for LOAD_IMAGES action'
  );

  assert.end();
});
```

We can simply call `take` in our test and get the result we need!

```diff
import test from 'tape';
import {put, take} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const generator = watchForLoadImages();

  assert.deepEqual(
    generator.next().value,
    take('LOAD_IMAGES'),
    'watchForLoadImages should be waiting for LOAD_IMAGES action'
  );

+  assert.deepEqual(
+    gen.next().value,
+    false,
+    'watchForLoadImages should call loadImages after LOAD_IMAGES action is received'
+  );

  assert.end();
});
```

Our next test makes sure that the `loadImages` saga is called as the next step in the workflow. We'll add a false value here to see the result.

For a brief moment, let's update our saga code to yield the `loadImages` saga:

```diff
export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
+    yield loadImages();
-    yield fork(loadImages); //be sure to import it!
  }
}
```

Now when you run the tests, you will see.

```
✖ watchForLoadImages should call loadImages after LOAD_IMAGES action is received
---------------------------------------------------------------------------------
  operator: deepEqual
  expected: |-
    false
  actual: |-
    { _invoke: [Function: invoke] }
```

Hmm, `{ _invoke: [Function: invoke] }` is _definitely_ not as obvious as the simple object that we got when yeilding `take`.

This is a problem. Luckily it's one that redux-saga has solved in a nice way with effects like `fork`. `take`, `fork`, and other effect methods return and easily testable simple object. The object is a _set of instructions_ for redux-saga to execute. This is beautiful for testing because we don't have to worry about the actual side effects (like remote service calls). All we care about are the commands we are requesting to be executed.

Let's update the saga to use `fork` again:

```diff
export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
-    yield loadImages();
+    yield fork(loadImages);
  }
}
```

We will go back to `yield fork(loadImages)` instead of yielding `loadImages` directly. Note that we aren't executing `loadImages`. Instead we are \*passing the function `loadImages` as an argument to `fork`

Run `npm test` again:

```
✖ watchForLoadImages should call loadImages after LOAD_IMAGES action is received
---------------------------------------------------------------------------------
  operator: deepEqual
  expected: |-
    false
  actual: |-
    { FORK: { args: [], context: null, fn: [Function: loadImages] } }
```

Instead of a function invocation, we get a plain object. That object has the `loadImages` function embedded in it. The application loads exactly the same in the browser, but now we can easily test this step in the saga workflow.

```diff
import test from 'tape';
import {put, take} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const generator = watchForLoadImages();

  assert.deepEqual(
    generator.next().value,
    take('LOAD_IMAGES'),
    'watchForLoadImages should be waiting for LOAD_IMAGES action'
  );

  assert.deepEqual(
    generator.next().value,
-    false,
+    yield fork(loadImages),
    'watchForLoadImages should call loadImages after LOAD_IMAGES action is received'
  );

  assert.end();
});
```

Testing the `loadImages` saga is similar. We need to update `yield fetchImages` to `yield fork(fetchImages)`.

```javascript
test('loadImages', assert => {
  const gen = loadImages();

  assert.deepEqual(
    gen.next().value,
    call(fetchImages),
    'loadImages should call the fetchImages api',
  );

  const images = [0];

  assert.deepEqual(
    gen.next(images).value,
    put({ type: 'IMAGES_LOADED', images }),
    'loadImages should dispatch an IMAGES_LOADED action with the images',
  );

  assert.deepEqual(
    gen.next(images).value,
    put({ type: 'IMAGE_SELECTED', image: images[0] }),
    'loadImages should dispatch an IMAGE_SELECTED action with the first image',
  );

  const error = 'error';

  assert.deepEqual(
    gen.throw(error).value,
    put({ type: 'IMAGE_LOAD_FAILURE', error }),
    'loadImages should dispatch an IMAGE_LOAD_FAILURE if an error is thrown',
  );

  assert.end();
});
```

Take note of the last `assert`. It's testing the `catch` by using `throw` instead of `next` on the generator. Another cool feature is the ability to send values in. Notice that we've created an `images` constant, and we pass that into `next`. The saga _uses the value we pass in_ for the next step in the sequence.

It's awesome, and this level of control is a dream when it comes to testing async activity!

## What's next?

You can [check out the full code for this example on github](https://github.com/joelhooks/egghead-react-redux-image-gallery). I'm considering making a course on egghead to cover this. Would you be interested? [Let me know on twitter](https://twitter.com/jhooks)!

If you wanted to expand the example a bit, you might:

- make it a slide show where the image advances to the next image on a timer
- allow the user to search Flickr with keywords
- drop in another API that delivers images
- allow the user to select what APIs to search

We've only touched the surface of generators, but even at this level, hopefully you can see how useful they can be when coupled with the redux-saga library, Redux, and React.

![](https://s3.amazonaws.com/f.cl.ly/items/2s2q3B3x0Q04131p3V0C/jhooks_2016-Mar-20.jpg?v=db21427c)
