package com.example.demo.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.example.demo.model.Information;
import com.example.demo.repository.InformationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DefaultInformationService implements InformationService {
  private final InformationRepository informationRepository;
  private final ServerProperties serverProperties;
  private final String fileDir;

  public DefaultInformationService(InformationRepository informationRepository, ServerProperties serverProperties, @Value("${spring.servlet.multipart.location}") String fileDir) {
    this.informationRepository = informationRepository;
    this.serverProperties = serverProperties;
    this.fileDir = fileDir;
  }

  @Override
  public List<Information> getAllInformations() {
    return informationRepository.findAll();
  }

  @Override
  public Information createInformation(MultipartFile files) throws IOException, ImageProcessingException {
    String origName = files.getOriginalFilename();
    String uuid = UUID.randomUUID().toString();
    String extension = origName.substring(origName.lastIndexOf("."));
    String savedName = uuid + extension;
    String protocol = serverProperties.getSsl() != null ? "https" : "http";
    String savedPath = protocol + "://" + serverProperties.getAddress().getHostName() + ":" + serverProperties.getPort() + "/img/" + savedName;

    files.transferTo(new File(savedName));

    double latitude = 0;    //위도
    double longitude = 0;    //경도

    File file = new File(fileDir + savedName);
    Metadata metadata = ImageMetadataReader.readMetadata(file);
    GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

    if(gpsDirectory != null) {
      GeoLocation geoLocation = gpsDirectory.getGeoLocation();

      if (geoLocation != null) {
        latitude = geoLocation.getLatitude();
        longitude = geoLocation.getLongitude();
      } else {
        System.out.println("이 사진에서는 geoLocation를 찾을 수 없습니다.");
      }
    } else {
      System.out.println("이 사진에서는 gpsDirectory를 찾을 수 없습니다.");
    }

    var information = new Information(origName, uuid, extension, savedName, savedPath, latitude, longitude);
    return informationRepository.insert(information);
  }

  @Override
  public Optional<Information> getInformationById(String uuid) {
    return informationRepository.findById(uuid);
  }

}