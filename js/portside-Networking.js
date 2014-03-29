//game room active?
var active = false;

//add a ship over the network
function netship(data) 
{
	if(typeof objects[data.id] !== 'undefined' || objects[data.id] !== null)
	{
		addModelFS("patrol",data.xpos,data.ypos);
	}
	else
	{
		objects[data.id].position.x = data.xpos;
		objects[data.id].position.y = data.ypos;
	}
}

//move a ship over the network
function netmove(data) 
{
	new TWEEN.Tween(objects[data.id].rotation, {override:true}).to( {
		z: (data.angle) }, (data.time/4) )
	.easing( TWEEN.Easing.Linear.None).start();
		
	new TWEEN.Tween(objects[data.id].position, {override:true}).to( {
		x: data.xpos,
		y: data.ypos }, data.time )
	.easing( TWEEN.Easing.Linear.None).start();
}

//inital connection
function netconnect(data) 
{
	if(data == 2)
	{
		obj = document.getElementById("wait");
		document.body.removeChild(obj);
		active = true;
	}
	else if(data < 2 || data > 2 && active == true)
	{
		objects = [];
		w = document.createElement('div');
		w.id = 'wait';
	}
}

//send ship to server
function sendShip(i) 
{
		var w = objects[i].position.clone();
		var x = w.x;
		var y = w.y;
		
		var shipdata = {
			id: i,
			xpos: x,
			ypos: y
		}
		socketio.emit("msgs", shipdata);
}

//send ship movement to server
function sendShipMovement(selid, pos, time, angle) 
{
		var i = selid - 3;
		var w = objects[i].position.clone();
		var x = w.x;
		var y = w.y;
		
		var shipdata = {
			id: i,
			time: time,
			angle: angle,
			xpos: pos.x,
			ypos: pos.y
		}
		socketio.emit("msgsm", shipdata);
}
