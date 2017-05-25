package com.example;

import com.zzq.test.Descrption;

public class ClassOne {
	@Descrption(value="求两个数的和")
	public int method1(int a,Float b,Boolean c,String d,Double e,byte f,char g,short h){
		return a;
	}
	private String method2(String a,String b){
		return a+b;
	}
}
