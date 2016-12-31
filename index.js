var graph = [];		// This array stores objects for all connections made in the graph.


/*
This function creates the div which will hold the images and their connections. 
*/
function makeDiv()
{
	var theDiv = document.createElement("DIV");
	theDiv.id = "box";
	document.body.appendChild(theDiv);

	addImages();
	
	reDraw();		//In case of connections from a prior session.
}

/*
Draws a connection between all the nodes as specified in the graph
*/
function reDraw()
{
	var firstInstance = jsPlumb.getInstance();
	for(i in graph)
	{	
		var item = graph[i];
		var activeSceneID = item['source'];
		var connectionTo = item['destination'];
		if (activeSceneID != connectionTo)
		{
			firstInstance.connect({
			  source:activeSceneID, 
			  target:connectionTo,
			  anchor:"AutoDefault",
			  paintStyle:{ stroke:"white", strokeWidth:1 },
			  connector:[ "Bezier", { curviness:50 } ],
			     endpoint:[ "Rectangle", { 
	      				cssClass:"myEndPoint", 
	      				width:15, 
	      				height:10}] ,
			  endpointStyle:{fill: "#EEE" }
			});
			
		}
	}
	
	
}


/*
Discards the div, all information has already been stored.
*/
function hide()
{
	document.body.removeChild(document.getElementById("box"));
}


/*
Called onclick of an image. Creates a connection between active scene image and clicked image.
Ignores if same image is clicked, no self-loops
*/
function connect(evt)
{
	imgObj = evt.target;
	
	randomIndexForPickingRandomActiveScene = parseInt(Math.random()*100) % 5;	//variable names aren't my forte.
	
	activeSceneID = "img" + randomIndexForPickingRandomActiveScene;		//This line should be replaced by a call to get ID of active scene's image.

	connectionTo = imgObj.id;
	var instance = jsPlumb.getInstance();
	if (activeSceneID != connectionTo)
	{
		graph.push({'source':activeSceneID,'destination':connectionTo});
		instance.connect({
		  source:activeSceneID, 
		  target:connectionTo,
		  anchor:"AutoDefault",
		  paintStyle:{ stroke:"white", strokeWidth:1 },
		  connector:[ "Bezier", { curviness:50 } ],
		     endpoint:[ "Rectangle", { 
      				cssClass:"myEndPoint", 
      				width:15, 
      				height:10}] ,
		  endpointStyle:{fill: "#EEE" }
		});
	}
	
}


/*
Takes a list of image names, and creates image objects and returns an array of images
*/
function createImages(imgNames)
{
	images = []
	for(i=0;i<imgNames.length;++i)
	{
		img = document.createElement("IMG");
		img.id = "img"+i;
		img.src = imgNames[i];
		img.onclick = connect;
		images.push(img)
	}
	
	return images
}

/*
Places images in a circular layout; supports any number of images.
*/
function addImages()
{
	imgNames = ["4.jpg","5.jpg","6.jpg","4.jpg","5.jpg","4.jpg","5.jpg"];		//hardcoded for now; This line should retrieve the list of image names of all scenes
	imgs = createImages(imgNames);
  
	var circle = document.getElementById('box'),
	total = imgs.length,
	coords = {},

	diam = parseInt( window.getComputedStyle(circle).getPropertyValue('width') );
	var radius = diam/2;
	var imgW = imgs[0].getBoundingClientRect().width;
	// get the dimensions of the inner circle we want the images to align to
	var radius2 = radius - imgW;

	var i,
	alpha = Math.PI / 2,
	corner = 2 * Math.PI / total;

	for ( i = 0 ; i < total; i++ )
	{
	imgs[i].style.left = parseInt( ( radius - imgW / 2 ) + ( radius2 * Math.cos( alpha ) ) ) + 'px';
	imgs[i].style.top =  parseInt( ( radius - imgW / 2 ) - ( radius2 * Math.sin( alpha ) ) ) + 'px';
	circle.appendChild(imgs[i]);
	alpha = alpha - corner;
	}  
	
}
