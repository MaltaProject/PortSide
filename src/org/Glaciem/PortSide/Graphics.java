package org.Glaciem.PortSide;

import org.lwjgl.opengl.Display;
import static org.lwjgl.opengl.GL11.*;


public class Graphics extends PortSide {	
		
	public static void render() {
		
	glClear(GL_COLOR_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
    glClear(GL_COLOR_BUFFER_BIT);
    
    glPushMatrix();
    
    glTranslatef(Display.getDisplayMode().getWidth() / 2, Display.getDisplayMode().getHeight() / 2, 0.0f);
    
    glBegin(GL_QUADS);
    glEnd();
    
    glPopMatrix();
	}
}
