+++
date = "2026-07-07"
title = "AWS DevOps Project with Microservices and .NET Web Application"
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

<h2>DevOps Architecture</h2>

Animated Diagram
<img src="https://momomats.s3.us-east-1.amazonaws.com/DevOps.svg"></img>

Note: Some Icons were missing so here is also a static snapshot of the diagram. 
<img src="https://momomats.s3.us-east-1.amazonaws.com/draw.png"></img>

<h3>Keywords</h3>

- IaC: Infrastructure as Code tools allows users to manage to manage infrastructure with configuration files rather than a graphical user interface (GUI). 
- Swagger: suite of tools used to design, build, document, and consume RESTful APIs.

<h1>Developing Web Application</h1>

Note: I will not document this section too much since the bulk of this project is DevOps focused, but I will return with a more comprehensive overview of this section showcasing my code and how everything works together. 

<h2>Running Default Packages</h2>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app1.png></img>

I am not able to run the project running inside the Docker container. Based on what the information available online, it seems that the container is indeed available, but /swagger is either not enabled or located there.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app2.png></img>

I tried adding it in the program.cs file, but I need to get the Swagger package by installing Swashbuckle.AspNetCore in Visual Studio. This can be found by browsing NuGet Packages by right clicking your project name below the solution on the solutions explorer window or manually in the terminal. I will be using the GUI manager to install the Swashbuckle.AspNetCore  package. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app3.png></img>

After installing it, I added the 'builder.Services.AddSwaggerGen();' above the 'var app = builder.Build();'. 

Success!
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app4.png></img>

<h2>Developing Quick Mock Webpage for Selling Mats</h2>

I will develop a small mock application that sells mats to customers. The mats that will be displayed on the webpage ~~will request GET API's to fetch AI generated mats from two different AI agents: OpenAI's ChatGPT and Google's Gemini ~~. Edit: will feature AI generated images from OpenAI's ChatGPT and Google's Gemini. 

Edit: Late into this web application, I decided to just use pre-rendered AI generated images from OpenAI/s ChatGPT, since there was a hard billing limit that prevented me from using the APIs
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app37.png></img>

<h3>Adding Existing Folder to GitHub Desktop</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/git1.png></img>

<h3>Setting up Database</h3>

On NuGet Manager, I added the packages: MySql.EntityFrameworkCore, Microsoft.AspNetCore.Identity.EntityFrameworkCore, Microsoft.EntityFrameworkCore.Design, and Microsoft.EntityFrameworkCore.Tools. 

Created Database on MySQL
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app5.png></img>

For security purposes, will be using user secrets to store my MySQL password.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app6.png></img>

Generating First EF Core Migration to MySQL Database
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app7.png></img>

After applying the command: "Update-Database -Context MomoMatsDbContext" in the Package Manager Console, the tables successfully loaded in the MySQL Workbench.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app8.png></img>

<h4>Mats Controller Database Integration</h4>

I converted the MatsController from using a temporary in-memory DemoStore to retrieving mat data through Entity Framework Core and MomoMatsDbContext. To populate the application, I created a database initializer that seeds ten mat records into MySQL—five assigned to the OpenAI collection and five assigned to the Gemini collection—while preventing duplicate records during future application startups. I then verified the integration by querying the Mats table in MySQL Workbench and confirming that all ten records were successfully stored. During testing, I also identified and resolved a Docker networking issue: the application container could not reach MySQL through 127.0.0.1 because localhost referred to the container itself. I temporarily ran the application using the local HTTPS development profile, allowing the application to connect successfully to the locally hosted MySQL server and complete the initial database seeding process.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app9.png></img>

Before I continue onwards to convert the other two controllers in my project which are the CartController and OrdersController, I will setup user authentication.  

<h3>Authentication</h3>

<h4>Testing User Registration on Swagger</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app10.png></img>

Email Validaiton

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app11.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app12.png></img>

Password Validation

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app14.png></img>

New Data Record Added on MySQL Workbench with Password Hash working
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app15.png></img>

Testing Login with Cookies

Faulty Login
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app16.png></img>

Logging in with registered credentials
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app17.png></img>

Getting Information of Logged in User
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app18.png></img>

