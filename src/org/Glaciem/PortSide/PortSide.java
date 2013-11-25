/*
 * Copyright 2013 Erik Wilson <erikwilson@magnorum.com>
 * Copyright 2013 Nicholas Ingalls <nicholas.ingalls@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.Glaciem.PortSide;

import org.newdawn.slick.AppGameContainer;
import org.newdawn.slick.BasicGame;
import org.newdawn.slick.GameContainer;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.Input;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.tiled.TiledMap;

public class PortSide extends BasicGame {
	Input input;
	private TiledMap map;
	
	public PortSide(){
		super("PortSide");
	}
	
	public static void main(String[] args) {
		try {
			AppGameContainer app = new AppGameContainer(new PortSide());
			app.setDisplayMode(800, 600, true);
			app.start();
		} catch (SlickException e){
			e.printStackTrace();
		}
	}

	//Load Resources
	public void init(GameContainer arg0) throws SlickException {
		map = new TiledMap("/res/sewers.tmx");
		
	}
	
	//Initial Rendering
	public void render(GameContainer arg0, Graphics arg1) throws SlickException {
		map.render(0, 0);
	}

	//Update Rendering
	public void update(GameContainer arg0, int arg1) throws SlickException {
		if(arg0.getInput().isKeyDown(Input.KEY_ESCAPE)){
			arg0.exit();
		}

	}
}
