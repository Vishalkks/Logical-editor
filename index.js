function makeDiv()
{
	var theDiv = document.createElement("DIV");
	theDiv.id = "box";
	document.body.appendChild(theDiv);
	addImages();
}

function connect(evt)
{
	imgObj = evt.target;
	
	activeSceneID = "img1";
	connectionTo = imgObj.id;
	if (activeSceneID != connectionTo)
	{
		jsPlumb.connect({
		  source:activeSceneID, 
		  target:connectionTo,
		  anchor:"AutoDefault",
		  paintStyle:{ stroke:"white", strokeWidth:1 },
		  connector:[ "Flowchart", { midpoint:0.5, cornerRadius:10 } ],
		     endpoint:[ "Rectangle", { 
      				cssClass:"myEndPoint", 
      				width:15, 
      				height:10}] ,
		  endpointStyle:{fill: "#EEE" }
		});
	}

}


//Takes a list of image names, and creates image objects and returns an array of images
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
