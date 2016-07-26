package com.mastek.designschool.common.constants;

public class OCRConstants {
/*	
 public static int ACC_TRANS_ROWS=9;
    public static int ACC_TRANS_FIELDS=6;
    public static int ACC_TRANS_Y[][]={{1120,1202,1298,1380,1468,1562,1650,1740,1832},
                    {1120,1202,1298,1380,1468,1562,1650,1740,1832},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810},
                    {1090,1180,1262,1350,1440,1530,1620,1710,1800}};
    public static int ACC_TRANS_X[]={40,350,1280,1650,1910,2190};
    public static int ACC_TRANS_WIDTH[]={220,910,200,220,220,210};
    
    public static String ACC_TRANS_FIELDNAMES[]={"date","description","type","paidin","paidout","balance"};   
    public static int ACC_TRANS_HEIGHT[]={70,72,52,50,50,50};
    public static int CUST_ID_CORDS[]={1023, 580, 400, 50};*/
    public static int ACC_TRANS_ROWS=9;
    public static int ACC_TRANS_FIELDS=5;
    public static int ACC_TRANS_Y[][]={{1120,1202,1298,1380,1468,1562,1650,1740,1832},
                    {1120,1202,1298,1380,1468,1562,1650,1740,1832},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810},
                    {1100,1190,1272,1360,1450,1540,1630,1720,1810}};
    public static int ACC_TRANS_X[]={40,350,1280,1650,1910};
    public static int ACC_TRANS_WIDTH[]={220,910,200,220,220};
    
    public static String ACC_TRANS_FIELDNAMES[]={"date","description","type","paidin","paidout"};   
    public static int ACC_TRANS_HEIGHT[]={70,72,52,50,50};
    public static int CUST_ID_CORDS[]={1023, 580, 400, 50};

   
    //WINDOWS DEPLOYMENT
    //COMMENT BELOW WHEN RUN ON UNIX SERVER
//    public static String TEMP_FILE_PATH= "D:\\Shared\\temp2";
//    public static String TESSERACT_PATH="D:\\workspace\\spendanalytics\\tessdata";
//    public static final String SLASH = "\\";
 
    
    //UNIX Deployment
    //COMMENT BELOW WHEN RUN ON LOCAL WINDOWS
    public static String TEMP_FILE_PATH= "/usr/local/spendanalytics/ocrimages";
    public static String TESSERACT_PATH="/usr/share/tesseract-ocr/tessdata";    
    public static final String SLASH = "/";
    



}
