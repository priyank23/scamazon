import javax.servlet.*;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;

@WebServlet(value={"/profile"})
public class Profile extends HttpServlet {
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
        if(username == null) {
            out.println("{\"user\": null");
            return;
        }

        User user = new User(username , db);

        JSONObject toReturn = new JSONObject();

        if(user.isCorrect()) toReturn = user.getJson();
        else toReturn.put("authenticated", false);

        out.print(toReturn);
    }
}
