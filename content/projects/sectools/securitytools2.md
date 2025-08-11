+++
date = '2024-06-16'
title = 'Security Tool 5: SQLMap'
draft = false
tags = ['projects']
categories = ['updates']
+++

<h2>What is it?</h2>

SQLMap is a python-based penetration testing tool that automates the detecting and exploiting process of potential SQL injection vulnerabilities found in web applications. It is also open source and able to take over database servers. Some of the different types of automated SQL injections attacks that can be deployed include error based, time delay, stacked queries, Boolean based, and union based attacks. 

<h2>Where did you get it from?</h2>

Found it in my collection of security tools provided by Kali Linux and it was located in the Database Assessment category. To get it manually, you can install it from this GitHub Repository: https://github.com/sqlmapproject/sqlmap. 

<h2>What Problems Does it Solve?</h2>

It is able to solve several critical problems related to web application security such as identifying SQL injection flaws that can be exploited to gain unauthorized access, retrieving database information such as tables and columns using data enumeration commands, and simplifying penetration testing thanks to its automated SQL injection attacks that alleviates unnecessary time and effort that could have taken place with manual testing.

<h2>What Data is Needed?</h2>

SQL Injection Attack
<ul>
<li>Target URL</li>
<li>Request Parameters (ex: GET, POST)</li>
</ul>

<h2>How do you Test It?</h2>

SQL Injection Attack Web Application <span style="color: green;"><i>Success</i></span>

Part 1: Installing Docker & Setting up DVWA

The first step was to install Docker so I could set up a Damn Vulnerable Web Application (DVWA). This web application provides a legal environment for web developers and security
professionals to understand and learn about web application security. The command used to install Docker was ‘sudo apt install -y docker.io’ and to enable it was ‘sudo systemctl enable docker –now’. The command to run the DVWA container was ‘sudo docker run --rm -it -p 8080:80 vulnerables/web-dvwa’. Once the web application was set up, the next step was to login and create a database. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS4.png></img>

Part 2: Testing SQL Injection attacks on DVWA

In order to test this web application, the URL was needed and the desired parameters to input at the end of the URL. There are various options to choose from with regards to exploiting the application’s vulnerabilities. For this case, I clicked on ‘SQL Injection’ where it contained a prompt asking for a User ID. Typing in a random number and clicking submit in the input field changes the URL which lets us know that it is a GET response. This can be verified by checking the Network in the dev tools and seeing that it is using the GET method. The target URL and itsparameter need to be passed in the terminal with the ‘sqlmap -u “[insert target url]”’ command, but before doing that, the request cookies are needed, otherwise it will get a 302 redirect. Since the endpoint can only be accessed with a login, sqlmap needs the cookies information in order for it to properly authenticate its commands. In the network section of the devtools, the row with the target url and parameter contains the Session ID for the request cookie. 

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS5.png></img>

Having the session id, the command is reused, except it includes the cookie details. The command would be inputted as ‘sqlmap -u “[insert target url]” --cookie=“PHPSESSID=[insert session id]; security=low”’. Now that the cookie is passed, the sqlmap security tool will know how to authenticate against the DVWA. In addition to this command, the ‘--tables' will be added,
which is an enumeration option that will fetch the database tables.

<image src=https://image-ms.s3.us-east-1.amazonaws.com/LinuxSS6.png></img>

Password Cracking <span style="color: green;"><i>Success</i></span>

Another thing that can done with sqlmap is password cracking and this is done by enumerating the columns with the command: ‘sqlmap -u “[insert target url]” --cookie=“PHPSESSID=[insert session id]; security=low” --columns -T users --batch'. The ‘-T users’ part specifies which table to database to enumerate and --batch is used to bypass the few yes/no prompts it asks and goes with the default options. By enumerating the columns of the users table, we can verify that there is indeed a password’s column. The next command is to use the ‘--dump -T users –batch’ which dumps the data contained in the user’s table and launches a dictionary-based attack against hashes that are located in the database. It goes off of a wordlist text file that is included with Kali Linux and contains the option to include custom dictionary files as well. 

<h2>References</h2>

https://github.com/sqlmapproject/sqlmap

https://youtu.be/nVj8MUKkzQk?si=X3P2yZb26Raodsgo

https://www.cs.toronto.edu/~arnold/427/15s/csc427/tools/sqlmap/index.html