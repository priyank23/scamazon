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

        String username = null, password = null;
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
            out.print("[]");
        } else {
            JSONArray wishlist = (new Wishlist(username, db)).getWishlist();
            out.print(JSONValue.toJSONString(wishlist));

        }
    }
}