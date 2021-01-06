import javax.servlet.*;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/updateWishlist"})
public class ProductHandler extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        PrintWriter out = res.getWriter();

        Database db = (Database) getServletContext().getAttribute("db");

        String query=req.getReader().lines().collect(Collectors.joining());
        String username = null;
        String password = null;
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for(int i=0;i<cookies.length; i++) {
                if(cookies[i].getName().equals("username")) username = (String) cookies[i].getValue();
                if(cookies[i].getName().equals("password")) password = (String) cookies[i].getValue();
            }
        }

        if(username == null) {
            username = "__dummy";
            password = "";
            Cookie userCookie = new Cookie("username", username);
            Cookie passCookie = new Cookie("password", password);
            userCookie.setPath("/");
            passCookie.setPath("/");
            res.addCookie(userCookie);
            res.addCookie(passCookie);
        }

		JSONParser parser = new JSONParser();
		JSONObject obj = new JSONObject();
        JSONObject product = new JSONObject();

		try {
			obj = (JSONObject)parser.parse(query);
            product = (JSONObject)parser.parse((String)obj.get("product"));
		} catch(ParseException e) {}

        boolean add = (boolean)obj.get("add");
        

        Wishlist wishlist = new Wishlist(username, db);
        if(add) wishlist.add(product);
        else wishlist.remove(product);
        out.print("{\"status\": \"ok\"}");
    }
}
