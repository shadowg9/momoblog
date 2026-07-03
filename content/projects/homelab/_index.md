+++
date = "2026-06-21"
title = "Cybersecurity Homelab"
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

Welcome to my VMware Homelab documentation. Below you’ll find instructions on how to complete the given objectives in regards to how I was able to create my own personal Homelab and how you can too if you follow the steps I posted. 

Acronyms Defined
- SOC: Securtiy Operations Center, centralized unit where a cybersecurity group exists to manage potential security incidents and are generally set up in a series of tiers. Tier 1 Alert Analysts, monitors alerts and if needed escalates after analysis; Tier 2 Incident Responders, performs investigations and remediations; Tier 3 Subject Matter Experts, typically few in number, handle the tough cases. 
- TDR: Threat Detection and Response;
- XDR: Endpoint Detections
- SIEM:  
- IOC:

<h2>Introduction</h2> 

I will create a Windows-native simulated enterprise environment that builds softare for consumers. This will be a mock organization named ProjectMomo that is looking to eventually grow its SOC and TDR capabilities, building a dedicated Security Analysis Lab, and simulating various cyber-attacks. 

<h3>Why Simulate a Business Network?</h3>

A core objective of this project is to simulate a realistic business network environment where my technical skills can be cultivated and applied in a virtual setting that mirrors a real-world enterprise infrastructure. 

In building and securing a simulated organizational network, I will have gained practical cybersecurity skills and hands-on experience with SIEM platforms, vulnerability scanners, packet analyzers, and network monitoring solutions. 

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

Iso file can be found <a href="https://releases.ubuntu.com/jammy/" target="_blank">here</a>

<h4>Setting up Ubuntu</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux3.png></img>

Since this is a lab environment, I set it to login automatically to save time. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux5.png></img>

<h4>Optional Tweaks</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux6.png></img>

Changing the ianctivity period from 5 minutes to Never for the sake of convenience when alternating between different virutal machines. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux7.png></img>

<h4>Assigning Static IP address</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux8.png></img>

<h4>Ensuring the Linux Desktop can reach the Windows Server Domain Controller</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux9.png></img>

<h4>Snapshot</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Linux10.png></img>

<h3>Adding Ubuntu Linux Machine to Active Directory Domain</h3>

<h4>SSSD & Realmd</h4>

Since Ubuntu and other Linux-native operating systems in general are not native to the Microsoft ecosystem, there are alternative ways to connect Ubuntu to Active Directory with Realmd and SSSD (System Security Services Daemon).

SSSD is a service on Linux systems that provides a central access point for identity management and authentication. It serves as an intermediary between the Linux system and Active Directory and allows for integration. 

Realmd is a tool that simplifies the process of connecting Linux machines to Active Directory domains by automating the discovery, configuration, and enrollment of Linux systems in Active Directories. This is especially useful for administrators as it manages the complexities of setting up Kerberos, configuring LDAP settings, and enduring proper authentication protocols. 

Something to note is that these third party softwares does not work with Ubuntu 22.04 or Windows Server 2025 (it does work with Windows Server 2022). 

<h4>Samba Winbind</h4>

An alternative method is using Samba Winbind which is a component of the Samba suite that allows Linux systems to authenticate users against AD and integrates it with Windows network environments. 

It is necessary to install third-party libraries or packages in order to connect Linux to a Microsoft Active Directory Ecosystem. This is due to Linux not being native to Microsoft.

<h4>Step 1: Updating System with 'sudo apt update'</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba1.png></img>

<h4>Step 2: Installing the Necessary Dependencies/Packages</h4>

sudo apt -y install winbind libpam-winbind libnss-winbind krb5-config samba-dsdb-modules samba-vfs-modules
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba2.png></img>

Configuring Kerberos Authentication, added 'CORP.PROJECT-MOMO-DC.COM' in all dialogue boxes. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba5.png></img>

<h4>Moving 'smb.conf' file to 'smb.conf.org'</h4>

This is done to replace the contents of 'smb.conf' with our configurations instead. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba6.png></img>

<h4>Replacing Realm and Workgroup</h4>

Creating and opening the 'smb.conf' file with Nano.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba7.png></img> 

