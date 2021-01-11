import javax.servlet.*;
import java.io.*;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/signup"})
public class SignupHandler extends HttpServlet {
    Database db;
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        db = (Database) getServletContext().getAttribute("db");

        String userInfo = req.getReader().lines().collect(Collectors.joining());
        PrintWriter out = res.getWriter();

        JSONParser parser  = new JSONParser();
        JSONObject user = new JSONObject();

        try {
            user = (JSONObject)parser.parse(userInfo);
        } catch(ParseException p) {
            p.printStackTrace();
        }

        boolean userAdded = addUser(user);
        JSONObject toSend = new JSONObject();
        toSend.put("added", userAdded);

        // if(userAdded) res.sendRedirect("http://localhost:3000/sign-in");
        out.print(toSend);
    }

    boolean addUser(JSONObject user) {
        try {
            int r = db.executeUpdate(String.format("Insert into users values(\"%s\", \"%s\", '%c', \"%s\", \"%s\", STR_TO_DATE('%s', ", 
                (String) user.get("username"), 
                (String) user.get("name"),
                ((String)user.get("gender")).charAt(0),
                (String) user.get("email"),
                (String) user.get("password"),
                (String) user.get("dob")
                ) + " '%Y-%m-%d'), DATE(NOW()))");
            
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
