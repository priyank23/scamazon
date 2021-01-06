import javax.servlet.*;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/home"})
public class Home extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        PrintWriter out = res.getWriter();
        Database db = (Database) getServletContext().getAttribute("db");
        JSONParser parser  = new JSONParser();

        String username = null;
        String password = null;
        JSONArray wishlist = new JSONArray();
    
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

        ArrayList<Product> products = (new Products(db)).getProducts();
        
        JSONObject productList = new JSONObject();
        JSONArray pr = new JSONArray();
        JSONArray deals = new JSONArray();

        for(int i=0;i<products.size();i++) {
            if(products.get(i).isDiscounted()) deals.add(products.get(i).getJson());
            else pr.add(products.get(i).getJson());
        }

        productList.put("products", pr);
        productList.put("deals", deals);

        out.print(JSONValue.toJSONString(productList));
    }
}
