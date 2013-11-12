import org.lwjgl.Sys;
import org.lwjgl.opengl.Display;

import static org.lwjgl.opengl.GL11.*;

public class Create 
{
	
	public static final String GAME_TITLE = "PortSide";
	private static final int FRAMERATE = 60;
	
	public static void run() 
	{
		while (!Icarus.finished) 
		{

			Display.update();

			if (Display.isCloseRequested()) 
				Icarus.finished = true;
			else if (Display.isActive()) 
			{
				InputLogic.quit();
				InputLogic.move();
				Graphics.render();
				Display.sync(FRAMERATE);
			}
			else 
			{

				try 
				{
					Thread.sleep(100);
				} 
				
				catch (InterruptedException e) 
				{}
				
				//logic(); //not needed
				
				if (Display.isVisible() || Display.isDirty()) 
				{ 
					Graphics.render();
				}
			}
		}
	}
	
	public static void init() throws Exception {

    Display.setTitle(GAME_TITLE);
    Display.setFullscreen(true);
    Display.setVSyncEnabled(true);

    Display.create();

		glMatrixMode(GL_PROJECTION);
		glLoadIdentity();
		glOrtho(0.0, Display.getDisplayMode().getWidth(), 0.0, Display.getDisplayMode().getHeight(), -1.0, 1.0);
		glMatrixMode(GL_MODELVIEW);
		glLoadIdentity();
		glViewport(0, 0, Display.getDisplayMode().getWidth(), Display.getDisplayMode().getHeight()); //is rendering at the center of the screen which is 3840*1080

	}
	
}
