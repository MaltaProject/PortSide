package org.Glaciem.PortSide;
import org.lwjgl.Sys;
import org.lwjgl.input.Keyboard;
import org.lwjgl.opengl.Display;
import java.io.File;

import static org.lwjgl.opengl.GL11.*;


public class PortSide {
	public static boolean finished;

	public static void main(String[] args) {
		try {
			Create.init();
			Create.run();
		} 
		catch (Exception e) {
			e.printStackTrace(System.err);
			Sys.alert(Create.GAME_TITLE, "An error occured and the game will exit.");
		} 
		finally {
			Close.cleanup();
		}
		System.exit(0);
	}
	
}
