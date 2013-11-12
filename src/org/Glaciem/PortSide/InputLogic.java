package org.Glaciem.PortSide;
import org.lwjgl.input.Keyboard;

public class InputLogic extends Icarus
{
	
	public static void quit()
	{
		if (Keyboard.isKeyDown(Keyboard.KEY_ESCAPE)) 
		{
			Icarus.finished = true;
		}
		
		//Icarus.angle += 2.0f % 360; //???
	}
	
	public static void move()
	{
		if (Keyboard.isKeyDown(Keyboard.KEY_LEFT))
		{
			player.moveX(-5);
		}
		
		if (Keyboard.isKeyDown(Keyboard.KEY_RIGHT))
		{
			player.moveX(5);
		
		}	
		
		if (Keyboard.isKeyDown(Keyboard.KEY_UP))
		{
			player.moveY(5);
		}
		
		if (Keyboard.isKeyDown(Keyboard.KEY_DOWN))
		{
			player.moveY(-5);
		
		}	
	}
	
}
