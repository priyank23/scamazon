import javax.servlet.*;
import java.io.*;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/signin"})
public class LoginHandler extends HttpServlet {
    Database db;
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        db = (Database) getServletContext().getAttribute("db");

        String creds = req.getReader().lines().collect(Collectors.joining());
        PrintWriter out = res.getWriter();

        JSONParser parser  = new JSONParser();
        JSONObject userCredentials = new JSONObject();

        try {
            userCredentials = (JSONObject)parser.parse(creds);
        } catch(ParseException p) {
            p.printStackTrace();
        }

        boolean userExists = checkUser(userCredentials);
        if(userExists) {
            Cookie cookie = new Cookie("username", (String)userCredentials.get("username"));
            cookie.setPath("/");
            res.addCookie(cookie);
        }

        JSONObject toSend = new JSONObject();
        toSend.put("verified", userExists);

        if(userExists) {
            HttpSession httpSession = req.getSession(false);
            if(httpSession != null) {
                httpSession.removeAttribute("bag");
            }
        }

        out.print(toSend);
    }

    boolean checkUser(JSONObject user) {
        try {
            ResultSet rs = db.executeQuery(String.format("Select password from users where username = \"%s\"", (String)user.get("username")));
            if(!rs.isBeforeFirst()) return false;
            rs.next();
            return rs.getString("password").equals((String)user.get("password"));
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
