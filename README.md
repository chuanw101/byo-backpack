# byo-backpack
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

## Description
User can view public upcoming events without logging in, can search by city/state. <br>
User can sign up, user name = under 15 characters, alphanumeric only, password must be at least 8 chars. <br>
Once logged in, profile will have notification if there is any unresponded invites, this turns off upon going to profile (until next log in, sessions last 1 hour). <br>
Once logged in, you can change pw / create events / update your own events / rsvp for public events and private events you are invited to. <br>
Events have default picture, default time is 2 hour after current time, once start/end time is selected, the other will be auto set so that end time is always after start time. <br>
Event time ignores time zones, assumes you are entering for time zone of the event, when site filters out past events, it uses the default -7PDT time zone if user isn't logged in, pulls users time zone to session if logged in. <br>
Can edit/invite/delete events from either profile or from event details page (if logged in and is creator) <br>
RSVP is possible for all users for public events, private events can only be viewed/rsvp'd if invited by creator. <br>
You can only click to bring item for event if your RSVP status is set to attending, if it changes to something else, auto takes you off the table from bringing items. <br>

## Table of Contents 
    
  - [Contribute](#contribute)
  - [User Story](#user-story)
  - [Deployed link](#deployed-link)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Consept](#concept)
  - [Test](#test)
  - [ERD](#erd)

## Contribute
*   Lola Applegate
*   Chuan Wang
*   Jeff Hicks
*   Saghar Behinaein
  
## User Story
AS a user, 
I WANT an application that lets me post events, RSVP to others, invite others and sign up to bring supplies,
SO THAT I can connect with my community, meet new people, and try new things.

## Deployed link
[Deployed Link](https://byo-backpack.herokuapp.com/)
  
## Installation
Here are some guidelines to help you get started:

1. Clone the project in your laptop  
2. Make sure you installed Node on your visual studio 
3. Run the `npm install` comand in your terminal
4.  inside it should have:
    * DB_USER=root
    * DB_PASSWORD= what ever your password is for root user
    * DB_NAME= byo_backpac_db
    * SESSION_SECRET = super secret 
5.  start the terminal from index.js
6.  run the `npm run resetdb` in terminal
7.  run the `npm run seeds` in terminal
8.  run the `npm start` in terminal

Or just go to deployed site, no need for install   

## Concept
A Collaborative Event Management System
* Create an account & login
* Create new events
* Update events
* Invite other users to your events
* See events created by other users
* RSVP & sign up to bring items
* Search for events in your city

## Test
 
you can see diffrent pages in the Byo-Backpack:   
* Login Page: 

![login](./public/images/d1.png)

* Home Page: 

![login](./public/images/d2.png)

* Profile Page: 

![login](./public/images/d3.png)

* Create an Event Page: 

![login](./public/images/d4.png)

* Home Page for mobile: 

![login](./public/images/m1.png)

* profile Page for mobile: 

![login](./public/images/m2.png)

* Create an Event Page for mobile: 

![login](./public/images/m3.png)

## ERD
![ERD](./public/images/BYOB_erd.png)



