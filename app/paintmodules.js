//export var ExportPaint={
var CreateUI=function(overallParent){
	this.overallParent=overallParent;
	};
	/* ui class inherets from paint, only createcanvas is forced use the overall Parent everything else you have the option to use something else
	a lot of ui methods will be pulling from the utilEV classes, feel free to read them.
	*/


	CreateUI.prototype={
		//will not read in my createElms output, fix
		setCss:function(el,styles){
			for(var prop in styles){
				if(!styles.hasOwnProperty(prop)){
					continue;
					}
					utilEV.createCss(el, prop, styles[prop]);
				}
			},
		createCanvas:function(width, height){
			if(typeof width!=="number" || typeof height !== "number"){
				throw new Error("arguments should be numbers");
				}
			var canvas= utilEV.createElms('canvas',{width:width, height:height});
			this.overallParent.appendChild(canvas);
			return canvas.getContext("2d");
			},

	createButton:function(parent, attr, value, txt){
		txt=txt|| "button";
		if(typeof txt !== 'string'){
			throw new Error("last argument should be a string");
			}
			var button=utilEV.createElms('button', {[attr]:value},txt);
			parent.appendChild(button);
		},

		createSelect:function(parent,options){
			var select=utilEV.createElms("select");
			var args;
			if(arguments.length===1){
				throw new Error("options cannot be null");

				}else if(arguments.length===2){
					options=arguments[1];
					}else{
					args=Array.apply(null, arguments);
					options=args.slice(1, args.length);
					}

					for(var opts in options){

							var opt=utilEV.createElms('option', null,options[opts]);
							select.appendChild(opt);
						}

						parent.appendChild(select);
			},

			createCheckbox:function(parent, attr, value, txt){
				txt:txt || "check Box";
				if(typeof txt !== 'string'){
					throw new Error("last argument should be a string");
			}

			var checkBox=utilEV.createElms('input',{type:'checkbox', [attr]:value}, txt);
			parent.appendChild(checkBox);
				}
		};


		/*
		the point finder is only to get the current point where the mouse is at during an event
		it does not inheret from anything.
		*/

		var PointFinder=function(element,event){
			 this.squareElement=element.getBoundingClientRect();
			 this.event=event;
		};
		PointFinder.prototype={
			_point:null,
			 _y:null,
			_x:null,
			_getCurrentY:function(e){
				this._y=Math.floor(e.clientY-this.squareElement.top);
				return this._y;
				},

			_getCurrentX:function(e){
				this._x=Math.floor(e.clientX-this.squareElement.left)
				return this._x;
				},

//public methods
					setPoint:function(x,y){
						x=x||this._getCurrentX(this.event);
						y=y||this._getCurrentY(this.event);
						point={
							x:x,
							y:y
							};
						},
					getPoint:function(){
						return point;
						}

					};



			//drawing object!!!! all things drawing on a canvas

			var Draw=function(canvasElement){
				this.canvasElement=canvasElement;

				};//constructor

				Draw.prototype={

					_trackDrag:function(onMove, onEnd){
						function end(event){
						        removeEventListener("mousemove", onMove);
						        removeEventListener("mouseup", end);

						        if(onEnd){
						            onEnd(event);
						        }
						    }
						    addEventListener("mousemove", onMove);
						    addEventListener("mouseup", end);
						},
						_randomPointInRadius:function (radius){
						    for(;;){
						        var x=Math.random()*2-1;
						        var y=Math.random()*2-1;

						        if(x*x+y*y<=1){
						            return {x:x*radius, y:y*radius};
						        }
							}
						    },

							drawErase:function(event, draw){
								 draw.globalCompositionOperation='destination-out';
								    Draw.drawLine(event, draw, function(){
										draw.globalCompositionOperation='source-over';
								});
								},

							drawSpray:function(event, draw){
								var radius=cx.lineWidth/2;
								    var area=radius*radius*Math.PI;
								    var dotsPerTick=Math.cell(area/30);

								    var currentPos=new Pointfinder(Draw.canvasElement, event);
								    currentPos.setPoint();
								    var coord=currentPos.getPoint();
								    var spray=setInterval(function(){
								        for(var i=0; i<dotsPerTick; i++){
								            var offset=Draw._randomPointInRadius(radius);
								            draw.fillRect(coord.x+offset.x, coord.y+offset.y, 1, 1);
								        }
								    },25);
								    _trackDrag(function(event){
								        currentPos2=new PointFinder(Draw.canvasElement, event);
								        currentPos2.setPoint();
								        var coord2=currentPos2.getPoint();
								        }, function(){clearInterval(spray);});

								},
								rgbToHex:function(R,G,B) {return utilEV.toHex(R)+utilEV.toHex(G)+utilEV.toHex(B)}


					};

var ToolFunctions=function(){};
ToolFunctions.prototype={

loadImageURL:function (draw, url){
    var image=document.createElement('img');
    image.addEventListener('load', function(){
        var color=draw.fillStyle, size=draw.lineWidth;
        draw.canvas.width=image.width;
       draw.canvas.height=image.height;
        draw.drawImage(image, 0, 0);
        draw.fillStyle=color;
        draw.strokeStyle=color;
        draw.lineWidth=size;
    });
    image.src=url;
},

openFile:function(draw, inputEl){

    inputEl.addEventListener('change', function(){
        if(inputEl.files.length===0)return;

        var reader=new FileReader();
        reader.addEventListener('load', function(){
            this.loadImageURL(draw, reader.result);
        });
        reader.readAsDataURL(inputEl.files[0]);
    });
    },

openURL:function(draw, inputEL, form){
        form.addEventListener('submit', function(event){
        event.preventDefault();
        loadImageURL(draw, inputEL.value);
    });
    return form;
},
save:function(draw, linkEl){

        function update(){

        try{
            linkEl.href=draw.canvas.toDataURL();
        }catch(e){
            if(e instanceof SecurityError){
                linkEl.href="javascript:alert("+JSON.stringify("can't save:"+e.toString())+")";
            }else{
                throw e;
            }
        }
    }

    linkEl.addEventListener("mouseover", update);
    linkEl.addEventListener('focus', update);
    return linkEl;

	},

	//select should already be created.
	brushSize:function(draw,select){

	    select.addEventListener('change', function(){
	        draw.lineWidth=select.value;
	    });


},
color:function(draw, input){

    input.addEventListener('input', function(){
        draw.fillStyle=input.value;
        draw.strokeStyle=input.value;
    });


}
};

//};