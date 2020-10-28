## BURNT_TOAST API 

This is the server for burnt_toast_client https://github.com/thinkful-ei-quail/burnt-toast-client
Created by Lucas Bigelow, El Moctar Ebnou, Nicholas Hemerling, Sonali Martinez-Najera, and Jim Smith.

## Teck stack

* Node.js
* Express
* JWT
* PostgreSQL

### List Of Endpoints 

Private endpoints require a valid token to be included in the header of the request. A Token can be acquired after successfully login.

* POST /api/auth required fields to login {username, password}
=> Response 200 {TOKEN}

## Users Endpoints

* POST /api/users required fields to sign up { full_name, username, password, email, zip }
=> Response 201

* DELETE /api/users
=> Response with 200 'Deleted user'

## Profiles Endpoints

* GET /api/profiles 
=> Response 200  [ profiles ]

* POST /api/profiles required fields to create new profile { full_name, email, zip, profile_desc, profile_img_url }
=> Response 201 { profile }

* PATCH /api/profiles 
=> Response 200 { updateProfile }

* GET /api/profiles/:profile_id 
=> Response 200 { profile }

## User Skills Endpoints

* GET /api/user_skills
=> Response 200 [ allSkills ]

* POST /api/user_skills required fields to post a skill { skill_id, skill_desc, user_skill_type, skill_img_url }
=> Response 201 { skill }

* DELETE /api/user_skills/:user_skill_id 
=> Response 200 'Skill deleted'

* GET /api/user_skills/:user_id
=> Response 200 [ userSkills ]

* GET /api/user_skills/skills/:skill_id?[optional filter params]
=> Response 200 [ userSkills ]

* GET /api/user_skills/details/:user_skill_id
=> Response 200 {skillDetails}

## Skills Endpoints

* GET /api/skills
=> Response 200 [ skills ]

## Categories Endpoints

* GET /api/categories
=> Response 200 [ categories ]


### Start Server

* npm run dev

### Migrate the dev database

* npm run migrate

### Run the test

* npm test

# CONTRIBUTORS

* @elmoctarebnou
* @jsmith774
* @nhemerling
* @sonalinajera
* @the-gamblers-fallacy



