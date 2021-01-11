import javax.servlet.*;
import java.io.*;
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
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for(int i=0;i<cookies.length; i++) {
                if(cookies[i].getName().equals("username")) username = (String) cookies[i].getValue();
            }
        }

        JSONParser parser = new JSONParser();
		JSONObject obj = new JSONObject();
        JSONObject product = new JSONObject();

		try {
			obj = (JSONObject)parser.parse(query);
            product = (JSONObject)parser.parse((String)obj.get("product"));
		} catch(ParseException e) {}

        boolean add = (boolean)obj.get("add");

        if(username == null) {
            HttpSession httpSession = req.getSession(false);
            if(httpSession != null) {
                JSONArray arr = new JSONArray();
                try {
                    arr = (JSONArray)parser.parse((String)httpSession.getAttribute("bag"));
                } catch(ParseException e) {}

                boolean updated = false;
                for(int i=0;i<arr.size();i++) {
                    if(((String)((JSONObject)((JSONObject)arr.get(i)).get("product")).get("id")).equals((String)product.get("id"))) {
                        if(add) ((JSONObject)arr.get(i)).put("quantity", (long)((JSONObject)arr.get(i)).get("quantity") + 1);
                        else ((JSONObject)arr.get(i)).put("quantity", (long)((JSONObject)arr.get(i)).get("quantity") - 1);
                        updated = true;
                    }
                }
                if(!updated && add) {
                    JSONObject pr=new JSONObject(), toSend = new JSONObject(); 

                    pr.put("id", (String)product.get("id"));
                    pr.put("name", (String)product.get("name"));
                    pr.put("price", (long)product.get("price"));
                    pr.put("type", (String)product.get("type"));
                    pr.put("isDeal", (boolean)product.get("isDeal"));
                    pr.put("discount", (long)product.get("discount"));
                    pr.put("imgSrc", (String)product.get("imgSrc"));

                    toSend.put("product", pr);
                    toSend.put("quantity", 1);
                    arr.add(toSend);
                }
                httpSession.setAttribute("bag", JSONValue.toJSONString(arr));   
            }
        } else {
            Wishlist wishlist = new Wishlist(username, db);
            if(add) wishlist.add(product);
            else wishlist.remove(product);
        }
        out.print("{\"status\": \"ok\"}");
    }
}
