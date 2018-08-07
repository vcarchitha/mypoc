package org.myorg.mypoc.core.bean;

import java.util.List;

public class ExcelBean {
	private String jrow;
	private List<String> Cells;
	public String getJrow() {
		return jrow;
	}
	public void setJrow(String jrow) {
		this.jrow = jrow;
	}
	public List<String> getCells() {
		return Cells;
	}
	public void setCells(List<String> cells) {
		Cells = cells;
	}
	
}
