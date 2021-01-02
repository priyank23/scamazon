import javax.servlet.*;

public class DatabaseListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent event) {
        ServletContext sc = event.getServletContext();

        String url = sc.getInitParameter("url");
        String username = sc.getInitParameter("username");
        String password = sc.getInitParameter("password");
        String database = sc.getInitParameter("database");

        Database db = new Database(url+database, username, password);

        sc.setAttribute("db", db);
    }
}