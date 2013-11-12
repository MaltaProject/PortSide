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
