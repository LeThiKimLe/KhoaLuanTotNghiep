package com.example.QuanLyNhaXe.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagesService {
	private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
	private String URL="https://vexe.workon.space/api";
    public String saveImage(MultipartFile image) throws IOException {
        System.out.println(CURRENT_FOLDER);
    	String imageUrl="";
    	if(image.isEmpty())
        	return imageUrl;
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }

        String uniqueFilename = generateFileName(image);
        Path file = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(uniqueFilename);

        if (Files.exists(file)) {
            imageUrl = "/images/" + uniqueFilename;
            return imageUrl;
        }

        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        } catch (IOException e) {
            System.out.print(e.getMessage());
        }

        imageUrl = URL+"/images/" + uniqueFilename;
        return imageUrl;
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

}