Replacing realm and workgroup with the following: 
     [global]
       kerberos method = secrets and keytab
       realm = CORP.PROJECT-MOMO-DC.COM
       workgroup = CORP
       security = ads
       template shell = /bin/bash
       winbind enum groups = Yes
       winbind enum users = Yes
       winbind separator = +
       idmap config * : rangesize = 1000000
       idmap config * : range = 1000000-19999999
       idmap config * : backend = autorid
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba8.png></img> 

Confirming 'passwd' and 'group' blocks have 'winbind' set as value. 

sudo nano /etc/nsswitch.conf
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba9.png></img> 

<h4>Setting Home Directory</h4>

sudo pam-auth-update then navigate down to 'Create home directory on login' and select it with spacebar. Then click 'Enter' to accept changes.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba10.png></img> 

<h4>Changing DNS settings to refer to AD</h4>

sudo nano /etc/resolv.conf
Add new nameserver above default one for the Domain Controller.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba11.png></img> 

<h4>Joining the domain with Administrator</h4>

Note: Ensure Domain Controller Virtual Machine is on and running. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba12.png></img> 

Restart winbind with 'systemctl restart winbind'
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba13.png></img> 

Get Active Directory services information listing.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba14.png></img> 

List all available users
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba15.png></img> 

Logging in as Janed
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba16.png></img> 

Issuing an id command to view status
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba17.png></img> 

<h4>Verifying that Linux Client has been Connected</h4>

I return back to the Domain Controller virtual machine and go to tools on the Server Manager Dashboard to select 'Active Directory Users and Computers'. Upcon clicking on the Computers folder, I can see the Linux and Windows client which indicates that I have connected the workstations to the Active Directory which is a success! 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba18.png></img> 

<h4>Updated Snapshot</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Samba19.png></img>

<h3>Provisioning and Setting up CORP-SVR</h3>

<h4>Creating CORP-SVR</h4>

A dedicated server will be provisioned and created to act as a Jumpbox, which is also referred to as bastion host. These servers acts as an entry-point into an isolated environment and can be used as a security mechanism to restrict access to the internal environment. Without access to the Jumpbox, other services such as DNS, FTP, and email will be inaccessible which means we will not be able to manage, upgrade, or interact with these services. This is intentional by design since the purpose is to restrict access from unauthorized users and minimizing the attack surface. 

For these internal "servers", I will be using containers since additional virtual machines will require more dedicated storage, computer, memory, and other resources. 

Containers are isolated environments that package applications with all its dependencies such as binaries, libraries, and configuration files. They are similar to virtual machines except they run on one operating system, which for my case will be Ubuntu 22.04 CORP-SVR. 

Clone existing Ubuntu Linux VM
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr3.png></img>

<h4>Change Static IP Address</h4>

Everything stayed the same and just changed the IP Address to 192.168.217.108. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr4.png></img>

<h4>Change VM Hostname</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr7.png></img>

<h4>Create New Server Account</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr12.png></img>

<h4>Adding CORP-SVR to Active Directory</h4>

Pinging Domain Controller
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr13.png></img>

Connecting CORP-SVR to AD DC DNS Server
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr14.png></img>

Verifying that CORP-SVR has been Connected
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr15.png></img>

<h4>Create New Home Directory Folder</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr16.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr17.png></img>

<h4>Installing Docker Engine by using the apt repository</h4>

Enter URL: https://docs.docker.com/engine/install/ubuntu/

Set up Docker's apt respository
'# Add Docker's official GPG key:'
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

'# Add the repository to Apt sources:'
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

Install the Docker packages
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

Verifying that Docker is running after installation. 
sudo systemctl status docker
If not running, start it manually with this command: sudo systemctl start docker

Verify that the installation is successful by running the hello-world image: sudo systemctl start docker


<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr18.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr19.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr20.png></img>

<h4>Snapshot</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr21.png></img>

<h3>Setting up MailHog</h3>

MailHog acts as a fake SMTP server which captures all outgoing emails without actually delvering them to real inboxes. This is an ideal tool for simulating corporate email infrastructure, testing phishing or email-based attacks, debugging applications that can send emails, and avoiding spam filters or external mail services. I will be using MailHog to simulate a business email server which will be used for the phishing exercise. The tool also provides an official docker image ready to use from Docker Hub, which is why we will be using Docker for this homelab. This is the first of many Docker containers that I will be running where will be dedicated to server a different purpose. 

