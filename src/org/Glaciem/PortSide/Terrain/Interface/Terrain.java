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
package org.Glaciem.PortSide.Terrain.Interface;

public interface Terrain {
	public enum TerrainType {BEACH, RIVER, SHALLOW_WATER, MEDIUM_WATER, DEEP_WATER, WATER, LAND, TRENCH_WATER, REEF, ARCTIC_WATER, MEADOW, WOODS, MOUNTAIN};
	
	
	/**
	 * Determines the height of the terrain tile in metres
	 * @return Terrain height in Meters
	 */
	public int getHeight();
	
	/**
	 * Determines whether the tile is a water tile or a land tile
	 * @return whether the tile is a water tile
	 */
	public boolean isWater();
	
	/**
	 * Returns whether the tile can have objects built upon it
	 * @return whether the tile is buildable
	 */
	public boolean isBuildable();
	
	/**
	 * Determined whether the tile has ice on top.
	 * @return whether the tile has a layer of ice.
	 */
	public boolean isIce();
	
	/**
	 * Returns the specific type of terrain that the class represents
	 * @return TerrainType enum
	 */
	public TerrainType getTerrainType();
}
