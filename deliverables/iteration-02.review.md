# Ratatouille / team 23

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration 02 - Review & Retrospect

 * When: March 8th, 2018
 * Where: GB303

## Process - Reflection

(Optional) Short introduction

#### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.


 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Explain why (i.e. give a supporting argument) you consider a decision to be successful.
 * Feel free to refer/link to process artifact(s).
 
  1. The decision that we each share our own ideas about the UI designs and then come to a conclusion about what design we are going to have instead of doing each page separately by each group member is successful because it reduce a lot of time for us to go back and unify the style of the UI.
  
 2. The decision that we decide what tasks to fulfilled and then distribute them across members turns out to be successful because after the initially meeting, we decided to implement views and functions for pages including log in / registration page, dashboard profile for service provider accounts, past order history for client accounts, service search page, message page and account setting page. We then decides to assign each of the above tasks as follows: Log in/ Registration (Helen/Ke Lan), Search Page (Vlad), Profile for clients (Mariko),Profile for service provider(Akanksha),Message page (Emil) and account setting page (Mike/Yu Xuan).
 
 ![Imgur](https://i.imgur.com/JjZu58y.png)
 ![Imgur](https://i.imgur.com/Qye8lwo.jpg)
 ![Imgur](https://i.imgur.com/kJnnRck.jpg)

#### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.

 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Feel free to refer/link to process artifact(s).

We planned to meet in person but due to schedule/ location conflicts this did not happen as often as we would have liked. We were only able to conduct full group meetings over skype and in tutorial. We did not have group coding sessions. Subdivisions of the group met up in person to review code/ go over minor coding details. Bigger idea/ layout issues were delt with in tutorial or over skype when the entirety of the group was present. 

#### Planned changes

List any process-related changes you are planning to make (if there are any)

 * Ordered from most to least important.
 * Explain why you are making a change.

Have shorter regular update meetings rather than longer sparsed update meetings. Due to scheduling conflicts its harder to find time for longer periods, it would be more convenient if it was a 20 minute quick updates and discussion meeting instead. 

## Product - Review

#### Goals and/or tasks that were met/completed:

 * From most to least important.
 * Refer/link to artifact(s) that show that a goal/task was met/completed.
 * If a goal/task was not part of the original iteration plan, please mention it.
 
  Our task is basically divided into doing several different pages for our application, each page are fully implemented with core features.
 1. Registration page (insert screenshot)
 2. Login Page (insert screenshot of login page here)
 3. Account pages
 4. Message board
 5. Search page
 6. Profile pages 

#### Goals and/or tasks that were planned but not met/completed:

 * From most to least important.
 * For each goal/task, explain why it was not met/completed.      
   e.g. Did you change your mind, or did you just not get to it yet?

   For client and service provider, we had to change from uploading an image from device to uploading an image via URL. This was due to space issues related to our databse. 
   
   For the client profile, we had first decided to allow the client to upload photos to their orders. But we then agreed that we wanted the creative side of the app to be strictly for the chefs/bartenders (so they can add pictures for each order in order to have complete control over their portfolio) whereas clients are simply customers that can view their past orders and make new orders. 
   
   For service provider profile, we prioritized linking the profile with searches and implementing upload of pictures and linking it to database. However a certain functionality of deleting the picture has not been implemented yet due to time constraints. However it is possible to edit the description that goes with the picture.

## Meeting Highlights

Going into the next iteration, our main insights are:

 * 2 - 4 items
 * Short (no more than one short paragraph per item)
 * High-level concepts that should guide your work for the next iteration.
 * These concepts should help you decide on where to focus your efforts.
 * Can be related to product and/or process.

 For the client aspect (on the portofolio/past orders tab) of the app, we should implement a way for them to add ratings/ comment. This should make finding their favourite chefs easier as well as giving chefs feedback. Their feedback/ rating would be made known to the chef. We should decide whether we want ratings/comments to be public to other client users. 

 We need a way for chefs to confirm that the order occured after the fact in order to have records of the order in the passed order's (portfolio) tab. Basically the chef would accept or send a signal to the app which would then charge the client and the order would be recorded. 

 In portfolio, when clients look at their past orders, it would be useful to link the chef's name to their portfolio. This would make it simpler for the user to connect to the chef rather than find out the name and then search it in the search tab.
 
 Move away from Expo so that we can have access to a larger database and then be able to upload images from device rather than input a URL. 
