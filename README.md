[![Netlify Status](https://api.netlify.com/api/v1/badges/865c79c9-9ba0-4937-82cc-2db4d8a88950/deploy-status)](https://app.netlify.com/sites/infallible-nightingale-3ea7b7/deploys)

## Overview

### tl;dr

This project is my crack at creating a product that allows users to create a profile,
answer questions about themselves, and share their profile with their friends. It uses typescript,
node.js, graphql, and react to accomplish this, and is hosted on render.com (backend) and netlify (frontend).

#### Video Walkthrough:

https://www.loom.com/share/f76de464c17249dab7e2321e75fd5024

#### Project Link:

https://xby-take-home.netlify.app/

#### Product Specs:

https://docs.google.com/document/d/1X489tP9UUZJ8hncXRbeDZ5BZ6NURqCSoWfTcn99EWFU/edit#heading=h.gxl3ja4odl7w

---

# How to run locally

### Client:

```
cd ./client
npm install
npm run start
```

### Server:

```
cd ./server
npm install
npm run start:dev
```

### GraphQL:

You need to generate the graphql types (it writes them to both the client)
and the server.

```
cd ./server
npm run graphql:codegen
```

You will also need to add a .env file with credentials following the env
template files.

# Technology:

This stack is typescript across the board. I chose to use React + node.js for a few reasons:

1. I am most familiar with this stack (6 years of professional experience)
2. Quick to write and less context switching (frontend + backend share same language)

I paired this with Clean Architecture, which is a common programming pattern that helps accomplish some of the following:

1. Layered architecture where dependencies are clear and clean
2. Flexible to change and swapping out layers later bc of loose coupling

Most of my professional experience is with just general CRUD REST APIs, but recently
I have been using more and more GraphQL, so I chose that for this project.

GraphQL has loads of benefits like enforcing request + response contracts/datatypes,
built in field level permissions, built in type generation, and more.

I chose MongoDB because I similarly have a lot of experience with it, and for this use case
nosql makes sense and embedding all user information into one document that doesn't need any
joins works well.

On the frontend I used react + redux + apollo client. Good combination of tools that get the job done,
and I paired them with tailwindcss so I didn't have to spend as much time styling.

---

# Design

### Data Modeling

The data model design really only involves one model: the user. All user profile information
is stored on the user document, including their Q/A responses.

I did this because 1) I think embedding their responses as part of their profile makes sense
and 2) eliminates joins which can get slow.

If a user could answer unlimited questions (wasn't capped at 3), I would not embed this information on
the user document (embedding uncapped arrays in docs is an anti-pattern in mongo), but instead
break it out into a separate collection / table if I was to use postgres.

### Dynamic Question Service

For the question service, I decided to have the client pull the questions from the server for the user to answer.
This adds latency to the Q/A screen, but also gives us more flexibility to change the questions.

You could imagine adding a mobile application where users could also answer questions from. If we
hardcoded the questions on the client, we'd have to duplicate that code on both web and mobile versions.
If we wanted to rephrase the question, add a question, etc... we would similarly have to add and coordinate it in both
these areas, which sounds easy but I know first hand it is a headache.

Instead, by pulling the questions directly from the server, we can change them at any
time and keep all clients dumb.

### Denormalized Answers

I embedded the full Q/A on the user after they answer them so there is a track record
of the data at the time the user answers it. This is the same concept behind storing a
product's name on an order to have a history of the data at the time of the user's action.

---

## Things I wish I had time to do

In no particular order:

1. Add concept of Use Cases / Application Services that the surfaces use
2. Write a few jest unit tests for the core functionality
3. Dockerize the server so easier to spin up
4. Better frontend validation/error handling for forms
5. More unique UI (used a library for all of the styles so kind of generic)
6. Lock down hosted mongo. Don't have username + password for mongo the only protection is that it is the same VPC
7. Better server and client error handling (throwing, surfacing, etc...)
8. Ability to update account information after sign up
9. Support google auth for mobile (cannot use firebase popups)

---

# 3rd Party Dependencies

### Firebase Auth + Storage

I chose to use Firebase to handle all the authentication. Firebase makes it easy to plugin
social logins, and also handles all of the JWT signing/verifying/revoking in addition to
rate limiting logins and a bunch of other goodies.

I'd rather use a tried and tested 3rd party, like Firebase (or auth0 but I don't have experience with it),
than try to roll it myself.

Profile pictures are stored in firebase storage because it is easiest and I could do it clientside. I might be
included to just use google storage on the backend if I had more time but this was easiest.

### Tailwindcss

Free styles that look pretty good. Muddies the react a bit (bc it is css class based), but worth the
tradeoff IMO given the speed at which can make UI.

### Deployment

The frontend is deployed on Netlify (netlify.com), and the backend on Render (render.com). This way no
devops work for me (yay).

---

## Dependency Graph

```
Data   <->  Domain  <->  Surface
(repos)   (services)    (graphql)
```

All services/code use the domain types. The domain types are mapped to data types
that are persisted, and then back again (only repos ever interact with data types).
This is the same on the surface layer as well, where domain types are mapped to the types
exposed via a surface (ex. graphql). This keeps all the types separated
so you can change domain types without breaking surface contract or persisted data type etc...

If I wanted to code quicker I would probably throw out a lot of the mapping and just keep a domain type
that the model layer and the presentation (surface) layer uses. But I had some time so migth as well
decouple them.

---

## Client

The client is a simple web app with a couple of screens. It uses the following tech:

- React
- Redux
- Apollo Client
- Firebase
- Tailwindcss

Hosted on Netlify.

---

## Server

The server is node.js w/ typescript and uses clean architecture to loosely couple dependencies
and keep the code very modular.

- Express
- Apollo Server
- Firebase
- MongoDB
- GCP (storage)

Hosted on render.com.
