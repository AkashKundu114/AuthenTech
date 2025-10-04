package main.java.com.example.authentech.controller;

import com.example.certverify.service.OCRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ocr")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React dev server
public class OcrController {

    private final OCRService ocrService;

    @Autowired
    public OcrController(OCRService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/scan-keywords")
    public ResponseEntity<?> scanForKeywords(
            @RequestParam("file") MultipartFile file,
            @RequestParam("keywords") String keywords) {
        try {
            var results = ocrService.scanPdfForKeywords(file, keywords);
            return ResponseEntity.ok(results);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during the scan: " + e.getMessage());
        }
    }
}