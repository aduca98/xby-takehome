## Overview

Welcome! This project is my crack at creating a product that allows users to create a profile, 
answer questions about themselves, and share their profile with their friends.

Product Specs:
https://docs.google.com/document/d/1X489tP9UUZJ8hncXRbeDZ5BZ6NURqCSoWfTcn99EWFU/edit#heading=h.gxl3ja4odl7w

Walkthrough:
[TODO: insert a loom here]

--------

# Technology:

This stack is typescript across the board. I chose to use React + node.js for a few reasons:

1) I am most familiar with this stack (6 years of professional experience)
2) Quick to write and less context switching (frontend + backend share same language)

I paired this with Clean Architecture, which is a common programming pattern that helps accomplish some of the following:

1) Layered architecture where dependencies are clear and clean 
2) Flexible to change and swapping out layers later bc of loose coupling

Most of my professional experience is with just general CRUD REST APIs, but recently 
I have been using more and more GraphQL, so I chose that for this project. 

GraphQL has loads of benefits like enforcing request + response contracts/datatypes, 
built in field level permissions, built in type generation, and more. 

I chose MongoDB because I similarly have a lot of experience with it, and for this use case 
nosql makes sense and embedding all user information into one document that doesn't need any 
joins works well.

--------

## Things I wish I had time to do

I squeezed this takehome in during the weekend (but had to drive to LA and back so didn't get a ton of time).

If I had more time I would've liked to:
1) Add concept of Use Cases / Application Services that the surfaces use 
2) Write a few jest unit tests for the core functionality
3) Dockerize the server so easier to spin up 
4) More frontend validation
5) Better looking UI 

## Tradeoffs I would make if I had more of a time crunch

Clean code is great, but when you are a small startup you need to prioritize speed before PMF. 
I wrote an implementation that was clean here, but I would purposefully make tradeoffs if I was writing 
this in a time crunch, such as throwing away domain types/mappers, only supporting a single surface (likely express), 
and likely some more. There is overhead to the clean architecture approach and writing code this way, 
much of which isn't worth it until post PMF.

------

# Dependencies

I chose to use Firebase to handle all the authentication. Firebase makes it easy to plugin 
social logins, and also handles all of the JWT signing/verifying/revoking in addition to 
rate limiting logins and a bunch of other goodies.

I'd rather use a tried and tested 3rd party, like Firebase (or auth0 but I don't have experience with it),
than try to roll it myself.

## Dependency Graph 

```
Data   <->  Domain  <-> Surface
(repos)   (services)    (graphql)
```

All services/code use the domain types. The domain types are mapped to data types 
that are persisted, and then back again (only repos ever interact with data types).
This is the same on the surface layer as well, where domain types are mapped to the types 
exposed via a surface (ex. graphql). This keeps all the types separated 
so you can change domain types without breaking surface contract or persisted data type etc... 

--------

# Design

For the design, happy to walk through the code in person but overall there are two discussion areas that I want to elaborate on: 
the db model and the question service.

### DB Model

The data model design really only involves one model: the user. All user profile information 
is stored on the user document, including their Q/A responses. 

I did this because 1) I think embedding their responses as part of their profile makes sense 
and 2) eliminates joins which can get slow. 

If a user could answer unlimited questions (wasn't capped at 3), I would not embed this information on 
the user document (embedding uncapped arrays in docs is an anti-pattern in mongo), but instead 
break it out into a separate collection.

### Question Service

For the question service, I decided to have the client pull the questions from the server for the user to answer. 
This adds latency to the Q/A screen, but also gives us more flexibility to change the questions.

You could imagine adding a mobile application where users could also answer questions from. If we 
hardcoded the questions on the client, we'd have to duplicate that code on both web and mobile versions. 
If we wanted to rephrase the question, add a question, etc... we would similarly have to add and coordinate it in both 
these areas, which sounds easy but I know first hand it is a headache.

Instead, by pulling the questions directly from the server, we can change them at any 
time and keep all clients dumb.

### Denormalized answers

I embedded the full Q/A on the user after they answer them so there is a track record 
of the data at the time the user answers it. This is the same concept behind storing a 
product's name on an order to have a history of the data at the time of the user's action.

--------

## Client

The client is a simple web app with a couple of screens. It uses the following tech:

- React
- Redux
- Apollo Client
- Firebase

--------

## Server

The server is node.js w/ typescript and uses clean architecture to loosely couple dependencies 
and keep the code very modular.

- Express
- Apollo Server
- Firebase
- MongoDB

