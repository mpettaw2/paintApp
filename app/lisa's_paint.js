
var body=document.getElementById("paintapp");
var tes=document.getElementById("test");
var drawable=tes.getContext('2d');

//functions

//draws a line from the point you click on the canvas to when you end on the canvas.
var button= document.getElementById("line");
var prevMouse={x:0,y:0};
var mouse={x:0,y:0};


function drawLine(ev){
prevMouse.x=mouse.x;
prevMouse.y=mouse.y;

mouse.x=ev.pageX-this.offsetLeft*0.1;
mouse.y=ev.pageY-this.offsetTop*0.1;

	drawable.lineCap="round";
	drawable.linewidth=20;
	drawable.beginPath();
	drawable.moveTo(prevMouse.x, prevMouse.y);
	drawable.lineTo(mouse.x, mouse.y);
	drawable.closePath();
	drawable.stroke();


}
//separated the inner event listener so i could remove it on mouse up
function moveLine(){

		tes.addEventListener('mousemove',drawLine);

	}

button.onclick=function(){
tes.removeEventListener('click',stampCircle);
tes.removeEventListener('click', stampTriangle);
tes.removeEventListener('click', stampRectangle);
tes.removeEventListener('click', drawText);
tes.addEventListener('mousedown',moveLine,false);
tes.addEventListener('mouseup',function(e){
	tes.removeEventListener('mousemove', drawLine);
	tes.removeEventListener('mousedown', moveLine);

	},false);
};


//change color
//color picker is working!!!
var color2=new ToolFunctions();
var color_picker=document.getElementById('color_picker');
color2.color(drawable,color_picker);


// get the url of the loaded file
//draw it to the canvas
//!!!!!!!!!!!!!!!!!!!!!!!!!try ajax request. save files from load send save to canvas!!!!!!!!!!!!!

/*var loadish=document.getElementById('loadImg');
var loadPut=loadish.files[0];

function loadImg(){
	console.log("Entering loadImg");
		var read=new FileReader();
		read.readAsDataURL(loadPut);//not blob??
		var img=new Image();
		img.src=read.result;
		drawable.canvas.width=img.width;
		drawable.canvas.height=img.height;
		drawable.drawImage(img,165,85);

}

loadish.addEventListener('load', loadImg);*/

/*stamps are working and clearing the canvas is working!!!!!!!*/

		//stamp rectangle
		function stampRectangle(ev){
					var point=new PointFinder(tes, ev);
					point.setPoint();
					var coord=point.getPoint();
					drawable.fillRect(coord.x, coord.y, 100,100);
			}

			//stampcircle
			function stampCircle(ev){
				var point=new PointFinder(tes,ev);
				point.setPoint();
				var coord2=point.getPoint();
				drawable.beginPath();
				drawable.arc(coord2.x, coord2.y, 50,0,Math.PI,true);
				drawable.arc(coord2.x,coord2.y,50,0,Math.PI,false);
				drawable.fill();
	}

	//stamp triangle
	function stampTriangle(ev){
			var point=new PointFinder(tes, ev);
			point.setPoint();
			var coord3=point.getPoint();
			drawable.beginPath();
			drawable.moveTo(coord3.x,coord3.y);
			drawable.lineTo(coord3.x,(coord3.x*0.51));
			drawable.lineTo((coord3.x*0.51),coord3.x);
			drawable.closePath();
			drawable.fill();

		}



//if stamprect is click use this function when clicking canvas
var rectangle=document.getElementById('stamp_rect');
rectangle.onclick=function(){

			tes.removeEventListener('click',stampCircle);
			tes.removeEventListener('click', stampTriangle);
			tes.removeEventListener('click', drawText);
			tes.addEventListener('click', stampRectangle);
		};


//if stampcircle is clicked use this function when clicking canvas
var circle=document.getElementById('stamp_circle');
circle.onclick=function(){
	tes.removeEventListener('click', drawText);
	tes.removeEventListener('click',stampTriangle);
tes.removeEventListener('click',stampRectangle);
	tes.addEventListener('click', stampCircle);
};


	// if stamptriangle is clicked use this function when clicking canvas
	var triangle=document.getElementById('stamp_triangle');
	triangle.onclick=function(){
tes.removeEventListener('click', drawText);
tes.removeEventListener('click',stampCircle);
tes.removeEventListener('click',stampRectangle);
tes.addEventListener('click', stampTriangle);
};

//clears the canvas
function clearboard(){
	drawable.clearRect(0,0,tes.width, tes.height);
	}

	var clear=document.getElementById('clear');
	clear.addEventListener('click', clearboard);




// add text to the canvas from the txt input
var txtInput=document.getElementById('txt');
var txtBtn=document.getElementById('enter');
var warn=document.getElementById('warn');


function drawText(ev, txt){
txt=txtInput.value;
drawable.font='50px arial';
drawable.fillStyle='rgba(0,0,0,1)';
var point3= new PointFinder(tes,ev);
point3.setPoint();
var coords3=point3.getPoint();
drawable.fillText(txt,coords3.x, coords3.y);

	}

	txtBtn.onclick=function(){
		tes.removeEventListener('click',stampCircle);
		tes.removeEventListener('click', stampTriangle);
		tes.removeEventListener('click', stampRectangle);
		tes.addEventListener('click', drawText);
		};

		//shows and hides instructions on how to use the 'stamp text' feature
		var para=document.createElement('p');
			para.setAttribute('id', 'txtWarn');
			var txt=document.createTextNode('After you click "enter", click the white pane');
			para.appendChild(txt);
			warn.appendChild(para);
			utilEV.hide(warn);

utilEV.addEvent(txtInput,'focus',function(){

	utilEV.show(warn);

	});
	utilEV.addEvent(txtInput,'blur', function(){
		utilEV.hide(warn);

		});