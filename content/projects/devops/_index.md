+++
date = "2026-07-07"
title = "AWS DevOps Project with .NET Web Application"
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

Note: Microservices will be implemented later. 

<h2>DevOps Architecture</h2>

Animated Diagram
<img src="https://momomats.s3.us-east-1.amazonaws.com/DevOps.svg"></img>

Note: Some Icons were missing so here is also a static snapshot of the diagram. 
<img src="https://momomats.s3.us-east-1.amazonaws.com/draw.png"></img>

<h3>Keywords</h3>

- IaC: Infrastructure as Code tools allows users to manage to manage infrastructure with configuration files rather than a graphical user interface (GUI). 
- Swagger: suite of tools used to design, build, document, and consume RESTful APIs.
- Bastion Host: entry point to an isolated environment

<h3>Overview of the Diagram</h3>

<h4>Part 1: Web Application</h4>

Creating a E-Commerce Mats web application with working login, registration, cart, and order functionalities that are all stored in the MySQL database. 

<h4>Part 2: Terraform</h4>

Terraform will be used to provision the entire AWS configuration including VPCs, subnets, routing, and the EKS cluster. This will utilize an S3 remote backend for state management. 

<h4>Part 3: AWS Configurations</h4>

SSHing into Bastion Host from terraform directory. The Bastion Host served as a secure gateway. Installing AWS CLI, kubectl client, HELM, and eksctl in the Bastion Host

Installing AWS Load Balancer Controller

Deploying External DNS

<h4>Part 4: Argo CD</h4>

<h4>Part 5: CI/CD Pipeline & Trivy</h4>

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

I tried to make a support case to increase the service quota to 8 vCPUs but my request was rejected. I then tried to make an appeal and will be waiting on their response.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra12.5png></img>

I will most likely have to return to the cloud portion at a later time due to all the AWS service restrictions on my account. 

In the meantime, I will try to push my Docker container image to the GitHub Container Registry (GHCR). 

<h2>Docker Image to GHCR</h2>

<h3>Fixing Connectivity Issue with Docker Container File and MySQL</h3>

Previously, when I was developing the web application, I had to switch running via the Docker Container File to local HTTPS since the Docker container failed when DbInitializer tried to access MySQL. 

Posting MySQL connection in new '.env.docker.local' file
<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker1.png></img>

Adding to .gitignore
<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker2.png></img>

Changing LaunchSettings.json
<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker3.png></img>

Successfully Connected! 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker4.png></img>

<h3>Building Docker Image from Dockerfile</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker5.png></img>

- docker build -t momomats:local .

<h3>Creating GitHub Actions Workflow Directory</h3

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker9.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker11.png></img>

Had to change directory to my project becauser it wasn't opening on the local host.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker12.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/docker14.png></img>

For the same image if I just want to restart it, I just use the command 'docker start' or 'stop momomats-ghcr'.

For a new updated image after I would commit and push new code to origin, I would use these commands: 
- docker stop momomats-ghcr
- docker rm momomats-ghcr
- docker pull ghcr.io/shadowg9/momomats:latest
- docker run -d --name momomats-ghcr -p 8080:8080 --env-file .env.docker.local ghcr.io/shadowg9/momomats:latest


<h2>Resuming Terraform</h2>

My previous request that was cancelled was now appealed and now I can apply the terraform configurations to provision the AWS resources.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra13.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra14.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra15.png></img>

Since I have the available resources, I was able to procvision the AWS infrastructure within 10 minutes. 

<h3>Step 4: Setting Up Terraform Remote Backend</h3>

<h4>Creating bucket using terminal</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra27.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra28.png></img>

<h4>Enabling Versioning and Bucket Encryption</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra29.png></img>

<h4>Adding Backend Block in terraform.tf file</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra30.png></img>

<h4>Initializing the Backend</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra31.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra32.png></img>


<h2>AWS Configurations</h2>

Verifying that all components were built on AWS

EC2 Instances (Bastion Host & Worker Nodes)

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra16.png></img>

EKS Cluster

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra17.png></img>

VPC

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra18.png></img>

NAT Gateway

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra19.png></img>

NACL

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra20.png></img>

<h3>SSH into Bastion Host</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra21.png></img>

Access was denied. I was able to successfully reach the EC2 instance, but Windows marked the permissions for the private key to be too open.  
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra22.png></img>

I ran these commands as it was the documented Windows fic to reset the ACL. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra23.png></img>

Retried SSH Connection | Success
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra24.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra25.png></img>

Sudo apt update
<img src=https://image-ms.s3.us-east-1.amazonaws.com/terra26.png></img>

