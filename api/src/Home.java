import javax.servlet.*;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;

@WebServlet(value={"/home"})
public class Home extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        
        PrintWriter out = res.getWriter();
        Database db = (Database) getServletContext().getAttribute("db");
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
