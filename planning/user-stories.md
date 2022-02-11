any users can see a list of the available maps
any users can view a map
a map can contain many points
each point can have: a title, description, and image
authenticated users can create maps
authenticated users can modify maps (add, edit, remove points)
users can favourite a map
users have profiles, indicating their favourite maps and maps they've contributed to
use http://leafletjs.com/ or https://developers.google.com/maps/

ERD
Tables: users, maps, points, 

users
  PRIMARY KEY SERIAL id  
  VARCHAR email
  VARCHAR password

maps
  PRIMARY KEY SERIAL id
  FOREIGN KEY INTEGER user_id
  TIMESTAMP time_created

maps_contributors
  id
  user_id
  map_id

maps_favourites
  id
  user_id
  map_id

points
  PRIMARY KEY SERIAL id
  VARCHAR title
  TEXT description
  VARCHAR image_url
  INTEGER lat
  INTEGER long
  TIMESTAMP time_created

maps_points
  PRIMARY KEY SERIAL id
  FOREIGN KEY INTEGER map_id
  FOREIGN KEY INTEGER point_id


Browse  GET /maps                 |   /points             |   /users           

Read    GET /maps/:id             |   /points/:id         |   /users/:id

Edit    PUT/PATCH /maps/:id       |   /points/:id         |   /users/:id

Add     POST /maps                |   /points             |   /users

Delete  DELETE /maps/:id          |   /points/:id          |   /users/:id
