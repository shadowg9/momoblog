+++
date = '2022-09-16'
title = 'Car Dealership Web Application'
draft = false
tags = ['projects']
categories = ['updates']
layout = "single"
+++

<section class="container">
    <div class="slider-wrapper">
        <div class="slider">
        <img id="Car1" src="https://image-ms.s3.amazonaws.com/Car1.png"></img>
        <img id="Car2" src="https://image-ms.s3.amazonaws.com/Car2.png"></img>
        <img id="Car3" src="https://image-ms.s3.amazonaws.com/Car3.png"></img>
        <img id="Car4" src="https://image-ms.s3.amazonaws.com/Car4.png"></img>
        <img id="Car5" src="https://image-ms.s3.amazonaws.com/Car5.png"></img>
        <img id="Car6" src="https://image-ms.s3.amazonaws.com/Car6.png"></img>
        </div>
        <div class="slider-caption" id="caption-Car1" style="display: none;"><p>Home Page</p></div>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            function showCaptionForHash() {
                // Hide all captions
                document.querySelectorAll('.slider-caption').forEach(function(el) {
                    el.style.display = 'none';
                });
                // Show the caption for the current hash
                var hash = window.location.hash;
                if (hash && hash.startsWith('#Car')) {
                    var caption = document.getElementById('caption-' + hash.substring(1));
                    if (caption) caption.style.display = 'block';
                }
            }
            window.addEventListener('hashchange', showCaptionForHash);
            showCaptionForHash();
        });
        </script>
        <div class="slider-caption" id="caption-Car2" style="display: none;"><p>Login Page</p></div>
        <div class="slider-caption" id="caption-Car3" style="display: none;"><p>Registration Page</p></div>
        <div class="slider-caption" id="caption-Car4" style="display: none;"><p>Table of Available Cars</p></div>
        <div class="slider-caption" id="caption-Car5" style="display: none;"><p>Users Table + Profile Dropdown</p></div>
        <div class="slider-caption" id="caption-Car6" style="display: none;"><p>Form to Register Vehicle into Table</p></div>
        <div class="slider-nav">
            <a href="#Car1"></a>
            <a href="#Car2"></a>
            <a href="#Car3"></a>
            <a href="#Car4"></a>
            <a href="#Car5"></a>
            <a href="#Car6"></a>
    </div>
</section>

<div class="trait-box" onclick="toggleTrait(this)">
  <div class="trait-header">Project Details</div>
  <div class="trait-content">
   <h4>Purpose of Application</h4>
        <p>During my time in the training program offered by Cognixia USA, we had a Capstone project where the objective was to think up of a practical solution that can be of benefit to people and to demo a prototype of that app. 
        The purpose of this application was to have an online market where people are granted the freedom and accessibility to make fair exchanges as they see fit. And these types of exchanges are meant to bypass the high car dealership fees and contactual obligations.   </p>
        <h4>Benefits</h4>
        <ul>
        <li>Allow users to more easily manage their cost savings by allowing them to buy and sell used cars</li>
        <li> Beneficial as it would give them accessibility and freedom to connect with others and make transactional exchanges with theior used vehicles</li>
        <li>Serves to cirvumvent the high car dealership fees and gives car owners the freedom to make fluid negotiations amongst themselves</li>
        </ul>
        <h4>Description</h4>
        <p>This application was done with a Team I worked alongside with. It was 4 people and divided between frontend and backend. The backend focused on SpringBoot with Eclipse and having the servers and database up on AWS. 
        The Frontend used Visual Studio and was tasked with desigining the webpage and fetching API's to have it be displayed on the webpage. 
        I created and populated the tables with MySQL and the data inputted was the vehicles available on the market and users that registered on the webpage. 
        The Backend used Java to handle all the business logic and used Springboot because it simplified the building process, allowed for dependency injections, and was used to connect to the database.
        We also used Git commands to constantly update our project by making push and pull requests from the repository. Lastly, the server and database was linked to AWS Elastic Beanstalk, while the website was being hosted on an S3 Bucket. </p>
    </div>
</div> 


<script src="/js/custom.js" defer></script>
