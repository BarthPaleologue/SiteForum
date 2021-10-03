package fr.fastandforum.files;

public class ArchiveLineParser {
	public final String id;
	public final String type;
	public final boolean doesExpand;
	
	public ArchiveLineParser(String line) {
		String[] args = line.split(",");
		id = args[0];
		type = args[1];
		doesExpand = args[2].equalsIgnoreCase("expands");
	}
}
