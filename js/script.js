function Point(x,y){
	this.x=x;
	this.y=y;
};

function RectClass(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
RectClass.prototype.pointInRect = function(elemPoint){
	return elemPoint.x<this.x+this.w && elemPoint.x>this.x &&
		elemPoint.y<this.y+this.h && elemPoint.y>this.y
};


var cont = document.querySelector(".container");
var pallet = document.querySelector(".pallet");
var rect = document.querySelector(".rect");
var dragMode = false;
var dragElem = null;


pallet.addEventListener("mousedown",function(e){
	if(e.target.classList.contains("color")){
	select(e.target,new Point(e.clientX,e.clientY))
	};
	
});
cont.addEventListener("mousemove",function(e){
	if(dragMode==true){
		mouseMove(new Point(e.clientX,e.clientY))
	}
});



cont.addEventListener("mouseup",function(e){
  var elem = pointInRect(new Point(e.clientX,e.clientY));
	if(elem){elem.style.background = dragElem.id};
	dragElem.remove();
	dragMode=false
	
	
})

function select(elem,position){
	dragElem = elem.cloneNode(true);
	dragElem.style.position = "fixed";
	dragElem.style.zIndex = 10000000;
	dragElem.style.transform = "rotate(30deg)";
	dragElem.style.left = position.x-dragElem.Width/2+"px";
	dragElem.style.top = position.y-dragElem.offsetHeight/2+"px";
	pallet.appendChild(dragElem);
	 dragMode = true;
};

function mouseMove(position){
	dragElem.style.left = position.x-dragElem.offsetWidth/2+"px";
	dragElem.style.top = position.y-dragElem.offsetHeight/2+"px";
};

function pointInRect(pointPos){
	var items = Array.prototype.slice.call(rect.querySelectorAll(".item"));
return	items.filter(function(item){
	var clientRect = item.getBoundingClientRect();
	var rectObj = new RectClass(clientRect.left,clientRect.top,
							   clientRect.width,clientRect.height);
	return rectObj.pointInRect(pointPos);
})[0];
}





















































