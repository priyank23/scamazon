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
    Database db;
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        PrintWriter out = res.getWriter();
        db = (Database) getServletContext().getAttribute("db");
        JSONParser parser  = new JSONParser();

        String username = null;
        String password = null;
        JSONArray wishlist = new JSONArray();
    
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for(int i=0;i<cookies.length; i++) {
                if(cookies[i].getName().equals("username")) username = (String) cookies[i].getValue();
            }
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

        if(username == null) {
            HttpSession httpSession = req.getSession();
            if(httpSession.isNew()) {
                httpSession.setAttribute("bag", "[]");
                productList.put("dealsFirst", true);
            }
            else {
                try {
                    JSONArray bag = (JSONArray)parser.parse((String)httpSession.getAttribute("bag"));
                    int dealsFirst = 0;
                    for(int i=0; i<bag.size(); i++) {
                        if((boolean)((JSONObject)((JSONObject)bag.get(i)).get("product")).get("isDeal")) dealsFirst++;
                        else dealsFirst--;
                    }
                    productList.put("dealsFirst", dealsFirst>0? true: false);
                } catch(ParseException e) {e.printStackTrace();}
                // catch(NullPointerException e) {
                //     productList.put("dealsFirst", true);
                // }
            } 
        }

        else productList.put("dealsFirst", dealsFirst(username));

        out.print(JSONValue.toJSONString(productList));
    }

    boolean dealsFirst(String username) {
        try{
            ResultSet deals = db.executeQuery(String.format("select count(isDeal) as deals from user_preferences where username = \"%s\" group by isDeal having isDeal = 1", username));
            ResultSet picks = db.executeQuery(String.format("select count(isDeal) as picks from user_preferences where username = \"%s\" group by isDeal having isDeal = 0", username));
            
            if(!deals.isBeforeFirst() && !picks.isBeforeFirst()) return true;
            else if(!deals.isBeforeFirst()) return false;
            else if(!picks.isBeforeFirst()) return true;
            else {
                deals.next();picks.next();
                return deals.getInt("deals")> picks.getInt("picks")? true: false; 
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return true;
    }
}
