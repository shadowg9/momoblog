+++
date = "2026-06-21"
title = "Cybersecurity Homelab"
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

Welcome to my VMware Homelab documentation. Below you’ll find instructions on how to complete the given objectives in regards to how I was able to create my own personal Homelab and how you can too if you follow the steps I posted. 

<h2>Introduction</h2> 

I will create a Windows-native simulated enterprise environment that builds softare for consumers. This will be a mock organization named ProjectMomo that is looking to eventually grow its SOC and TDR capabilities, building a dedicated Security Analysis Lab, and simulating various cyber-attacks. 

<h3>Why Simulate a Business Network?</h3>

A core objective of this project is to simulate a realistic business network environment where my technical skills can be cultivated and applied in a virtual setting that mirrors a real-world enterprise infrastructure. 

In building and securing a simulated organizational network, I will have gained practical cybersecurity skills and hands-on experience with SIEM platforms, vulnerability scanners, packet analyzers, and network monitoring solutions, 

Doing this lab will also generate opportunities for me to practice incident response by investigating and mitigating simulated threats inlcuding, but not limited to, suspicious network activity, unauthorized access attempts, and malware infections. 

In addition in further developing my technical prowess, this project will serve to demonstrate my ability to design, implement, monitor, and secure a business network. This will allow me to showcase practical cybersecurity competencies to potential employers and put an emphasis on my ongoing curiosity in continuing to accrue knowledge within the tech sector.

<h3>Network Architecture Diagram</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/CSHomelab.png></img>

<h2>Building an Enterprise Network</h2>

<h3>Creating Active Directory Server</h3> 

I will be creating a dedicated Microsoft Active Directory Domain Controller Server. An Active Directory server is developed by Microsoft that manages and organizes resources in a network. It acts as a centralized database to authenticate and authorize users and devices. The key components include authentication where user identity is verified using credentials, authorization where network resources are granted or denied access based on permissions, and centralized management where control over users, computers, and other resources are centralized. 

<h4>Step 1: Creating DC Server VM</h4> 

Choose Microsoft Windows guest operating system and Windows Server 2022 for VMware.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step2.png></img> 

For this virtual machine, use the iso file: Windows Server 2025.iso. It can be found <a href="https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025" target="_blank">here</a>. It is imperative to ensure that the 'Connected' and 'Connect at power on' boxes are checked underneath the Device Status group so the virtual machine can boot without issues. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step3.png></img>

<h4>Step 2: Setting Up DC VM</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step4.png></img>

Select Windows Server 2025 Standard Evaluation (Desktop Experience) to have the GUI installed.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step6.png></img>

Created 3 different Partitions to organize and separate date. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step7.png></img>

The Server Manager Dashboard once I loaded in the DC VM. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step8.png></img>

<h4>Step 3: Optional Tweaks</h4> 

Since the default timer for the Windows Server 2025 to sign out is 10 minutes, I toggled the screen timeout to 'Never' as it can become intrusive and inconvenient for my workflow when going back back and forth between VMs. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step9.png></img>

Another vexxing issue is the need to click 'Ctrl+Alt+Delete' every time before you login the VM. This would not be too much of an issue except the fact that it would prompt a menu to shut down your local machine rather than unlocking the VM. Despite, VMware graciously having a button to bypass the overlapping key commands, it is still more convenient to just disable the bottleneck altogether. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step10Part1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step10Part2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step10Part3.png></img>

<h4>Step 4: Assigining Static IP Addresses</h4>  

Select 'Change adaper settings'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step11Part1.png></img>

Once selected, a pop-up window will display computer icon named 'Ethernet'. Right click this icon and select 'Properties'. Select 'Internet Protocol Version 4 (TCP/IPv4)' and select 'Properties'. This is where we can set the virtual device to a static IP address.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step11Part2.png></img>

I set my IP address to '192.178.217.5', my Subnet mask to '255.255.255.0' and my Default gateway to '192.168.217.2'. I could not have done '192.168.217.1' since VMware NAT usually uses .2 as the NAT gateway, while .1 is the host VMnet8 adapter.  
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step11Part3.png></img>

