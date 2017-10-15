
# ng-curve

Curve edit control. Directive that is created for AngularJS 1.

check Demo [here](https://ho4040.github.io/ng-curve/demo/index.html).

![ss](https://i.imgur.com/xS2Qgx0.png)


### Control Commands
* `click` : add point
*  `drag` : move point
*  `ctrl + click` or `drag-out` : remove point


# Installation

```bash
bower install ng-curve --save
```

Then include the CSS file and javascript file

```html
<link rel="stylesheet" href="bower_components/ng-curve/dist/ng-curve.css" />
<script src="bower_components/ng-curve/dist/ng-curve.min.js"></script>
```

# Dependency

* [cardinal-spline-js](https://github.com/epistemex/cardinal-spline-js)


# Usage

Include `ngCurve` in your app's dependencies:

```javascript
angular.module('app', ['ngCurve'])
```

And the directive to your page like this : 

```html
<curve-editor dot-data="input.dots"></curve-editor>
```

Change editor size with `curve-control` class

```html
<style>
  .curve-control
  {
    width:320px;
    height:240px;
  }
</style>
```

# Todo
* options for spline mode
* options for changing design 
* options for grid color setting
* options for maintain aspect ratio of grid or not
