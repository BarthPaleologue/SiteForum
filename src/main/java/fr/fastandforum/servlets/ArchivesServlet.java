package fr.fastandforum.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import fr.fastandforum.archivebuilding.ArchiveHtmlBuilder;
import fr.fastandforum.main.Main;

public class ArchivesServlet extends HttpServlet
{
	public void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
		String dateSortType = request.getParameter( "date_sort" );
		String eventTypes = request.getParameter("event_types");
		
		response.setCharacterEncoding("UTF-8");
    	ArchiveHtmlBuilder.printHtml(response.getWriter(),Main.getConfig().data.fromRequest(dateSortType, eventTypes));
	}
}