<h4>Creating Mailhog Directory</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog1.png></img>

<h4>Creating Docker Compose File</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog2.png></img>

This will host the configuration file for MailHog.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog3.png></img>

<h4>Running Image File</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog5.png></img>

<h4>Creating Test Email</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog7.png></img>

Ensuring Python Script has executable permissions.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog8.png></img>

Having Message Pop up in MailHog's UI
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog12.png></img>

<h4>Creating An Email Poller Script</h4>

Going back to Linux Client Machine, I will simulate an email polling service that will allow me to get new email notifications in the linux client and reporting outgoing emails in the MailHog user interface hosted on the Docker image file withint the Corp-Server virtual machine. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog14.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog15.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog16.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog17.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog18.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog19.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Hog20.png></img>

<h3>Provisioning and Setting up Security Onion</h3>

Iso file can be found <a href="https://securityonionsolutions.com/software" target="_blank">here</a>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion8.png></img>

<h4>Accept Default DNS Servers.</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion12.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion14.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion15.png></img>

<h4>Setting Root Password</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion16.png></img>

<h4>Snapshot</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Onion17.png></img>

<h3>Provisioning and Setting up Ubuntu's Security Server</h3>

Why exactly provision a whole new dedicated security server when we already created the coporate security server? This is so we can prevent performance degradation, minimize the attack surface by isolating critical processes, and having this new security server simplifies monitoring and management. This provides a single point for handling logs, alerts, and vulnerability data which reduces administrative overhead. 

Clone existing Ubuntu Linux VM
<img src=https://image-ms.s3.us-east-1.amazonaws.com/svr1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/uls1.png></img>

<h4>Change Host Name</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs3.png></img>

Reboot machine
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs5.png></img>

<h4>Change Account</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs6.png></img>

Apply sudo privileges to this new sec-user account so commands can be run at the root level.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs8.png></img>

Verifying that I can run sudo command with this new sec-user.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs9.png></img>

<h4>Connect to Active Directory</h4>

Assign Static IP Address
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs10.png></img>

Veriyfing that I can ping the DC's dns server.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs11.png></img>

Creating New User Account in Active Directory
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs12.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs14.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs15.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs16.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs17.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs18.png></img>

Clearing winbind cache by restarting the service & Connecting Ubuntu Security Server to Active Directory Domain Controller Server. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs19.png></img>

Viewing New Account
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs20.png></img>

Creating new home directory. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs21.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs22.png></img>

Veriyfing that new user is in corp domain.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs23.png></img>

Veriyfing that new workstation is in corp domain.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs25.png></img>

<h4>Connect to Active Directory</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/ufs23.png></img>

<h3>Setting up Wazuh</h3>

Wazuh is an open-source platform that provides XDR and SIEM to protect server, container, and cloud workloads. It includes many capabilities such as log data analytics, intrustion and malware detection, file integrity monitoring, configuration assessment, vulnerability detection, and regulatory compliance support. 

The three main components that make up the Wazuh ecosystem was the Wazuh Indexer, Wazuh Server, and Wazuh Dashboard. The Wazuh Indexer is a higher scalable, full-text search and analytics engine. It also indexes data logs and stores alerts generated by the Wazuh server. The Wazuh Server analyzes data received from agents. The server processes the data through decoders and rules. It uses threat intelligence to locate common IOCs. The server is also used to configure and upgrade the agents remotely. The Wazuh Dashboard is the web user interface for data visualization and analysis. It includes dashboards for threat hunting, regulatory compliance, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others. It is also used to manage Wazuh configuration and to monitor its status.

Wazuh will be used as the central hub for security logging, analysis, defense, and remediation whenever I conduct the simulated cyber attacks and defenses. Wazuh provides a strong foundation for gathering relevant data while applying remediations. I will be able to actively view and visualize what happens when threat actors successfully achieve initial access, lateral movement, elevation of privileges, persistence, and exfiltration. 

<h4>VM Configurations</h4>

