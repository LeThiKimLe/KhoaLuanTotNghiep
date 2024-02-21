package com.example.QuanLyNhaXe.service;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;

import com.amazonaws.services.s3.AmazonS3;




@Service
public class S3Service {


    private final AmazonS3 amazonS3;
    private final String bucketName;
    private final String endpointUrl="https://bookingupfile.s3.amazonaws.com/";
    
 
    public S3Service(AmazonS3 amazonS3, @Value("${aws.s3.bucketName}") String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
       
    }

    public void deleteFile(String key) {
        amazonS3.deleteObject(bucketName, key);
    }
    
    public String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }
    
    public File convertMultiPartFileToFile(MultipartFile file) throws IOException {
    	
        File convertedFile = new File(file.getOriginalFilename());       
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }
    
    
    public String uploadFile(MultipartFile multipartFile) {

        String fileUrl = "";
        if(multipartFile.isEmpty())
        	return fileUrl;
        try {
            File file = convertMultiPartFileToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endpointUrl + "Image/" + fileName;
            amazonS3.putObject(bucketName, "Image/"+fileName, file);
            file.delete();
        } catch (Exception e) {
        	System.out.println("Lỗi IO khi chuyển đổi hoặc không truyền tập tin vào" );
        }
        return fileUrl;
    }



    public S3Object downloadFile(String key) {
        return amazonS3.getObject(bucketName, "Image/"+key);
    }
}
