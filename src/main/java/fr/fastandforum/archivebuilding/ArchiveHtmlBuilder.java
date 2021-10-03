package fr.fastandforum.archivebuilding;

import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Stream;

import fr.fastandforum.data.ArchiveUnit;

public class ArchiveHtmlBuilder 
{
	public static void printHtml(PrintWriter writer,Stream<ArchiveUnit> stream)
	{
		stream.forEach(
		u -> {
			writer.write("<div class=\"sectionContainer\" id=\"archive_" + u.id + "\">");
					writer.write("  <div class=\"flexContainer\">");
					writer.write("    <img src=\"imgs/archives/"+ u.id + "/header.jpg\" alt=\"archive\" class=\"bigImg hrzable\">");
					writer.write("    <div class=\"textFlexible doubleWidthFlex\">");
					writer.write("");
					writeAll(u.description,writer);
					writer.write("");
			if(u.doesExpand) {
					writer.write("      <div class=\"lireLaSuite commentable\" onclick=\"expandArchive('" + u.id + "');\">");
					writer.write("        ...");
					writer.write("      </div>");
			}
					writer.write("    </div>");
					writer.write("  </div>");
					writer.write("  <div class=\"archiveContainer\">");
					writer.write("  </div>");
			if(u.doesExpand) {
				writer.write("  <div class=\"retracter commentable\" onclick=\"retracterArchive('" + u.id + "');\">");
				writer.write("    ...");
				writer.write("    <div class=\"commentText\">rétracter</div>");
				writer.write("  </div>");
			}
			writer.write("</div>");
		});
	}
	
	public static void writeAll(List<String> strs, PrintWriter writer)
	{
		for(String str : strs)
		{
			writer.write(str);
		}
	}
	
}
