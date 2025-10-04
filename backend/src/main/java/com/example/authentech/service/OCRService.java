package main.java.com.example.authentech.service;

import com.example.certverify.utils.OcrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OCRService {

    private final OcrUtil ocrUtil;

    @Autowired
    public OCRService(OcrUtil ocrUtil) {
        this.ocrUtil = ocrUtil;
    }

    public Map<String, List<Integer>> scanPdfForKeywords(MultipartFile file, String keywords) {
        if (file.isEmpty() || keywords.trim().isEmpty()) {
            throw new IllegalArgumentException("File and keywords cannot be empty.");
        }

        List<String> keywordList = Arrays.stream(keywords.split(","))
                .map(String::trim)
                .filter(k -> !k.isEmpty())
                .collect(Collectors.toList());

        try {
            return ocrUtil.performOcrAndFindKeywords(file.getInputStream(), keywordList);
        } catch (Exception e) {
            
            throw new RuntimeException("Failed to perform OCR scan on the document.", e);
        }
    }
}