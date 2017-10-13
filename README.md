
## ng-curve

Curve edit control.

Directive that is created for AngularJS 1.

![asdf](https://i.imgur.com/77fgia2.png)

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

# Usage

Include `ngCurve` in your app's dependencies:

```javascript
angular.module('app', ['ngCurve'])
```

And the directive to your page like this : 

```html
<curve-editor dot-data="input.dots"></curve-editor>
```

# Todo
* options for spline mode
* options for changing design 
* options for grid color setting
* options for maintain aspect ratio of grid or not
