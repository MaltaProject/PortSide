package org.Glaciem.PortSide;
import org.lwjgl.Sys;
import org.lwjgl.input.Keyboard;
import org.lwjgl.opengl.Display;
import java.io.File;

import static org.lwjgl.opengl.GL11.*;


public class Icarus 
{

	public static boolean finished;
	//public static float angle;
	public static Ship player;

	public static void main(String[] args) 
	{
		//System.setProperty("org.lwjgl.librarypath", new File("native").getAbsolutePath());
		player = new Ship();
		try 
		{
			Create.init();
			Create.run();
		} 
		catch (Exception e) 
		{
			e.printStackTrace(System.err);
			Sys.alert(Create.GAME_TITLE, "An error occured and the game will exit.");
		} 
		finally 
		{
			Close.cleanup();
		}

		System.exit(0);
	}
	
}
/**
 * Ship object needs to be passed from the driver to the graphics so that it can render, probably java implements or something
 * Dual monitor issue still needs to be fixed
 * Distribution still needs to be fixed, look into the online distribution options
 * */
