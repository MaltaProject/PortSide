package org.Glaciem.PortSide.Terrain;

import org.Glaciem.PortSide.Terrain.Interface.Terrain;

public class Water implements Terrain {

	public int getHeight() {
		return -5;
	}

	public boolean isWater() {
		return true;
	}

	public boolean isBuildable() {
		return false;
	}

	public boolean isIce() {
		return false;
	}

	public TerrainType getTerrainType() {
		return TerrainType.WATER;
	}
}
