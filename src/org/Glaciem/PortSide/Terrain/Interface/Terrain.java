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