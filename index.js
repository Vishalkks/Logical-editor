
function makeDiv()
{
	var theDiv = document.createElement("DIV");
	theDiv.id = "theDiv";
	theDiv.style.width = "100%";		
	theDiv.style.height = "100%";
	
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
		  anchors:[ "Right", "Left" ],
		  paintStyle:{ stroke:"white", strokeWidth:1 },
		  endpointStyle:{ fill: "black" }
		});
	}

}


function addImages()
{
  div = document.getElementById("theDiv");
  
  img1 = new Image(); img1.src = "4.jpg";  img1.id = "img1";
  img2 = new Image(); img2.src = "5.jpg";  img2.id = "img2";
  img3 = new Image(); img3.src = "6.jpg";  img3.id = "img3";

  img1.onload = function(){
  	img1.style = "height:130px;width:130px;position:absolute;left:35%;top:20%;border-radius:15px;";
  	div.appendChild(img1);
  	
  };

  img2.onload = function(){
        img2.style = "height:130px;width:130px;position:absolute;left:60%;top:30%;border-radius:15px;";
  	div.appendChild(img2);
  };
  
  img3.onload = function(){
  	img3.style = "height:130px;width:130px;position:absolute;left:45%;top:50%;border-radius:15px;";
  	div.appendChild(img3);
  };

  img1.onclick = connect;
  img2.onclick = connect;
  img3.onclick = connect;
}


