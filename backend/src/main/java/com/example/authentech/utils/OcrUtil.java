package com.example.authentech.utils;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OcrUtil {

    private final String tesseractDataPath;

    public OcrUtil(@Value("${tesseract.datapath}") String tesseractDataPath) {
        this.tesseractDataPath = tesseractDataPath;
    }

    public Map<String, List<Integer>> performOcrAndFindKeywords(InputStream pdfInputStream, List<String> keywords) throws IOException, TesseractException {
        Map<String, List<Integer>> results = new HashMap<>();

        try (PDDocument document = PDDocument.load(pdfInputStream)) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath(tesseractDataPath);
            tesseract.setLanguage("eng");

            for (int pageNum = 0; pageNum < document.getNumberOfPages(); pageNum++) {
                // Render page to an image at 300 DPI for high quality
                BufferedImage image = pdfRenderer.renderImageWithDPI(pageNum, 300);

                // Extract text from the image
                String pageText = tesseract.doOCR(image).toLowerCase();

                // Check for each keyword
                for (String keyword : keywords) {
                    if (pageText.contains(keyword.toLowerCase())) {
                        results.computeIfAbsent(keyword, k -> new ArrayList<>()).add(pageNum + 1);
                    }
                }
            }
        }
        return results;
    }
}