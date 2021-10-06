package fr.fastandforum.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class CharacterSetFilter implements Filter{
	public void doFilter(
		      ServletRequest request, 
		      ServletResponse response, 
		      FilterChain next) throws IOException, ServletException {
				/*
				System.out.println("request: " + request.getCharacterEncoding() + " v " + request);
				if(request instanceof HttpServletRequest)
				{
					System.out.println("URL: " +((HttpServletRequest)request).getRequestURL().toString());
				}*/
				request.setCharacterEncoding("UTF-8");
		        response.setCharacterEncoding("UTF-8");
		        next.doFilter(request, response);
		    }
}
