package fr.fastandforum.files;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import fr.fastandforum.main.Config;

public class FileUtils {
	public static BufferedReader getFileReader(String pathRelativetoWebApp,Config config) throws FileNotFoundException
	{
		//return new BufferedReader(new FileReader(config.context.getRealPath(pathRelativetoWebApp)));
		try {
			return new BufferedReader(
			           new InputStreamReader(
			                      new FileInputStream(new File(config.context.getRealPath(pathRelativetoWebApp))), "UTF8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
