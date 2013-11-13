package org.Glaciem.PortSide;

import org.newdawn.slick.AppGameContainer;
import org.newdawn.slick.BasicGame;
import org.newdawn.slick.GameContainer;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

public class PortSide extends BasicGame {

	public PortSide(){
		super("PortSide");
	}
	
	public static void main(String[] args) {
		try {
			AppGameContainer app = new AppGameContainer(new PortSide());
			app.setDisplayMode(500, 400, false);
			app.start();
		} catch (SlickException e){
			e.printStackTrace();
		}
	}

	public void render(GameContainer arg0, Graphics arg1) throws SlickException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(GameContainer arg0) throws SlickException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(GameContainer arg0, int arg1) throws SlickException {
		// TODO Auto-generated method stub
		
	}
}
