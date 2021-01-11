import javax.servlet.*;
import java.io.*;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;
import org.json.simple.*;
import org.json.simple.parser.*;

@WebServlet(value={"/signout"})
public class SignoutHandler extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        Cookie[] cookies = req.getCookies();

        for(int i=0; i<cookies.length;i++) {
            if(cookies[i].getName().equals("username")) {
                cookies[i].setMaxAge(0);
                cookies[i].setPath("/");
                res.addCookie(cookies[i]);
            }
        }

        HttpSession httpSession = req.getSession(false);
        if(httpSession != null) httpSession.invalidate();

        PrintWriter out = res.getWriter();
        out.print("{\"signedOut\": true}");
    }
}
