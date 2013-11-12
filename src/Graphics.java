import org.lwjgl.Sys;
import org.lwjgl.opengl.Display;
import static org.lwjgl.opengl.GL11.*;

import java.util.Arrays;

public class Graphics extends Icarus
{	
		
	public static void render() 
	{
		
	glClear(GL_COLOR_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
    glClear(GL_COLOR_BUFFER_BIT);
    
    glPushMatrix();
    
    glTranslatef(Display.getDisplayMode().getWidth() / 2, Display.getDisplayMode().getHeight() / 2, 0.0f);
    //glRotatef(Icarus.angle, 0, 0, 1.0f);
    
    glBegin(GL_QUADS);
    glVertex2i(player.getVertex(1), player.getVertex(2));
    glVertex2i(player.getVertex(3), player.getVertex(4));
    glVertex2i(player.getVertex(5), player.getVertex(6));
    glVertex2i(player.getVertex(7), player.getVertex(8));
    glEnd();
    
    glPopMatrix();
	}
	
}
