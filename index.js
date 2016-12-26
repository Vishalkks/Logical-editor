var context;
function drawCanvas()
{
	var canvas = document.createElement("CANVAS");
	canvas.id = "canvas";
	canvas.style.width = "100%";
	canvas.style.height = "80%";
	canvas.addEventListener('click', function(evt)
	{
		var mousePos = getMousePos(canvas, evt);
		connectTwo(mousePos.x,mousePos.y);
	
	}, false);

	document.body.appendChild(canvas);
	addImages();
}

function addImages()
{
  pics = ["5.jpg","6.jpg","4.jpg"];
  posX = 75;
  posY = 75;
  
  context = document.getElementById("canvas").getContext("2d");
  for(i=0; i<pics.length; ++i)
  {
  	img = new Image();
  	img.onclick = function(){window.alert(this.name)}
  	img.src = pics[i];
  	img.name = pics[i];
  	img.onload = function(){
  	context.drawImage(this,posX + 45*pics.indexOf(this.name),posY,25,25);
  	};
  }
}



function objectsInBetween(x1,y1,x2,y2)
{
	if(x2>x1)
	{
		var obj = Math.abs(parseInt((x2-x1)/45)- 1);
	}
	else
	{
		var obj = Math.abs(parseInt((x1-x2+25)/45) - 1);
	}
	return obj;
}

function connectTwo(x,y)
{
	var activex = 165; //Assuming the API gets the x and y of the active scene.
	var activey = 75;

	var currx = activex;
	var curry = activey; //stands for current y, and not fish curry.
	
	var num_objs = objectsInBetween(currx,curry,x,y);
	var context = document.getElementById("canvas").getContext("2d");
	if(num_objs == 0)
	{
		if(x>currx)
		{
			drawLine(currx+25,curry+12.5,currx+45,curry+12.5,2,'white'); //hardcoded for now
		}
		else
		{
			drawLine(currx,curry+12.5,currx-45+25,curry+12.5,2,'white'); //hardcoded for now
		}
	}
	
	else
	{
		
		var radius = (num_objs)*45;
		var startAngle = Math.PI;
		var endAngle = 2 * Math.PI;
		var counterClockwise = false;

		
		if(x>currx)
		{
			context.beginPath();
			context.arc(currx+45+12.5, curry, radius, startAngle, endAngle, counterClockwise); //hardcoded for now
			context.lineWidth = 2;
		}
		else
		{
			context.beginPath();
			context.arc(currx-45+12.5, curry, radius, startAngle, endAngle, counterClockwise); //hardcoded for now
			context.lineWidth = 2;
		}

		// line color
		context.strokeStyle = 'white';
		context.stroke();
	}	
}


function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	var dict = {x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)};
	return dict;
}


function drawLine( xstart, ystart, xend, yend, width, color)
{
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = width;
  context.moveTo(xstart, ystart);
  context.lineTo(xend, yend);
  context.stroke();
  context.closePath();
}
       
