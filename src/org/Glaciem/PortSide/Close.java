package org.Glaciem.PortSide;
import org.lwjgl.opengl.Display;

public class Close {
	public static void cleanup() {
		Display.destroy();
	}
}
