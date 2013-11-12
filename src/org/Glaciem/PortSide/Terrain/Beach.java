package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Beach extends Land implements Terrain {
	public int getHeight(){
		return 1;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.BEACH;
	}
}