Logging Out
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app19.png></img>

Clicking on /api/auth/me again after logging out
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app20.png></img>

<h3>Adding the Register, Login, and Logout UI to the Home Page</h3>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app21.png></img>

Registration UI
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app22.png></img>

Login UI 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app23.png></img>

Confirming Header Changes into Signed In State
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app24.png></img>

Confirming New User Appeards in MySQL Database 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app25.png></img>

The session was confirmed to persist too after I refreshed the page. 

Logging in with user created on Swagger
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app26.png></img>

<h3>Cart Test</h3>

Adding in Orders with Momo User
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app27.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app28.png></img>

The items have remained in the cart after refreshing the page. 

Placing Order
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app29.png></img>

Logged Out and No Order
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app30.png></img>

Logged Back in Same Account and Order Persists
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app31.png></img>

Logged Back with different Account which has different orders
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app32.png></img>

<h3>Stylized Frontend</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app33.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app34.png></img>


<img src=https://image-ms.s3.us-east-1.amazonaws.com/app35.png></img>


<img src=https://image-ms.s3.us-east-1.amazonaws.com/app36.png></img>

<h3>S3 Buckets and CloudFront to Store and Retrieve AI-generated Mats</h3> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app39.png></img>


<img src=https://image-ms.s3.us-east-1.amazonaws.com/app40.png></img>

Was going to user CloudFront to Retrieve the AI-generated Mats stored as objects in the S3 Buckets, but my aws account would not allow me to create the distribution since I am apprently unverified, so I will need to check in about that later/ In the meantime, I will just rely on S3 buckets. 

Temporary Public Access until I can get Verified
<img src=https://image-ms.s3.us-east-1.amazonaws.com/app41.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app42.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/app43.png></img>


<h1>DevOps Portion</h1>

<h2>Terraform</h2>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terraformlogo.png></img>

<h3>Introduction</h3>

Terraform is an open-source Infrastructure as Code (IaC) tool used to provision and manage on-premises, cloud, and Software-as-a-Service (SaaS) Infrastructure though configuration files written in HashiCorp Configuration Language (HCL). 

<h3>Step 1: <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank"> Install AWS CLI</a></h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/cli1.png></img>

Confirming the installation
<img src=https://image-ms.s3.us-east-1.amazonaws.com/cli2.png></img>

<h3>Step 2: Install <a hreg="https://developer.hashicorp.com/terraform" target="_blank">Terraform</a></h3>

I am downloading Terraform using the Chocolalatey command-line package manager on my Windows 11 PC. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra1.png></img>

<h3>Creating AWS User for Security Keys and to Authenticate Terraform with AWS</h3>

It is not best practice to acquire security credentials from the root user due to critical compromise of the AWS account if an unauthrized individual were to gain access. So I will get get these security credentials with an account named terraform-momo'. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra2.png></img>

Giving the user access to all services.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra3.png></img>

Creating Access Key
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra5.png></img>

Configuring on CLI
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra6.png></img>

Verifying the AWS CLI commands works on Powershell
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra7.png></img>

<h3>Step 3: Running Terraform</h3>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra10.png></img>

Commands I used:
- terrafirn version: shows the installed version of Terraform
- terraform fmt -recursive: automatically rewrites Terraform configuration files to a standard HCL layout 
- terraform init: initializes the working directory with provider plugins and backend configuration
- terraform validate: validates configuration files for syntax errors
- terraform plan: shows what actions Terraform will take without applying them
- terraform apply: applies changes to reach the desired infrastructyre state 
- terraform destroy: removes infrastructure defined in the configuration files 

After running 'terraform apply', it took 33 minutes building before it ran an error of account quote limits.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra11.png></img>

I will clean up the partial deployment first with 'terraform destroy'.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra12.png></img>

Took 10 minutes to destroy 69 resources. 

Next step is to fix the vCPU quota

Verifying that all components were built on AWS 

<h3>Step 4: Setting Up Terraform Remote Backend</h3>




<h2>Project Takeaway</h2>

<h2>Video Demo</h2>

Chapter 1: Explaining Architecture Flow 
Chapter 2: Deep Dive into Code
Chapter 3: Traversing the Architr
Coming Soon