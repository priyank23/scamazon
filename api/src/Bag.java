import javax.servlet.*;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/bag"})
public class Bag extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        PrintWriter out = res.getWriter();
        Database db = (Database) getServletContext().getAttribute("db");

        String username = null;
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for(int i=0;i<cookies.length; i++) {
                if(cookies[i].getName().equals("username")) username = (String) cookies[i].getValue();
            }
        }

        JSONParser parser = new JSONParser();

        if(username == null) {
            HttpSession httpSession = req.getSession(false);
            if(httpSession != null) {
                try{
                    JSONArray wishlist = (JSONArray)parser.parse((String)httpSession.getAttribute("bag"));
                    out.print(JSONValue.toJSONString(wishlist));
                } catch(ParseException p) {}
            }
        } else {
            JSONArray wishlist = (new Wishlist(username, db)).getWishlist();
            out.print(JSONValue.toJSONString(wishlist));
        }
    }
}