<h3>Installing AWS CLI, kubectl client, HELM, and & eksctl in Bastion Host</h3>

These four tools will turn the bastion host into an administrative workstation for my AWS and Kubernetes environment. The AWS CLI authenticates to AWS and retrieves EKS connection information, the eksctl creates or manages the EKS cluster and node groups, the kubectl deploys and troubleshoots resources inside the cluster, and the Helm install packaged applications and Kubernetes add-ons. 

<a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">AWS CLI</a>

The AWS Command Line Interface lets you manage AWS services from the terminal and provides commands for services such as EC2, S3, IAM, RDS, and EKS.  

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws2.png></img>

<a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-using-native-package-management" target="_blank">kubectl client</a>

Primary command-line tool for communicating with a Kubernetes cluster through its Kubernetes API. It lets you deploy applications, insepct resources, and manage workloads running inside the cluster. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws3.png></img>

<a href="https://helm.sh/docs/intro/install/" target="_blank">HELM</a>

Package Manager for Kubernetes. Instead of having to manually apply numerous Kuberentes YAML files one by one, Helm will package related Kubernetes resources into a resusable bundle called a chart. The command-line tool can install, upgrade, configure, and remove that application as one managed release. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws5.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws6.png></img>

<a href="https://docs.aws.amazon.com/eks/latest/eksctl/installation.html" target="_blank">eksctl</a>

Command-line utility specially designed to simplifiy the creation and management of Amazon EKS clusters. It can manager clusters, managed node groups, add-ons, IAM-related integrations, and other EKS-specific configurations. 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws8.png></img>

<h4>Importing Kubeconfig File</h4>

AWS Configure to set up access and secret access key
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws9.png></img>

Importing kubeconfig file with this command: 'aws eks update-kubeconfig --region us-east-1 --name momomats-eks-cluster'.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws10.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws11.png></img>

<h3>Installing AWS Load Balancer Controller</h3>

<h4>Creating IAM Role</h4>

Verifying our IAM OIDC Provider
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws12.png></img>

Commands to eliminate the need to run '--profile terraform-momo' for every command.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws13.png></img>

Installing IAM Policy Document for AWS LBC that will allow it to make calls to AWS APIs.Command: 'curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.14.1/docs/install/iam_policy.json'
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws14.png></img>

Creating IAM policy using the policy downloaded in the previous step.
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws15.png></img>

Creating IAM Role
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws16.png></img>

<h4>Installing AWS LBC</h4>

Adding the eks-charts <a href="https://github.com/aws/eks-charts" target="_target">Helm chart repository</a> and Updating Local Repository to ensure the most recent charts are installed
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws17.png></img>

Installing AWS Load Balancer Controller (LBC)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws18.png></img>

Verifying that the Controller is Installed
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws19.png></img>

<h3>Installing Gateway API</h3>

<h4>Installation of Gateway API CRDs</h4>

Installing Gateway Application Protocol Interface Custom Resource Definitions

- Standard Gateway API CRDs (Used for L7 Routes): provides the core Gateway API resources used for gateways and HTTP-based routing.
- Experimental Gateway API CRDs (Optional/Used for L4 Routes): add resources such as TCPRoute, UDPRoute, and TLSRoute, which are needed for Layer 4/NLB routing.
- Installation of LBC Gateway API specific CRDs: provide AWS-specific configuration resources such as TargetGroupConfiguration, LoadBalancerConfiguration, and ListenerRuleConfiguration. 

Without the required CRDs, Kubernetes would not recognize the gaetway resource types, and the controller could not create the corresponding AWS load balancers.  

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws20.png></img>

<h4>Creating Gateway Class</h4>

Cloning Repository inside Bastion Host
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws21.png></img>

Creating YAML Manifests

gateway-class-yaml
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws22.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws23.png></img>

For the other yaml files, I needed the hostname and TLS certificate for the domain, so I tried to make a purchase for the root domain: devopsmomo.link which was $5. But unfortunetly I received another error that prompted me to contact the customer support so I may have to wait a whole day again just like the last time I needed their assitance. This is pretty vexing to deal with at times. 
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws25.png></img>

Luckily, I can continue onwards as this domain is mainly required for the final public DNS and HTTPS layer. 

gateway.yaml (temporary)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws24.png></img>

alb-config.yaml (temporary HTTP-only)
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws26.png></img>

Applying the Temporary Manifests 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws27.png></img>

Verifying Temporary Manifests

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws28.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws29.png></img>

<h2>Deploying ArgoCD</h2>

<h3>Installing Argo CD</h3>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws30.png></img>

<h3>Verifying the Pods and Service Name</h3>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws31.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws32.png></img>

