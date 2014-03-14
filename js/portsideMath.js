function pointDistance(x, y, xp, yp)
{
	dx = (xp - x);
	dy = (yp - y);
	var distance = Math.sqrt(dx*dx + dy*dy);
	return distance;
}
