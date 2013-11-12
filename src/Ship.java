import org.lwjgl.opengl.Display;

public class Ship 
{
	private int[] vertexOne = {0,-50,-50,50,-50,50,50,-50,50};
	private int[] vertexEdge = {0,-50,50,-50,50}; //leftx rightx bottomy bottomx
	private int width  = Display.getDisplayMode().getWidth();
	private int height = Display.getDisplayMode().getHeight();
	
	public void Ship()
	{
		//this.vertexOne = new int[8];
	}
	
	public int getVertex(int val)
	{
		return vertexOne[val];
	}
	
	public void moveX(int x)
	{
		if (((vertexEdge[1] > (-width/2)) && (vertexEdge[2] < (width/2))) || (vertexEdge[1] <= (-width/2) && x > 0) || (vertexEdge[2] >= (width/2) && x < 0))  
		{
			vertexEdge[1]=vertexEdge[1]+x;
			vertexEdge[2]=vertexEdge[2]+x;
			
			vertexOne[1]=vertexOne[1]+x;
			vertexOne[3]=vertexOne[3]+x;
			vertexOne[5]=vertexOne[5]+x;
			vertexOne[7]=vertexOne[7]+x;
		}
	
	}
	
	public void moveY(int y)
	{
		if (((vertexEdge[3] > (-height/2)) && (vertexEdge[4] < (height/2))) || (vertexEdge[3] <= (-height/2) && y > 0) || (vertexEdge[4] >= (height/2) && y < 0))  
		{
			vertexEdge[3]=vertexEdge[3]+y;
			vertexEdge[4]=vertexEdge[4]+y;
			
			vertexOne[2]=vertexOne[2]+y;
			vertexOne[4]=vertexOne[4]+y;
			vertexOne[6]=vertexOne[6]+y;
			vertexOne[8]=vertexOne[8]+y;
		}
	}
}
