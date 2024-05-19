package com.example.QuanLyNhaXe.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagesService {
	private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
	private String URL="https://vexe.workon.space/api";
    public String saveImage(MultipartFile image) throws IOException {
    
    	String imageUrl="";
    	if(image.isEmpty())
        	return imageUrl;
        Path rootPath = Paths.get("app", "src", "main", "resources");
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(rootPath).resolve(staticPath).resolve(imagePath));
        }

        String uniqueFilename = generateFileName(image);
        Path file = CURRENT_FOLDER.resolve(rootPath).resolve(staticPath).resolve(imagePath).resolve(uniqueFilename);
        //list all file current folder
        try (Stream<Path> paths = Files.list(CURRENT_FOLDER.resolve(rootPath).resolve(staticPath).resolve(imagePath))) {
            paths.forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (Files.exists(file)) {
            imageUrl = "/static/images/" + uniqueFilename;
            return imageUrl;
        }

        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        } catch (IOException e) {
            System.out.print(e.getMessage());
        }

        imageUrl = URL+"/static/images/" + uniqueFilename;
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
