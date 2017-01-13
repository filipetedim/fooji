# Fooji TODO API Exercise
### Details
Based on the exercise requested [here](https://gist.github.com/williamcoates/47d6a28039810babd62c43bfc9f0afbc).
The API was created with NodeJS. It has been uploaded into a Digital Ocean droplet using NodeJS v6.9.1, which can be accessed by using the following ip: `138.68.156.4`.
It is currently using mlab as NoSQL database (MongoDB). 
All of the exercise was coded in ECMAScript 6.

### How-to use
The database has been emptied and in order to use the API, a user must be created through the `/users/register` endpoint. 
A user token is required for everything involving the items (TODO items), and it can be obtained from `/users` endpoint, intentionally left open and unprotected for the sake of getting the token, for the exercise.

You can now create, remove, update or delete any items, but you only have access to your own items.
That access is granted through the token, so to test the security, just use another token from another user.

Important: The items have two properties, `listGroup` default to undefined and must be a number, and `done` default to false and must be a boolean. They are to be used to create lists of items by using the same list number on each item, and to be checked as finished or not, respectively. It is a To-do exercise after all, and things need to be done.

## Available endpoints
* [/users (GET)](#users)
* [/users/register (POST)](#users-register)
* [/items (GET)](#items)
* [/items (POST)](#items-post)
* [/items/:id (GET)](#items-id-get)
* [/items/:id (PUT)](#items-id-put)
* [/items/:id (DELETE)](#items-id-delete)

## users
`/users (GET)`

Returns all the users and their information.

## users register
`/users/register (POST)`

Creates a user and gives it a token.
Cannot create if the email already exists or any required fields are missing.

Requires the fields:
* email
* name
* password

## items
`/items (GET)`

Returns all the items that the user id inside the token has access to.

Requires a token.

## items post
`/items (POST)`

Creates an item. When creating, only one field is required, but the endpoint's `after` will take care of adding the user id to it.

Requires a token and the fields:
* content

## items id get
`/items/:id (GET)`

Gets a single item. 

Requires a token.

## items id put
`/items/:id (PUT)`

Updates a single item.

Requires a token.
Optional fields:
* content
* done
* listGroup

## items id delete
`/items/:id (DELETE)`

Deletes a single item.

Requires a token.
