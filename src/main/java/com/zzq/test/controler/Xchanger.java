package com.zzq.test.controler;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;





import java.util.Set;

import org.apache.ibatis.javassist.bytecode.Descriptor.Iterator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zzq.test.ClassTools;
import com.zzq.test.Descrption;

@Controller
@RequestMapping("/xchanger")
public class Xchanger {
	@RequestMapping("/package")
	public @ResponseBody Map<String, Object> getPackage(String packageName){
		System.out.println("来了"+packageName);
		Map<String, Object> mapData = new HashMap<String,Object>();
		Object[] packages=null;
		Set<String> set =ClassTools.getPackages("");
		for(String s:set ){
			System.out.println(s);
		}
		packages =set.toArray();
//		String[] aa =  (String[]) packages;
		mapData.put("status", "success");
		mapData.put("data", packages);
		return mapData;
	}
	
	@RequestMapping("/class")
	public @ResponseBody Map<String, Object> getClassByPackage(String packageName){
		System.out.println("来了"+packageName);
		Map<String, Object> mapData = new HashMap<String,Object>();
		Set<Class<?>> classes = ClassTools.getClasses(packageName);
		String[] ret_classes = new String[classes.size()];
		java.util.Iterator<Class<?>> iterator = classes.iterator();
		for(int i=0;i<classes.size();i++){ 
			Class<?> cls = iterator.next();
		      System.out.println(cls.getName());
		      if(cls.isAnnotationPresent(Descrption.class)){
		    	  Descrption myAnnotation = cls.getAnnotation(Descrption.class);
		    	  ret_classes[i] = cls.getName() +"--" +myAnnotation.value();
		      }else{
		    	  System.out.println("未设置注解描述");
		    	  ret_classes[i] = cls.getName() +"--无注解" ;
		      }
		}
		mapData.put("status", "success");
		mapData.put("data", ret_classes);
		return mapData;
	}
	
	@RequestMapping("/method")
	public @ResponseBody Map<String, Object> getMethodByClass(String ClassName){
		System.out.println("来了"+ClassName);
		Map<String, Object> mapData = new HashMap<String,Object>();
		Class<?> cls;
		 String[] ret_methods;
		try {
			cls = Class.forName(ClassName);
			  System.out.println(cls.getName());
		      Method[] methods = cls.getDeclaredMethods();
		      ret_methods = new String[methods.length];
		      for(int i=0;i<methods.length;i++){
		    	  if(methods[i].isAnnotationPresent(Descrption.class)){
		    		//获取该方法的Descrption注解实例
		    		  Descrption myAnnotation = methods[i].getAnnotation(Descrption.class);
		    		  ret_methods[i] = methods[i].getName()+"--"+myAnnotation.value();
		    		  System.out.println(myAnnotation.value());
		    	  }else{
		    		  ret_methods[i] = methods[i].getName()+"--无注解";
		    	  }
		      }
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ret_methods=null;
		}
	
		mapData.put("status", "success");
		mapData.put("data", ret_methods);
		return mapData;
	}
	
	@RequestMapping("/parameters")
	public @ResponseBody Map<String, Object> getParameterByMethod(String ClassName,String methodName){
		System.out.println("来了"+ClassName+methodName);
		Map<String, Object> mapData = new HashMap<String,Object>();
		Class<?> cls;
		 String[] ret_methods ;
		try {
			cls = Class.forName(ClassName);
			  System.out.println(cls.getName());
		      Method[] methods = cls.getDeclaredMethods();
		     
		      for(int i=0;i<methods.length;i++){
		    	  if(methods[i].getName().equalsIgnoreCase(methodName)){
		    		  Class<?>[] parameterTypes = methods[i].getParameterTypes();
		    		  ret_methods = new String[parameterTypes.length];
		    		  int j=0;
		              for (Class<?> clas : parameterTypes) {
		                  String parameterName = clas.getName();
		                  System.out.println("参数名称:" + parameterName);
		                  ret_methods[j++] = parameterName;
		              }
		              mapData.put("status", "success");
		      		mapData.put("data", ret_methods);
		      		return mapData;
		    	  }
		    	  
		      }
		      ret_methods=null;
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ret_methods=null;
		}
		
		mapData.put("status", "success");
		mapData.put("data", ret_methods);
		return mapData;
	}
}
