package fr.fastandforum.main;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class Main implements ServletContextListener {
	private static Config config;
	

	public static Config getConfig()
	{
		return config;
	}
	
    public void contextInitialized(ServletContextEvent event) {
    	config = new Config(this,event);
    }
    
    
    public void contextDestroyed(ServletContextEvent event) {
        config = null;
    }
}
