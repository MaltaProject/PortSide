package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class TrenchWater extends Water implements Terrain {
	public int getHeight(){
		return -15;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.TRENCH_WATER;
	}
}
