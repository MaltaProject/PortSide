package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class DeepWater extends Water implements Terrain{

	public int getHeight(){
		return -20000;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.DEEP_WATER;
	}
}
