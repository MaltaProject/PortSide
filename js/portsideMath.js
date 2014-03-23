function pointDistance(x, y, xp, yp)
{
	dx = (xp - x);
	dy = (yp - y);
	var distance = Math.sqrt(dx*dx + dy*dy);
	return distance;
}

function detectCollision(objects)
{
	for(var i = 0; i < objects.length; i++)
	{
		var objectsp = [];
		for(var j = 0; j < objects.length-1; j++)
		{
			if(j != i)
				objectsp.push(objects[j]);
		} 
		var originPoint = objects[i].position.clone();
		for (var vertexIndex = 0; vertexIndex < objects[i].geometry.vertices.length; vertexIndex++)
			{		
			var localVertex = objects[i].geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( objects[i].matrix );
			var directionVector = globalVertex.sub( objects[i].position );
			
			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			var collisionResults = ray.intersectObjects( objectsp );
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			{
				sink(collisionResults);
			}
		}			
	}
}

