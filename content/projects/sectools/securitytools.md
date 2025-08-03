+++
date = '2024-06-10'
title = 'Security Tool 1: DNSChef'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>What is it?</h2>

DNSChef is a DNS proxy server that intercepts DNS queries and is developed in Python. It is
used for analyzing malware and penetration testing and is a valuable tool for users as it allows
them to filter DNS queries, redirect traffic, and poison DNS servers. DNSChef also allows users
to create custom DNS responses based off a set of configured rules which can be utilized to
simulate attacks to test the effectiveness of other security tools. 

<h2>Where did you get if from?</h2>

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS1.png></img>

It was located in my Kali Linux, where it has a collection of different security tools. DNSChef
was located in the Sniffing & Spoofing category. To get it on Windows, you can install it from
this GitHub Repository: https://github.com/iphelix/dnschef. 

<h2>What problem does it solve?</h2>

This security tool can be used for a variety of different use cases such as bypassing network
restrictions, spoofing DNS attacks, and redirecting malware DNS queries to a safe environment
for further analysis. 

<h2>What data is needed?</h2>

DNS Spoofing Attack
<ul>
<li>Domain Name of Webpage</li>
<li>IP Address of Machine with DNSChef</li>
</ul>

<h2>How do you test it?</h2>

DNS Spoofing Attack <span style="color: green;"><i>Success</i></span>

I used Kali Linux VM (KVM) and Windows 10 VM (WVM) to test out DNS spoofing. I decided
to choose http://www.example.com as my target site. In KVM, I opened up DNSChef and ran
the command, ‘dnschef --fakedomains=example.com --fakeip=192.168.217.133 --
interface=192.168.217.133’. This command configures DNSChef to spoof DNS responses for
the example.com domain and return the IP address 192.168.217.133 (KVM’s IPv4) each time the
domain is requested. While this was running, I opened my WVM and configured my adapter
options by going into the Ethernet’s properties and having the TCP/IPv4 use the KVM’s IP
address as its preferred DNS server. The reason this was done was to ensure that all DNS queries
was sent from the WVM to DNSChef and to simulate the spoofing event to understand how it
would look in the terminal. 

Before (Windows VM)

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS2.png></img>

After (Windows VM)

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS3.png></img>

<h2>References</h2>

https://github.com/iphelix/dnschef

https://medium.com/@STarXT/dnschef-a-comprehensive-guide-to-network-security-testing-and-monitoring-362c153953f0

https://hellfire0x01.medium.com/get-familiar-with-dns-hijacking-2215a0a318d4
