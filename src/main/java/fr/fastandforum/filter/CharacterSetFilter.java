package fr.fastandforum.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CharacterSetFilter implements Filter{
	public void doFilter(
		      ServletRequest request, 
		      ServletResponse response, 
		      FilterChain next) throws IOException, ServletException {
		        request.setCharacterEncoding("UTF-8");
		        response.setCharacterEncoding("UTF-8");
		        next.doFilter(request, response);
		    }
}
