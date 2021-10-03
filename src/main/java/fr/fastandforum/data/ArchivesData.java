package fr.fastandforum.data;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import fr.fastandforum.files.ArchiveLineParser;
import fr.fastandforum.files.FileUtils;
import fr.fastandforum.main.Config;

public class ArchivesData 
{
	public List<ArchiveUnit> byDate;
	public List<ArchiveUnit> byDateReversed;
	
	
	public ArchivesData(Config config) throws IOException
	{

		List<ArchiveUnit> units = new ArrayList<ArchiveUnit>();
		BufferedReader descriptor = FileUtils.getFileReader("/WEB-INF/archives_descriptors.txt", config);
		try {
			String str = descriptor.readLine();
			int dateRank = 0;
			while(str != null)
			{
				dateRank ++;
				ArchiveLineParser parser = new ArchiveLineParser(str);
				List<String> description = new ArrayList<String>();
				BufferedReader readerDesc = FileUtils.getFileReader("/pages/archives/" + parser.id + "_header.html", config);
				try {
					readerDesc.lines().forEach(l -> description.add(l));
				}
				finally {
					readerDesc.close();
				}
				units .add(new ArchiveUnit(parser.id, parser.type, parser.doesExpand, dateRank, description));
				str = descriptor.readLine();
			}
		} finally {
			descriptor.close();
		}
		byDate = units;
		byDateReversed = new ArrayList<>(byDate);
		Collections.reverse(byDateReversed);
	}
	
	public Stream<ArchiveUnit> fromRequest(String dateSortType, String eventType)
	{
		Stream<ArchiveUnit> stream;
		if(dateSortType == null || dateSortType.equals("croissant"))
		{
			stream = byDate.stream();
		}
		else
		{
			stream = byDateReversed.stream();
		}
		if(eventType != null)
		{
			switch(eventType)
			{
			case "defi":
				stream = stream.filter(u -> u.type.equals("defi"));
				break;
			case "repas":
				stream = stream.filter(u -> u.type.equals("repas"));
				break;
			}
		}
		return stream;
	}
}
