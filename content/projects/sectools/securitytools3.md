+++
date = '2024-06-24'
title = 'Security Tool 6: Steghide'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>What is it?</h2>

Steghide is a steganography program that allows data to be hidden in image and audio files. Steganography is the practice of concealing data within various types of files.

<h2>Where did you get if from?</h2>

I installed Steghide on Linux with the command ‘sudo apt-get install steghide -y’. 

<h2>What problem does it solve?</h2>

Cryptography is a practice that is used to encrypt messages to be unreadable to unauthorized users. Unlike cryptography, steganography hides the message’s existence by embedding it within another text, image, audio, or video file. The main difference being that the unreadable data is still present on the cryptography side, while steganography hides the very existence of the message. This is useful for confidential communication, avoiding detection, and digital watermarking which allows the author to copyright information without needing to explicitly modify the media. 

<h2>What data is needed?</h2>

<ul>
<li>Carrier File: the image or audio file you want to conceal the data in</li>
<li>Data File: file containing the data you want to hide in the carrier file</li>
<li>Passphrase: to secure the concealed data and ensure only those with the correct passwords can extract the hidden data</li>
</ul>

<h2>How do you test it?</h2>

Image Files

The first step is to create a text file containing the data you want to hide and having an image file to contain the concealed data. On my end, the carrier file is ‘dog.jpeg’ and the data file is ‘text.txt’. The command used to embed a text file into an image file is ‘steghide embed -cf dog.jpeg -ef text.txt -p passcode’. This is the simplified version, the file destination needs to be included when specifying the carrier and data files.
Otherwise, Steghide will not be able to open the files. The -cf command specifies which file is to be designated as the carrier file, the -ef command specifies which file to be designated as the data file, and the -p command specifies the passphrase used to embed and extract the data. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS7.png></img>

To extract the data, the command needed would be “steghide extract -sf ‘dog.jpeg’ -p passcode -xf ‘textExtracted.txt’. The -sf command specifies the file containing the hidden data and -p specifies the passphrase used to embed the data, which for my case is ‘passcode’. The -xf command extracts the data onto a new file. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS8.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS9.png></img>

Audio Files 

Similar to the last use case, a data file, passphrase, and carrier file are needed, with this time the audio file being the carrier file instead of the image file.

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS10.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS11.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS12.png></img>

