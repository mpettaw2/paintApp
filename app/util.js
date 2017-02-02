/*this is from pro javascript*/
var Interface=function(name, methods){
		if(arguments.length !=2){
			throw new Error("interface constructor called with"+arguments.length+"arguments, but expected exactly 2.");
			}
			this.name=name;
			this.methods=[];
			for(var i=0; i< methods.length;i++){
				if (typeof methods[i]!=="string"){
					throw new Error("Interface constructor expects method names to be 'string'");
					}
					this.methods.push(methods[i]);
				}

		};

		Interface.ensureImplements=function(object){
			if(arguments.length<2){
				throw new Error("function interface.ensureimplements called with"+arguments.length+"arguments, but expect at least 2");
				}
				for(var i=1; i<arguments.length;i++){
					var interface=arguments[i];
					if(interface.constructor!==Interface){
						throw new Error("function Interface.ensureimplements expects interface to equal Interface");
						}

						for(var j=0; j<interface.methods.length;j++){
							var method=interface.methods[j];
							if(!object[method] || typeof object[method]!== 'function'){
								throw new Error("function interface.ensureimplements:object does not implement the"+interface.name+"interface. method"+method+"was not found");
								}
							}
					}

			};



var utilEV={
	extend:function(subClass, superClass){
		var  F=function(){};
		F.prototype=superClass.prototype;
		subClass.prototype=new F();
		subClass.prototype.constructor=subClass;
		},

	clone:function(object){
		function F(){};
		F.prototype=object;
		return new F;
		},

		createCss:function(els, props, val){
				for(var i=0;i<els.length-1; i++){
					document.getElementById(els[i]).style[props]=val;
					}
		},

		/*End of pro javascript code*/

	createElms:function(name, attri){

    var node=document.createElement(name);
    if(attri){
        for (var attr in attri){
            if(attri.hasOwnProperty(attr)){
                node.setAttribute(attr, attri[attr]);
            }

        }
    }

    for(var i=2; i<arguments.length;i++){
        var child=arguments[i];
        if(typeof child === 'string' ){
            child=document.createTextNode(child);
        }
			node.appendChild(child);
			    }
    return node;
},

addEvent:function(element, typeEvent, callback, bool){
	typeEvent=typeEvent || 'click';
	bool=bool || false;
	if(typeof typeEvent !== 'string'){
		throw new Error("typeEvent will have to be a string");
		}

		if(typeof callback !== 'function'){
			throw new Error("callback is required for addEvent");
			}
	return element.addEventListener(typeEvent, callback, bool);
	},
removeEvent:function(element, typeEvent, callback, bool){
	typeEvent=typeEvent || 'click';
	bool=bool || false;
	if(typeof typeEvent !== 'string'){
	throw new Error ('typeEvent will have to be a string');
	}
	if (typeof callback !== 'function'){
	throw new Error ('callback is required for removeEvent');
	}
	return element.removeEventListener(typeEvent, callback, bool);
},
	
//does not accept an array but accepts multiple arguments. 
appendMultiple:function(parent, options){
	var args;
	if(arguments.length===1){
		options=arguments[0];
		}else{
			args=Array.apply(null, arguments);
	        options=args.slice(1, args.length);

			}


	for(var i=0; i<options.length;i++){
		(function(opt){
			parent.appendChild(opt);
			}(options[i]));

		}
		return this; //make chainable
	},
	
	//will accept multiple args
	//these should be elements to show and hide on the DOM
	hide:function(elem){
		elem=Array.apply(null, arguments);
		for(el in elem){
		elem[el].style.display='none';
	}
	return this; //make chainable
		},
	show:function(elems){
		elems=Array.apply(null,arguments);
		for(emt in elems){
		elems[emt].style.display='';
	}
	return this;//make chainable
		},

		toHex:function(n) {
		  n = parseInt(n,10);
		  if (isNaN(n)) return "00";
		  n = Math.max(0,Math.min(n,255));return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
	},
	checkBrowser:function(){
if(!Boolean(navigator.vendor)){
	var noIE=document.getElementById('noIE');
	var noWork=document.createElement('p');
	noWork.setAttribute('style', 'text-align:center');
	var noWorkTxt=document.createTextNode('Currently this application is not support for your browser');
	noWork.appendChild(noWorkTxt);
	noIE.appendChild(noWork);
	
}
}


	};
