package com.example.authentech.utils;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class OcrUtil {

    public static String performOCR(MultipartFile file) {
        try {
            File tempFile = File.createTempFile("ocr-", file.getOriginalFilename());
            file.transferTo(tempFile);

            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("tessdata"); // Folder path where tessdata is placed
            tesseract.setLanguage("eng");

            String text = tesseract.doOCR(tempFile);
            tempFile.delete();
            return text;
        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
