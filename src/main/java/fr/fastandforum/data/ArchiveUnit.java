package fr.fastandforum.data;

import java.util.Comparator;
import java.util.List;

public class ArchiveUnit {
	public final String id;
	public final String type;
	public final boolean hrHeader;
	public final List<String> description;
	public final int timeRank;
	public final boolean doesExpand;
	
	
	public static final Comparator<ArchiveUnit> comparatorTime = new Comparator<ArchiveUnit>() {

		@Override
		public int compare(ArchiveUnit o1, ArchiveUnit o2) {
			return o1.timeRank-o2.timeRank;
		}
	};
	
	
	public ArchiveUnit(String id, String type, boolean doesExpand, boolean hrHeader, int timeRank,List<String> description)
	{
		this.id = id;
		this.type = type;
		this.hrHeader = hrHeader;
		this.doesExpand = doesExpand;
		this.timeRank = timeRank;
		this.description = description;
	}
	
	
	
}
