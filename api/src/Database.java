import java.sql.*;

public class Database {
	private Connection conn;

	public Database(String url, String username, String password) {
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url, username, password);
		} catch(ClassNotFoundException e) {
			throw new IllegalStateException(e);
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}

	public Connection getConnection(){
		return conn;
	}

	public ResultSet executeQuery(String sql) throws SQLException {
		Statement sta = conn.createStatement();
		return sta.executeQuery(sql);
	}

	public int executeUpdate(String sql) throws SQLException {
		Statement sta = conn.createStatement();
		return sta.executeUpdate(sql);
	}
}
