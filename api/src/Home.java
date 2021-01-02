import javax.servlet.*;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.sql.*;

@WebServlet(value={"/home"})
public class Home extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        PrintWriter out = res.getWriter();
        Database db = (Database) getServletContext().getAttribute("db");
        try {
            ResultSet resultSet = db.executeQuery("Select * from products;");
            ResultSetMetaData metaData = resultSet.getMetaData();
            int numberOfColumns = metaData.getColumnCount();
            for(int i = 1; i<= numberOfColumns; i++){
                out.print(metaData.getColumnName(i));
                out.print("\t");
            }
            out.println();

            while (resultSet.next()){
                for (int i = 1; i <= numberOfColumns; i++){
                    out.print(resultSet.getObject(i)+"\t");
                }
                out.println();
                }
        }
        catch (Exception f) {
            f.printStackTrace();
        }
    }
}
