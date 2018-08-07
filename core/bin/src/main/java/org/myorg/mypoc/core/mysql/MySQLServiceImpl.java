package org.myorg.mypoc.core.mysql;







import java.sql.SQLException;

import javax.sql.DataSource;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.commons.datasource.poolservice.DataSourceNotFoundException;
import com.day.commons.datasource.poolservice.DataSourcePool;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;



/**
 * @author architha.vc
 *
 */
@Component(
		name="MySQLImplementation",
		immediate=true,
		service=MySQLService.class)
public class MySQLServiceImpl implements MySQLService {
	
	protected final Logger log= LoggerFactory.getLogger(MySQLServiceImpl.class);

	@Reference
	private DataSourcePool dataSourcePool;

	/**
	 * @return connection
	 */
	private Connection getConnection(){

		DataSource dataSource=null;
		Connection connection=null;
		try {
			dataSource= (DataSource) dataSourcePool.getDataSource("Mypoc");
			if(null!= dataSource){
				log.info("dataSource is not null");
				connection=(Connection) dataSource.getConnection();
			}
			else{
				
				log.info("dataSource is null");
			}
			
		} catch (DataSourceNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return connection;  
	}
	/* (non-Javadoc)
	 * @see org.myorg.mypoc.core.mysql.MySQLService#insertFormData(java.lang.String, java.lang.String)
	 */
	@Override
	public boolean insertFormData(String firstName, String lastName) {
		// TODO Auto-generated method stub
		boolean success=false;
		Connection con=null;
		String query = "insert into aemmysql(firstName,lastName) values(?,?)";
		con=getConnection();
		if(null!= con){
			log.info("con is not null");
		PreparedStatement pstmt=null;
		try {
			pstmt= (PreparedStatement) con.prepareStatement(query);
			pstmt.setString(1,firstName);
			pstmt.setString(2,lastName);
			int rec = pstmt.executeUpdate();
			if(rec==1){
				success=true;

			}
			else
				success=false;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			try
			{
				con.close();
			}

			catch (SQLException e) {
				e.printStackTrace();
			}
		}}else{
			
			log.info("con is null");
		}
		return success;


	}

}
