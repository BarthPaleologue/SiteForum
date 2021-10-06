package fr.fastandforum.files;

import java.util.Arrays;

public class ArchiveLineParser {
	public final String id;
	public final String type;
	public final boolean doesExpand;
	public final boolean hrHeader;
	
	public ArchiveLineParser(String line) {
		String[] args = line.split(",",-1);
		try {
			id = args[0];
			type = args[1];
			doesExpand = args[2].equalsIgnoreCase("expands");
			hrHeader = args[3].equalsIgnoreCase("hr");
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("issue at config " + line + " args " + Arrays.toString(args));
		}
	}
}
