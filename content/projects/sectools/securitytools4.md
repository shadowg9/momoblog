+++
date = '2024-07-01'
title = 'Security Tool 7: Exiftool'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>What is it?</h2>

Exiftool is a command-line application and platform-independent Perl library used for reading, writing, and editing metadata from a variety of different file formats. 

<h2>What Problems Does it Solve?</h2>

Exiftool is reliable in managing metadata in files and can be used to verify and sanitize the file’s metadata. This ensures that the metadata is free of malicious code or vulnerable data. This security tool can also be used to remove sensitive information by stripping certain data contents from files. Some metadata contain sensitive information such as user data or even GPS coordinates and can pose privacy risks. This security tool is especially crucial in the field of digital forensics to determine the origin of the media file and uncover concealed data that could be of relevance to an investigation. 

<h2>What Data is Needed?</h2>

<ul>
<li>Image or Audio or Video files containing metadata</li>
<li>Knowledge of structure and standards of metadata</li>
</ul>

<h2>How do you Test It?</h2>

<u>Basic Metadata Extraction</u>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS13.png></img>

To retrieve the image’s metadata with its fields and corresponding field information, you enter the command “exiftool [image file]”. 

<u>Metadata Extraction via Apple</u>

I took a photo of my mouse on my phone and uploaded it on a Kali Linux virtual machine. Using the exiftool command, it displayed my GPS position, Lens ID, Camera Model Name, Focal Length, and other details regarding the camera’s properties. 

<u>Editing Metadata Contents </u>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS14.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS15.png></img>

<u>Removing Metadata</u>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS16.png></img>

Using the ‘-all=’ command strips all standard metadata fields from an image. From the original, this command shaved off 19 field rows. Despite removing all metadata, there is still some
information present and these are the default fields based on the image content itself. It remains even if the metadata has been stripped. Using this command also creates a backup file in case the user wants to review the original metadata.

<u>Extracting Hidden Messages via Exiftool</u>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS17.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS18.png></img>

<u>Extracting Hidden Messages from Files Modified with Steghide</u> <span style="color: red;"><i>Failure</i></span>

A previously security tool used was Steghide which embeds hidden data onto image files. The goal is to extract the hidden message using Exiftool. Unfortunately, Exiftool is not well equipped to sift through steganographic data, but can still be used to see identify changes over time.
Despite not being able to assess the hidden contents, I noticed a change in the file size of a difference of about 2 kilobytes. 

Before

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS19.png></img>

After

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS20.png></img>

Geotagging

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS21.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS22.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS23.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS26.png></img> 

Geotagging is the process whereby geographical identification metadata is added to various media. This is useful for documenting or tracking down locations the photos or videos were
taken.

<h2>References</h2>

https://exiftool.org/

