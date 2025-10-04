package com.example.authentech.service;

import com.example.authentech.utils.OcrUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class OcrService {

    public String extractText(MultipartFile file) {
        return OcrUtil.performOCR(file);
    }
}
