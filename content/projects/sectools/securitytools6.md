+++
date = '2024-07-10'
title = 'Security Tool 9: Stegseek'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>Initial Problem</h2>

On the previous week, I attempted to use a tool called Stegsolve to extract hidden messages embedded with the use of Steghide but was unable to do so as the tool is geared towards visual steganalysis rather than retrieving embedded data. This week I will be using Stegseek to extract that same embedded data.

<h2>What is it?</h2>

Stegseek is a brute-forcing and steghide cracker security tool that can be used to extract hidden data from files. It relies on wordlists to perform dictionary attacks on passphrases used to hide the data. Compared to Stegcracker and Stegbrute, it has the fastest performance when searching through wordlists containing millions of words. 

<h2>What Problems Soes it Solve?</h2>

A useful tool that can be used for security audits, penetration testing, and forensics investigation as it addresses the problem of recovering hidden data from files that used passphrases for encryption. 

<h2>What Data is Needed?</h2>

<ul>
<li>Stego File containing the hidden data that was embedded with Steghide</li>
<li>Wordlist</li>
</ul>


<h2>How do you Test It?</h2>

I tested the security tool on the same images I embedded using Steghide a few weeks ago and was able to recover the hidden messages as the passwords I used were simple and was contained
in the rockyou.txt word file. To install Stegseek, I installed the latest release found on their Github Repository and used the command ‘sudo apt install ./stegseek_0.6-1.deb’. The two main commands that are used for detecting and extracting the hidden contents are ‘stegseek [stegofile] [wordfile]’ and ‘stegseek –seed [stegofile]’. The first command simply attempts all the passwords provided in the specified wordlist against the stegofile, until it finds or doesn’t find a match. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS34.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS35.png></img>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS36.png></img>

If it detects a matching passphrase with the wordfile, then it displays the passphrase it found, the name of the original text file containing the passphrase, and then extracts the hidden message to a new text file.

If it fails to detect a matching passphrase, it returns back with the output, “error: Could not find a valid passphrase.”

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS37.png></img>

But if you happen to know the passphrase but it isn’t available in any of the word lists you find, you can always make a custom wordlist to retrieve the contents of the stegofile.

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS38.png></img>

The second command is used to extract unencrypted data from a steghide file or detect if it is encrypted. 

This command tells us three things: 

1. If the file contains steghide content. 

If it detects that the file has been tampered with and is unencrypted: 

I was unable to create my own file without a passphrase as Steghide requires the user to put in a passphrase when embedding data, but this is what it would look like. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS39.png></img>

If it detects that the file has been tampered with and is encrypted: 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS40.png></img>

If it doesn’t detect that the file has been tampered with:

2. How much hidden content is contained. 

3. How it was encrypted. 

<h2>References</h2>

https://github.com/RickdeJager/stegseek