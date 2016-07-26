package com.mastek.designschool.common.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Component;

import com.mastek.designschool.common.constants.OCRConstants;
import com.mastek.designschool.common.dto.AccountTransaction;
import com.mastek.designschool.common.dto.BankStatement;
import com.mastek.designschool.common.dto.Coordinates;


@Component
public class OCRService {

	
	public static String output[][]= new String[OCRConstants.ACC_TRANS_ROWS][OCRConstants.ACC_TRANS_FIELDS];
	public static BufferedImage originalImage =null;
	public BankStatement getBankStatementFromImage(String url) {
		BankStatement bankStatement=new BankStatement();
		try {			
			originalImage = ImageIO.read(new File(url));
			
			List<AccountTransaction> transactions= new ArrayList<AccountTransaction>();	
			cropAndExtractCustomerInfo(bankStatement);
			for(int l=0; l<OCRConstants.ACC_TRANS_FIELDS;l++){				
				Coordinates cordinates=new Coordinates(OCRConstants.ACC_TRANS_X[l], OCRConstants.ACC_TRANS_Y[l], OCRConstants.ACC_TRANS_WIDTH[l], OCRConstants.ACC_TRANS_HEIGHT[l]);
				cropAndExtractText(cordinates,l);
				
			}
			constructOutputObject(transactions);
			bankStatement.setTransactions(transactions);
			System.out.println(bankStatement);
		
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bankStatement;
	}
	private static void cropAndExtractCustomerInfo(BankStatement bankStatement) throws IOException {
		BufferedImage croppedImages= originalImage.getSubimage(OCRConstants.CUST_ID_CORDS[0],OCRConstants.CUST_ID_CORDS[1],OCRConstants.CUST_ID_CORDS[2],OCRConstants.CUST_ID_CORDS[3]);
		File outputfile = new File(OCRConstants.TEMP_FILE_PATH+"customerid.jpg");
		ImageIO.write(croppedImages, "jpg", outputfile);
		String result=TesseractEngine.readImage(outputfile);
		bankStatement.setCustomerId(result.trim());
	}

	private static void constructOutputObject(List<AccountTransaction> transactions) {
		for(int x=0; x< OCRConstants.ACC_TRANS_ROWS;x++){
			AccountTransaction transaction=new AccountTransaction();
			transaction.setTransactionDate(output[x][0].trim());
			transaction.setDescription(output[x][1].trim());
			transaction.setTransactionType(output[x][2].trim());
			transaction.setPaidIn(output[x][3].trim());
			transaction.setPaidOut(output[x][4].trim());
		//	transaction.setBalance(output[x][5].trim());
			transactions.add(transaction);
		}	
	}
	private static void cropAndExtractText(Coordinates cordinates,int fieldId) throws IOException {
	    BufferedImage croppedImages[]= new BufferedImage[OCRConstants.ACC_TRANS_ROWS];
		for(int q=0; q<OCRConstants.ACC_TRANS_ROWS;q++){
			croppedImages[q]= originalImage.getSubimage(cordinates.getX(),cordinates.getY()[q],cordinates.getWidth(),cordinates.getHeight());
		}
		for(int a =0; a< OCRConstants.ACC_TRANS_ROWS ; a++){			
			File outputfile = new File(OCRConstants.TEMP_FILE_PATH+OCRConstants.SLASH+OCRConstants.ACC_TRANS_FIELDNAMES[fieldId]+a+".jpg");
			ImageIO.write(croppedImages[a], "jpg", outputfile);
			String result=TesseractEngine.readImage(outputfile);
			output[a][fieldId]=result;	
		}	
	}

}
