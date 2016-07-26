package com.mastek.designschool.common.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mastek.designschool.common.constants.OCRConstants;
import com.mastek.designschool.common.dto.BankStatement;
import com.mastek.designschool.common.dto.Ocrservicerequest;
import com.mastek.designschool.common.dto.Ocrserviceuploadrequest;
import com.mastek.designschool.common.dto.ServiceResponse;
import com.mastek.designschool.common.service.OCRService;
import com.mastek.designschool.common.util.ImageUtils;



@RestController
public class OCRServiceController {

	
	@Autowired
	private OCRService ocrservice;
	
	public static final String APPLICATION_JSON = "application/json";
	
	@CrossOrigin
	@RequestMapping(value="/ocrservice/read", method = RequestMethod.POST,consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
	public @ResponseBody BankStatement getBankStatement(@RequestBody Ocrservicerequest serviceRequest) {
		//System.out.println(inputJson);
		//Ocrservicerequest serviceRequest=(Ocrservicerequest)JsonUtil.fromJsonUnchecked(inputJson, Ocrservicerequest.class);
		//System.out.println("file path is "+serviceRequest.getEncodedImage());
		String imageType=serviceRequest.getFileType();
		String tempFile=OCRConstants.TEMP_FILE_PATH +"ocrtemp."+imageType;
		ImageUtils.writeImageFromBase64String(serviceRequest.getEncodedImage(),imageType,tempFile);
		BankStatement bankStatement=ocrservice.getBankStatementFromImage(tempFile);
		
		return bankStatement;

	}
	
	@CrossOrigin
	@RequestMapping(value="/ocrservice/upload", method = RequestMethod.POST,consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
	public @ResponseBody ServiceResponse getBankStatement(@RequestBody Ocrserviceuploadrequest uploadRequest) {
		//System.out.println(inputJson);
		//Ocrservicerequest serviceRequest=(Ocrservicerequest)JsonUtil.fromJsonUnchecked(inputJson, Ocrservicerequest.class);
		ServiceResponse serviceResponse= new ServiceResponse(true, "");
		String encodedImage=uploadRequest.getEncodedImage();
		

				
					BufferedImage temp;
					try {
						temp = ImageIO.read(new ByteArrayInputStream(ImageUtils.decodeImage(encodedImage)));
						ImageIO.write(temp,"jpg",new File("D:\\Shared\\temp4\\balance_Created.jpg"));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				
		return serviceResponse;

	}
	
}