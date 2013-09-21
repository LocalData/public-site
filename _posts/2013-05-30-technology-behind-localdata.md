---
title: What's the technology behind LocalData?
layout: post
---
We thought our technical audience might be interested in a rundown of what's happening on the back end. LocalData has gone through a lot of technical iterations to keep everything fast and responsive in the field. We're building with off-the-shelf components to make this system as simple as possible. 

- [Node](http://nodejs.org/): A simple node server handles the basic app
  operations, including geodata. 
- [MongoDB](http://www.mongodb.org/): A flexible datastore, mongo handles all
  our survey responses. We're excited about the enhanced geodata support in
  [MongoDB 2.4](http://docs.mongodb.org/manual/release-notes/2.4/#new-geospatial-indexes-with-geojson-and-improved-spherical-geometry).
- [PostGIS](http://postgis.net/): To support custom base data, we're using a
  simple PostGIS database setup. Our goal has been to see how lean we can keep
  the operation -- but I'm seeing [CartoDB](http://cartodb.com/) in our future 

On mobile browsers, we've done a lot of work to keep the experience responsive.
We're using [JQuery Mobile](http://jquerymobile.com/) to provide nicely styled
form widgets. We've thought about rolling our own, smaller subset of JQM
features. Our profiling work showed that the biggest performance targets were
in our code, though -- more on that soon from Prashant. 

On the desktop, our dashboard is built entirely in
[Backbone](http://backbonejs.org/). The pieces are changing quickly, and it
lets us keep up. 