<h3>Applying and Verifying the TargetGroupConfiguration</h3>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws33.png></img>

<h3>Temporary Argo Access</h3>

Since the domain name is pending, I had to disable the HTTPRoute in one of the files which means that the TargetGroupConfiguration will exist, but will not be actively used by an ALB route until the HTTPRoute is enabled which will happen once the support team allows me to purchase the domain name.

<img src=https://image-ms.s3.us-east-1.amazonaws.com/aws34.png></img>

Acquiring Argo CD Password
<img src=https://image-ms.s3.us-east-1.amazonaws.com/argo3.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/argo1.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/argo2.png></img>

<h2>Resuming Domain Issue</h2>

The AWS Customer Support has still not responded back to me after a day, so I purchased a domain name from Namecheap with the name 'devopsmomo.online'. Namecheap will be the registar and Route 53 will become the DNS provider. 

<h3>Creating Public Hosted Zone</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns1.png></img>

<h4>Entering Route 53 nameservers in Namecheap</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns2.png></img>

<h4>Verifying the Delegation</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns3.png></img>

<h3>Requesting the ACM Certificate</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns4.png></img>

<h4>Creating the ACM Validation Records</h4>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns5.png></img>

<h3>Previous Files Fixed</h3>

gateway.yaml
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns6.png></img>

alb-config.yaml; which gets later reapplied with: kubectl apply -f alb-config.yaml
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns7.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns9.png></img>

argocd-values-9.4.0.yaml
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns8.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns10.png></img>

<h4>Creating ArgoCD Domain Record</h4>

<h3>Applying External DNS</h3>

<h4>Creating IAM Policy</h4> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns11.png></img>

Creating policy from the policy document
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns12.png></img>

Verifying EKS Pod Identity Agent Add-on is Present
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns13.png></img>

<h4>Using Pod Identity Agent for External DNS Setup</h4> 

Creating Namespac
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns14.png></img>

Pod Identity Association
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns15.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns16.png></img>

<h4>Deploying ExternalDNS using Pod Identity</h4> 

Adding Repository, Deploying in separate Namespace, and Verifying
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns17.png></img>

Upgrading Install
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns18.png></img>

<h3>Deploying ArgoCD</h3>

Success!
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns19.png></img>

Load Balancer Listeners and Rules
<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns20.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/dns21.png></img>

<h2>GitHub Actions CI Pipeline</h2>



<h1>Microsoft Azure Integration</h1>

<h2>Setting Up</h2>

<h3>Having Account</h3> 

<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure2.png></img>

<h3>Installing the Azure CLI</h3>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure1.png></img>

<h4>Verifying Installation</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure3.png></img>

<h4>Logging in Azure CLI</h4>
<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure4.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure5.png></img>

<h2>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure6.png></img>

<img src=https://image-ms.s3.us-east-1.amazonaws.com/azure7.png></img>

<h2>Project Takeaway</h2>

<h3>Current Progress</h3>

I wanted to learn DevOps using a real application, so I first built MomoMats, which is a full-stack ASP.NET Core application with authentication, user-specific carts, persistent orders, MySQL, and S3-hosted product images.

I then containerized the application with Docker. During that process, I ran into a database networking problem because the application container was trying to reach MySQL through localhost. As a result, I temporarily switched to HTTPS localhost. 

From there, I created a Terraform configuration for an AWS architecture consisting of a VPC, public and private subnets, networking resources, an EKS cluster, managed worker nodes, and a bastion host. The infrastructure provisioning process progressed substantially, but the EC2-backed compute resources were prevented from launching because of account-level vCPU being limited to 1 when I needed 6 and request for service quota increasing to that amount being rejected.

Due to this, I am temporarily unable to progress throughout the DevOps project cause of AWS service quota restrictions and will narrow the scope for now to be Web Application image being pushed to CI/CD without involvement of the cloud. 

My intended CI workflow is for a GitHub push to trigger GitHub Actions, which checks out the source code, builds and tests the application, builds the Docker image, scans it with Trivy, and then publishes the approved image to GitHub Container Registry. From there, the image would be deployed to Kubernetes on EKS, while the application connects to managed services such as RDS for MySQL and S3 for object storage.


<h2>Video Demo</h2>

<h3>Prologue: Visualized Architecture Flow</h3>

Note: No Commentary

<video width="1000" height="800" controls>
  <source src="https://videos-ms.s3.us-east-1.amazonaws.com/DevOps1.mp4" type="video/mp4">
</video>



<h3>Chapter 1: Explaining Architecture Flow</h3>
<h3>Chapter 2: Deep Dive into Code</h3>
<h3>Chapter 3: Traversing the Architecture</h3>
Coming Soon