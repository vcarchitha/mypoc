package org.myorg.mypoc.core.workflow;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Session;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;

@Component(service = WorkflowProcess.class, property = { "process.label=GEU Workflow" })
public class GroupMail implements WorkflowProcess {
	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	@Reference
	ResourceResolverFactory resolverFactory;

	@Override
	public void execute(WorkItem item, WorkflowSession workflowSession,
			MetaDataMap args) throws WorkflowException {

		WorkflowData workflowData = item.getWorkflowData();
		log.info("workflowData::" + workflowData.getPayload());
		log.info("resolverFactory::");
		String excelPath = (String) workflowData.getPayload()
				+ "/jcr:content/renditions/original";
		log.info("excelPath::" + excelPath);

		Map<String, Object> param = new HashMap<String, Object>();
		param.put(ResourceResolverFactory.SUBSERVICE, "getGEUUser");
		ResourceResolver resolver = null;
		Session systemUserSession;

		try {
			resolver = resolverFactory.getServiceResourceResolver(param);
			systemUserSession = resolver.adaptTo(Session.class);
			log.info("####### session ######### : "
					+ systemUserSession.getUserID());
			Node root = systemUserSession.getNode(excelPath);
			log.info("Before create");
			Node node=JcrUtil.createPath("/etc/geu-web/admission/geu", "sling:Folder", systemUserSession);
			systemUserSession.save();
			Node resourceNode = root.getNode("jcr:content");
			InputStream inputStream = resourceNode.getProperty("jcr:data")
					.getBinary().getStream();
		
			Workbook workbook = new XSSFWorkbook(inputStream);
			Sheet sheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = sheet.iterator();
			//JSONArray jsonArray = new JSONArray();
			int row = 1;
			while (iterator.hasNext()) {
				log.info("####### while ######### : ");
			//	JSONArray cells = new JSONArray();
				Row currentRow = iterator.next();
				log.info(":::::::::::::::::::::::"+currentRow.getCell(0));
				if(row>=2){
				String levelTitle= currentRow.getCell(1).toString();
				String levelNode= currentRow.getCell(0).toString().replaceAll("\\s+","");
				String programNode= currentRow.getCell(2).toString().replaceAll("\\s+","");
				String programTitle=currentRow.getCell(3).toString();
				boolean flag=false;
				NodeIterator nodeIterator = node.getNodes();
				log.info("nnnn:::::::"+nodeIterator.getSize());
				while (nodeIterator.hasNext()) {
					Node existnode = nodeIterator.nextNode();
					if(existnode.getName().equals(levelNode)){
						if(existnode.hasProperty("levelTitle")){
							Node prochild=	JcrUtil.createPath(existnode.getPath()+"/"+programNode, "nt:unstructured", systemUserSession);
							prochild.setProperty("programTitle", programTitle);
							systemUserSession.save();
							flag=true;
							break;
						}
						
						
						
					}
					
				}
				if(!flag){
					log.info("GGGGGGGGGGGGGGG" +node.getPath());
			Node child=	JcrUtil.createPath(node.getPath()+"/"+levelNode, "nt:unstructured", systemUserSession);
			child.setProperty("levelTitle", levelTitle);
			Node prochild=	JcrUtil.createPath(child.getPath()+"/"+programNode, "nt:unstructured", systemUserSession);
			prochild.setProperty("programTitle", programTitle);
			systemUserSession.save();
					
				}
				
				
				
				}
					
			
				row++;
			}
			
		} 
	
		catch (Exception e) {
			log.error("messageerror"+e.getMessage());
		}
	}
}
