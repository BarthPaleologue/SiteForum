package fr.fastandforum.main;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import fr.fastandforum.data.ArchivesData;

public class Config {

	public final ArchivesData data;
	public final ServletContext context;
	
	public Config(Main context,ServletContextEvent event)
	{
		this.context = event.getServletContext();
		ArchivesData d = null;
		try {
			d = new ArchivesData(this);
		} catch (IOException e) {
			e.printStackTrace();
		}
		this.data = d;
	}
}