Increasing CPU from 1 to 2
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz1.png></img>

Increasing RAM from 2048 MB to 4096 MB for Wazuh
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz2.png></img>

<h4>Setting up Wazuh Indexer + Server</h4>

Signing into sec-user@linux-server
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz3.png></img>

Installing cURL (I already had it installed, but this is for those who wants to follow along and build their own Homelab)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz4.png></img>

Starting Wazuh Installation Wizard (note: the -i ignores minimum system requirements)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz6.png></img>

Username and Password to access the web interface
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz7.png></img>

Storing Login information in text file
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz8.png></img>

Accessing Wazuh Dashboard by entering localhost in the search bar (Note: the browser will mark it as not secure, but it is okay; just click advanced and proceed to website)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz9.png></img>

Logging into Wazuh Dashboard
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz10.png></img>

Wazuh Dashboard
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz12.png></img>


<h4>Deploying Wazuh Agents</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz14.png></img>

<h4>Deploying Wazuh Agent for Windows 11 Virtual Machine</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz15.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz16.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz17.png></img>

Using Domain Controller login to open Powershell with administrator privileges. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz18.png></img>

Copying command to PowerShell in the Windows virtual machine
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz19.png></img>

Before the agent was successfully connected, I had troubleshooting problems where I had to increase the RAM and total storage of the virtual machine for Wazuh to start properly.  
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz20.png></img>

Snapshot
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz21.png></img>

<h4>Deploying Wazuh Agent for Ubuntu Linux Client Virtual Machine</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz22.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz23.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz24.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz25.png></img>

Snapshot
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz26.png></img>

<h4>Deploying Wazuh Agent for Domain Controller Virtual Machine</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz27.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz28.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz29.png></img>

<h4>Adding Agents into Groups</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz30.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz31.png></img>

<h4>Onboarding Custom Configuration Log Files</h4>

Wazuh already offers default logs that are automatically ingested into the Wazuh Indexer, but based on the upcoming Cyber Attack/Defend scenario, the types of logs collected will be expanded so both the Linux and Windows agents gather a more comprehensive dataset of log activity. 

The empty agent.conf files will be editied to include these configuration statemenets. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz32.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz33.png></img>

Data is now being properly logged
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz34.png></img>

Snapshot
<img src=https://image-ms.s3.us-east-1.amazonaws.com/Waz35.png></img>

<h2>Creating a Vulnerable Environment & Detections</h2>

<h3>Setting up Detections & Alerts</h3>

<h4>Creating Detection Alerts</h4>

An alert for failed SSH attempts will be created. A monitor will be set up to analyze logs. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det2.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det5.png></img>

WinRM Logon Alert 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det8.png></img>

Editing agent.conf file for Windos Group

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det9.png></img>

<h4>Restarting Wazuh</h4>

Ubuntu Linux Server
<img src=https://image-ms.s3.us-east-1.amazonaws.com/det10.png></img>

Domain Controller
<img src=https://image-ms.s3.us-east-1.amazonaws.com/det11.png></img>

<h4>File Integrity Monitoring Dashboard</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det12.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det13.png></img>

<h4>Sensitive File Detection Alert</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det14.png></img>

Restart Manager so changes can take effect
<img src=https://image-ms.s3.us-east-1.amazonaws.com/det15.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det16.png></img>

Create File Access Monitoring Alert
<img src=https://image-ms.s3.us-east-1.amazonaws.com/det17.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det18.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det19.png></img>

<h4>Snapshot</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/det20.png></img>

<h2>Cyber Attack - Initial Access to Breached</h2>

I will be simulating an end-to-end cyber-attack on the ProjectMomo's business network. The end goal will be to capture sensitive files and achieve persistence inside the busniess network, so we can extort out information, as well as log back in the ProjectMomo network at our discretion.

<h3>Provision Attacker Machine (Kali Linux)</h3>

<h3>Reconnaissance - Initil Access</h3>

<h3>Lateral Movement - Privilege Escalation</h3>

<h3>Data Exfiltration - Persistence</h3>

<h2>Catching the Attacker</h2>

<h3>Investigation & Defense</h3>

<h2>Project Takeaway</h2> 

<h3>Updated Network Architecture Diagram</h3>