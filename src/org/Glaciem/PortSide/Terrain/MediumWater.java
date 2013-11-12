package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class MediumWater extends Water implements Terrain{
	public int getHeight(){
		return -500;
	}
	
	public TerrainType getTerrainType(){
		return TerrainType.MEDIUM_WATER;
	}
}
