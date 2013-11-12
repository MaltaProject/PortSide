package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Meadow extends Land implements Terrain {
	public int getHeight(){
		return 3;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.MEADOW;
	}
}
