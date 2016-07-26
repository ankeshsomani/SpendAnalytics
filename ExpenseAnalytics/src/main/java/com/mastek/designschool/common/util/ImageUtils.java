package com.mastek.designschool.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;

public class ImageUtils {

	public static void main(String[] args) {

		String fileName = "D:\\Shared\\temp\\balance2.jpg";

		File file = new File(fileName);

		try {
			// Reading a Image file from file system
			FileInputStream imageInFile = new FileInputStream(file);
			byte imageData[] = new byte[(int) file.length()];
			imageInFile.read(imageData);

			// Converting Image byte array into Base64 String
			String imageDataString = encodeImage(imageData);
			System.out.println(imageDataString);
		
			BufferedImage temp=ImageIO.read(new ByteArrayInputStream(decodeImage(imageDataString)));
			ImageIO.write(temp,"jpg",new File("D:\\Shared\\temp4\\balance_Created.jpg"));
			System.out.println("Encoded Image :" + imageDataString);
			imageInFile.close();

		} catch (IOException iException) {
			iException.printStackTrace();
		}
		
	}

	public static void writeImageFromBase64String(String base64String, String imageType, String tempFile){
		BufferedImage temp;
		try {
			temp = ImageIO.read(new ByteArrayInputStream(ImageUtils.decodeImage(base64String)));
			ImageIO.write(temp,imageType,new File(tempFile));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	
	/**
	 * Encodes the byte array into base64 string
	 *
	 * @param imageByteArray
	 *            - byte array
	 * @return String a {@link java.lang.String}
	 */
	public static String encodeImage(byte[] imageByteArray) {
		return Base64.encodeBase64URLSafeString(imageByteArray);
	}

	/**
	 * Decodes the base64 string into byte array
	 *
	 * @param imageDataString
	 *            - a {@link java.lang.String}
	 * @return byte array
	 */
	public static byte[] decodeImage(String imageDataString) {

		return Base64.decodeBase64(imageDataString.toString());
	}
}