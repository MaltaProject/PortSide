package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class ArcticWater extends Water implements Terrain {

	public int getHeight(){
		return 0;
	}
	
	public boolean isIce(){
		return true;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.ARCTIC_WATER;
	}
	
}
