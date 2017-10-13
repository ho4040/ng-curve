angular.module('ngCurve', []).directive('curveEditor', function($timeout){
	return {
		restrict:"E",
		scope:{
			dotData:"@"
		},
		template:"<div><canvas id='grid'></canvas><canvas id='dots'></canvas></div>",
		link:function(scope, element, attrs){
			
			element.addClass('curve-control');
			
			var addDot = function(rx,ry){
				
				var newDot = {x:rx / scope.size.width, y:ry / scope.size.height};
				
				scope.dots.push(newDot);
				scope.dots.sort(function(a,b){
					return a.x-b.x;
				});
				
				return newDot;
				
			}
			
			var findDot = function(x,y){
				return scope.dots.find(function(dot){
					var rx = dot.x * scope.size.width;
					var ry = dot.y * scope.size.height;
					return (Math.abs(rx-x) < 5 &&Math.abs(ry-y) < 5);
				})
			}
			
			var getValidDots = function() {
				var dots = [];
				for(var i=0;i < scope.dots.length;i++)
				{	
					if(scope.state.selectedDot == scope.dots[i])
					{
						//console.log(i);
						if(i === 0)
						{
							if(scope.dots[i+1].x <= scope.dots[i].x)
								continue;
						}
						else if(i == scope.dots.length-1)
						{
							if(scope.dots[i-1].x >= scope.dots[i].x)
								continue;
						}
						else {
							if(scope.dots[i-1].x >= scope.dots[i].x || scope.dots[i+1].x <= scope.dots[i].x)
								continue;
						}
					}
					dots.push(scope.dots[i]);
				}
				
				return dots;
			}
			
			scope.redrawGrid= function(){
				
				var canvas = scope.gridCanvas;
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				
				for(var i =0;i<canvas.width;i+=10){
					ctx.moveTo(i, 0);
					ctx.lineTo(i, scope.size.height);
				}
				for(var j =0;j<canvas.height;j+=10){
					ctx.moveTo(0, j);
					ctx.lineTo(scope.size.width, j);
				}
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 0.5;
				ctx.stroke();
				
			}
			
			
			scope.drawDots = function(){
				
				var canvas = scope.curveCanvas;
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				var dots = getValidDots();
				ctx.lineWidth = 1;

				dots.forEach(dot=>{
					ctx.beginPath();
					if(dot === scope.state.selectedDot)
						ctx.strokeStyle = '#ff0000';
					else
						ctx.strokeStyle = '#000000';
					ctx.arc(dot.x*canvas.width, dot.y*canvas.height, 2, 0, 2*Math.PI);
					ctx.stroke();
				});
				
				ctx.beginPath();
				ctx.strokeStyle = '#000000';
				
				if(dots[0].x > 0)
				{
					ctx.moveTo(0, dots[0].y*canvas.height);
					ctx.lineTo(dots[0].x*canvas.width, dots[0].y*canvas.height);
				}
				
				for(var i=0;i<dots.length-1;i++){
					var dot1 = dots[i];
					var dot2 = dots[i+1];
					ctx.moveTo(dot1.x*canvas.width, dot1.y*canvas.height);
					ctx.lineTo(dot2.x*canvas.width, dot2.y*canvas.height);
				}
				
				if(dots[dots.length-1].x < 1)
				{
					ctx.moveTo(dots[dots.length-1].x*canvas.width, dots[dots.length-1].y*canvas.height);
					ctx.lineTo(scope.size.width, dots[dots.length-1].y*canvas.height);
				}
				
				ctx.stroke();
				
			}
			
			element.ready(function(){
				
				scope.size = {};
				scope.state = {mode:null};
				
				 $timeout(function () {
					 
					scope.gridCanvas = element.find('canvas')[0];
					scope.curveCanvas = element.find('canvas')[1];
					
					scope.size.height = element.find('canvas')[0].offsetHeight;
					scope.size.width = element.find('canvas')[0].offsetWidth;
					
					scope.gridCanvas.width = scope.size.width;
					scope.gridCanvas.height= scope.size.height;
					scope.curveCanvas.width = scope.size.width;
					scope.curveCanvas.height= scope.size.height;
					
					element.on('mousedown', function(event){
						
						var dot = findDot(event.offsetX, event.offsetY);
						
						if(!dot)
							scope.state.selectedDot = addDot(event.offsetX, event.offsetY);
						else
							scope.state.selectedDot = dot;
						
						scope.drawDots();
						
					});
					
					element.on('mousemove', function(event){
						if(!!scope.state.selectedDot){
							scope.state.selectedDot.x = event.offsetX / scope.size.width;
							scope.state.selectedDot.y = event.offsetY / scope.size.height;	
							scope.drawDots();
						}
					});
					
					
					element.on('mouseup', function(event){
						
						if(!!event.ctrlKey){
							scope.dots = getValidDots();
							scope.dots.splice(scope.dots.indexOf(scope.state.selectedDot), 1);
						}else{
							scope.dots = getValidDots();
						}
						
						scope.state.selectedDot = null;
						scope.drawDots();	
						scope.$apply();
						
					});
					
					element.onResize = function(evt){
						scope.redrawGrid();
						scope.drawDots();
					}
					
					element.onResize();
					
				 });
				
			});
			
		},
		controller:function($scope, $parse) {
		  
		  var getter = $parse($scope.dotData);
		  console.log(getter);
		  var setter = getter.assign;
		  
			$scope.$watch('dots', function(v){
			  if(typeof setter == 'function')
			    setter($scope.$parent, v);
			});
			
			$scope.dots = getter($scope.$parent);
			if(!$scope.dots){
				$scope.dots = [ {x:0, y:1}, {x:1, y:0} ];
			}
			
		}
	}
});