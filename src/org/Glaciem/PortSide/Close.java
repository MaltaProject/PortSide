package org.Glaciem.PortSide;
import org.lwjgl.Sys;
import org.lwjgl.opengl.Display;

import static org.lwjgl.opengl.GL11.*;

public class Close {
	public static void cleanup() {
		Display.destroy();
	}
}
