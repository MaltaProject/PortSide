package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Mountains extends Land implements Terrain{
	public int getHeight(){
		return 3000;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.MOUNTAIN;
	}
	
	public boolean isBuildable(){
		return false;
	}
}
