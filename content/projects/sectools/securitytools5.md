+++
date = '2024-07-08'
title = 'Security Tool 8: Stegsolve'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>What is it?</h2>

Stegsolve is a Java-based graphical tool designed to perform steganalysis. This particular tool detects and extracts hidden contents from image files through visual analysis and manipulation. Unlike steganography, steganalysis is the art of detecting hidden data within various types of digital media. 

<h2>What Problems does it Solve?</h2>

Stegsolve aids users in identifying if an image file contains hidden information and using various techniques to manipulate and visualize data in order to extract the hidden contents visually embedded within the image. The keyword is “visually” as it is important to note that this security tool is primarily used for visual steganalysis rather than extracting actual embedded data that can’t be extracted visually. 

<h2>What Data is Needed?</h2>

<ul>
<li>Image file suspected of containing hidden information</li>
<li>Familiarity with steganography tools and techniques </li>
</ul>

<h2>How do you Test It?</h2>

Installation 

At first, I used the command ‘sudo apt-get install stegsolve’ but it was unable to locate the stegsolve package. I used the wget command to retrieve a jar file of stegsolve from a webpage and moved it to a new directory I made named Bin. The link I used can be found in the GitHub repo I linked under references, but it is not a good idea to install on host machine since it was marked as unsafe by Google.  

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS27.png></img> 

Using Tool on CTF Images 

The command to run the stegsolve jar file is ‘java -jar stegsolve.jar’. It opens up a GUI where I am given the option to open up any image file, I wish to perform a visual steganalysis on. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS28.png></img> 

I am able to navigate through different planes and filters that allows me to observe changes and irregularities in the image files. If the hidden message was hidden via LSB steganography, then I would navigate to LSB analysis mode and for color plane analysis, I would inspect the different RGB channels.

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS29.png></img> 

There are also different tools used for analyzing and extracting data. The file format option provides information about the file format, data extract is used to observe the bytes of the image, stereogram solver helps visualize hidden patterns by changing the offset until the image becomes visible, frame browser allows users to browser through different frames of a GIF, and image combiner combines multiple images into one. I experimented with images containing hidden flags and found them by navigating through the RGB channels.

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS31.png></img> 
<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS32.png></img> 

Decoding Steghide? 

A previous tool I used to implement steganography techniques to embed data within image files was Steghide. Now I will attempt to use Stegsolve to detect and extract the same images containing the hidden data. I was not able to find the passphrase or hidden message embedded, but I have identified signs that the image has been manipulated with the image combiner tool. When combining the image with itself or a copy, it shows up as normal with nothing that stands
out. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS33.png></img>

But when I merge the channels with the normal image and manipulated image, it displays blots of color which indicates that one of the images have been tampered with. In an actual forensics investigation, this would allow me to use other steganography tools geared towards password cracking which will further my objectives in uncovering the secret information. 

A zoom in will be required to see the differences clearly. One thing to notice is that the second image is using a
different bitwise operator. I did this to show the color contrast more clearly. When the image combiner merges two
copies of the unmodified dog image, the color contrast is not present, it is identical to the first dog image with the
AND operator. 

<h2>References</h2>

https://github.com/zardus/ctf-tools/blob/master/stegsolve/install

https://github.com/zer00d4y/stegsolve

https://gr4n173.github.io/virsecctf_steganograhy/