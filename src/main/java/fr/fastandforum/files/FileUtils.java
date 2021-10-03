package fr.fastandforum.files;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

import fr.fastandforum.main.Config;

public class FileUtils {
	public static BufferedReader getFileReader(String pathRelativetoWebApp,Config config) throws FileNotFoundException
	{
		return new BufferedReader(new FileReader(config.context.getRealPath(pathRelativetoWebApp)));
	}
}