<h4>Step 5: Promoting Active Directory to a Domain Controller</h4>  

Select 'Add Roles and features' below 'Configure this local server.'
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part3.png></img>

Just making sure the IP addresses are correct. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part7.png></img>

Entered a root domain name, corp.project-momo-dc.com that will be the name assigned to the domain controller.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step12Part8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step13.png></img>

<h4>Step 6: Setup DNS for Internet Access</h4> 

During the feature installation process, once of the components that was selected was 'DNS'. This is so the Domain Controller handles DNS requests for all connected devices. 

Right click the server in DNS on Server Manager and click 'DNS Manager'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step14.png></img>

Right click the domain and select 'Properties', then go to the 'Forwarders' tab. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step14Part2.png></img>

Click the 'Edit' buttons to add in Google's DNS server address (8.8.8.8) which will allows us to use the internet. What is basically happening if that all DNS requests are being forwarded to Google, which thens routes to the proper web server.  
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step14Part3.png></img>

Testing out the ping command to google's domain to make sure it replies back. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step14Part4.png></img>

Using nslookup on my DC name to ensure the IP address is mapped properly.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step14Part5.png></img>

<h4>Step 7: Setting up DHCP</h4> 

DHCP allows the DC to assign IP addresses to connected workstations, servers, and other networking devices. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15.png></img>

After going to 'DHCP Manager', navigate to 'IPv4' and select 'New Scope'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part2.png></img>

For my scope name, I went with 'project-momo-scope'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part3.png></img>

Reserved 100 IP Address space for the scope distribution. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step15Part7.png></img>

<h4>Step 8: Adding User Accounts in Active Directory</h4> 

To add users, go to 'Tools' in top right of Server Manager Dashboard and select 'Active Directory Users and Computers'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16.png></img>

Right Click Users > New > User.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16Part2.png></img>

Added in users for John Doe and Jane Doe for Windows and Ubuntu Virtual Machines respectively. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16Part3.png></img>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16Part5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16Part4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step16Part6.png></img>

Will return back to adding in other workstations as I progress through the Homelab. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step17.png></img>

Snapshot to preserve configurations.

Note: I actually had to use it not too long after because I decided to apply the security updates on my Windows 2025 server and it locked me out of my own account. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Step18.png></img>

<h3>Provisioning and Setting up Windows 11 Enterprise</h3>

<h4>Setting up Windows VM</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win1.png></img>

Iso file can be found <a href="https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise" target="_blank">here</a>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win4.png></img>

<h3>Adding Windows 11 Machine to Active Directory Domain</h3>

<h4>Setting up Static IP Address</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win6.png></img>

Connected Windows Workstation to DC IP Address (Preferred DNS Server) 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win7.png></img>

<h4>Changing Workgroup Name</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win12.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win13.png></img>

<h4>Snapshot</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Win14.png></img>

<h3>Provisioning and Setting up Ubuntu Desktop</h3>

<h4>Setting up Ubuntu</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux4.png></img>

<h4>Optional Tweaks</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux8.png></img>

<h4>Pinging</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux9.png></img>

<h4>Snapshot</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux10.png></img>

<h3>Adding Ubuntu Linux Machine to Active Directory Domain</h3>

<h3>Provisioning and Setting up CORP-SVR</h3>

<h3>Setting up MailHog</h3>

<h3>Provisioning and Setting up Security Onion</h3>

<h3>Provisioning and Setting up Ubuntu's Security Server</h3>

<h3>Setting up Wazuh</h3>

<h2>Creating a Vulnerable Environment & Detections</h2>

<h3>Setting up Detections & Alerts</h3>

<h2>Cyber Attack - Initial Access to Breached</h2>

<h3>Provision Attacker Machine (Kali Linux)</h3>

<h3>Reconnaissance - Initil Access</h3>

<h3>Lateral Movement - Privilege Escalation</h3>

<h3>Data Exfiltration - Persistence</h3>

<h2>Catching the Attacker</h2>

<h3>Investigation & Defense</h3>

<h2>Project Takeaway</h2> 