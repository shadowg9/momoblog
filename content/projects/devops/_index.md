+++
date = "2026-07-07"
title = "AWS DevOps Project with Microservices and .NET Web Application"
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

<h2>DevOps Architecture</h2>

<h3>Keywords</h3>

- IaC: Infrastructure as Code tools allows users to manage to manage infrastructure with configuration files rather than a graphical user interface (GUI). 
- Swagger: suite of tools used to design, build, document, and consume RESTful APIs.

<h1>Developing Web Application</h1>

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

I will develop a small mock application that sells mats to customers. The mats that will be displayed on the webpage will request GET API's to fetch AI generated mats from three different AI agents: OpenAI's ChatGPT, Google's Gemini, and Anthropic's Claude. 

<h3>Adding Existing Folder to GitHub Desktop</h3>



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
