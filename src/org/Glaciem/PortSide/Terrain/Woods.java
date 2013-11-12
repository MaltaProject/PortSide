package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Woods extends Land implements Terrain{
	public int getHeight(){
		return 5;
	}
	
	public boolean isBuildable(){
		return false;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.WOODS;
	}
}
