package org.Glaciem.PortSide;

import org.lwjgl.input.Keyboard;

public class Input {
	
	public static void quit()
	{
		if (Keyboard.isKeyDown(Keyboard.KEY_ESCAPE)) 
		{
			PortSide.finished = true;
		}
		
	}

}
