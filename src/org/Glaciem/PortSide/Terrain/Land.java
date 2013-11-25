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
package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Land implements Terrain{
	
	public int getHeight(){
		return 1;
	}

	public boolean isWater(){
		return false;
	}

	public boolean isBuildable(){
		return true;
	}

	public boolean isIce(){
		return false;
	}

	public TerrainType getTerrainType(){
		return TerrainType.LAND;
	}

}
