package com.mastek.designschool.common.service;
import java.io.File;

import com.mastek.designschool.common.constants.OCRConstants;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

public class TesseractEngine {


	public static String readImage(File imageFile){
		 Tesseract instance = Tesseract.getInstance();  // JNA Interface Mapping
	        instance.setDatapath(OCRConstants.TESSERACT_PATH);
	     
	        String result ="";
	        
	      //  api.SetVariable("tessedit_char_whitelist", "0123456789,");
	        try {
	            result = instance.doOCR(imageFile);
	           
	        } catch (TesseractException e) {
	            System.err.println(e.getMessage());

	        
	        }
	        return result;
		
	}
	
	
}
