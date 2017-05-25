package com.zzq.test;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Set;
import java.util.Vector;


public class TestClass {
	public static Vector<String> files = new Vector<String>();
	public static void main(String[] args) {
//		System.out.println(Thread.currentThread().getContextClassLoader().getResource("").getPath());
//		Set<Class<?>> classes = ClassTools.getClasses("");
//		for (Class<?> cls : classes) {  
//		      System.out.println(cls.getName());
////		      Method[] methods = cls.getMethods();
//		      Method[] methods = cls.getDeclaredMethods();
////		      System.out.println("该类的方法数"+methods.length);
//		      for(int i=0;i<methods.length;i++){
//		    	  if(methods[i].isAnnotationPresent(Descrption.class)){
//		    		//获取该方法的Descrption注解实例
//		    		  Descrption myAnnotation = methods[i].getAnnotation(Descrption.class);
//		    		  System.out.println(myAnnotation.value());
//		    	  }else{
//		    		  System.out.println(methods[i].getName()+"不包含注解");
//		    	  }
//		    	  System.out.println(methods[i].getName());
//		    	  Class<?>[] parameterTypes = methods[i].getParameterTypes();
//	              for (Class<?> clas : parameterTypes) {
//	                  String parameterName = clas.getName();
//	                  System.out.println("参数名称:" + parameterName);
//	              }
//	              System.out.println("*****************************");
//		      }
//		}  
		Set<String> packages = ClassTools.getPackages("");
		System.out.println(packages.size());
		for(String singlepackage : packages){
			System.out.println(singlepackage);
		}
	}
	
	  /* 
     * 取得某一类所在包的所有类名 不含迭代 
     */  
    public static String[] getPackageAllClassName(String classLocation, String packageName){  
	        //将packageName分解  
    	 	String relativelyPath=System.getProperty("user.dir"); 
	        System.out.println(relativelyPath);
//	        relativelyPath = relativelyPath.replaceAll("\\\\", "\\\\\\\\");
	        classLocation = classLocation.replaceAll("/", "\\\\");
	        relativelyPath = relativelyPath + classLocation;
	        System.out.println(relativelyPath);		
	        String[] packagePathSplit = packageName.split("[.]");  
	        String realClassLocation = relativelyPath;  
	        int packageLength = packagePathSplit.length;  
	        for(int i = 0; i< packageLength; i++){  
	            realClassLocation = realClassLocation + File.separator+packagePathSplit[i];  
	            System.out.println(realClassLocation);
	        }  
	       System.out.println(realClassLocation);
//	        File packeageDir = new File(realClassLocation);  
////	        File packeageDir = new File("F:\\workspace\\MavenWebProjectID\\src\\main\\java\\com\\example");
//	        if(packeageDir.isDirectory()){  
//	            String[] allClassName = packeageDir.list();  
//	            return allClassName;  
//	        }  
	       try {
				readfile(realClassLocation);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
	        return null;  
	    } 
    
    
    
    /**
     * 读取某个文件夹下的所有文件
     */
    public static boolean readfile(String filepath) throws FileNotFoundException, IOException {
            try {

                    File file = new File(filepath);
                    if (!file.isDirectory()) {
                            System.out.println("文件");
                            System.out.println("path=" + file.getPath());
                            System.out.println("absolutepath=" + file.getAbsolutePath());
                            System.out.println("name=" + file.getName());
                            files.add(filepath);
                    } else if (file.isDirectory()) {
                            System.out.println("文件夹");
                            String[] filelist = file.list();
                            for (int i = 0; i < filelist.length; i++) {
                                    File readfile = new File(filepath + "\\" + filelist[i]);
                                    if (!readfile.isDirectory()) {
                                            System.out.println("path=" + readfile.getPath());
                                            System.out.println("absolutepath="
                                                            + readfile.getAbsolutePath());
                                            System.out.println("name=" + readfile.getName());
                                            files.add(filepath + "\\" + filelist[i]);
                                    } else if (readfile.isDirectory()) {
                                            readfile(filepath + "\\" + filelist[i]);
                                    }
                            }

                    }

            } catch (FileNotFoundException e) {
                    System.out.println("readfile()   Exception:" + e.getMessage());
            }
            return true;
    }
}
