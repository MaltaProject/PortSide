package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Reef extends Water implements Terrain{
	public TerrainType getTerrainType(){
		return TerrainType.REEF;
	}
}
