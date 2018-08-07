package org.myorg.mypoc.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables=Resource.class,defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL)
public class MapModel {
	
	
	private  Map<Integer,List<String>> map;
	
	 

	@PostConstruct
	    protected void init() {
		List<String>list=new ArrayList<String>();
		list.add("one");
		list.add("two");
		list.add("three");
		List<String>list1=new ArrayList<String>();
		list1.add("one");
		list1.add("two");
		list1.add("three");
		List<String>list2=new ArrayList<String>();
		list2.add("one");
		list2.add("two");
		list2.add("three");
		 map=new HashMap<Integer,List<String>>();  
		  map.put(100,list);  
		  map.put(101,list1);  
		  map.put(102,list2);  
	    }
	
	public Map<Integer, List<String>> getMap() {
		return map;
	}

}
