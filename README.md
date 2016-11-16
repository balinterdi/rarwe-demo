[![Build Status](https://travis-ci.org/balinterdi/rarwe-demo.svg?branch=master)](https://travis-ci.org/balinterdi/rarwe-demo)
[![Code Climate](https://codeclimate.com/github/balinterdi/rarwe-demo/badges/gpa.svg)](https://codeclimate.com/github/balinterdi/rarwe-demo)

Rock & Roll with Ember.js - Demo version
========================================

This app is a smaller version of the app that is built in [my Rock and Roll with Ember.js book][1].

It demoes a simple music catalogue where you can create bands and songs, and
sort and rate the latter. Please don't try to use it to actually create an
inventory of your music. All the data is stored in memory only and destroyed
upon refresh.

You can check out the running app [here][2].

### Tech specs

The app aims to be running on a relatively recent, stable version of Ember.js (now
that the LTS versions are announced, it will probably run on the latest LTS
version) and contain several of the features the full app has.

* It uses a relatively recent version of Ember Data.
* There is no backend. The app uses the fantastic [ember-cli-mirage][3] addon to
  create some seed data and to mock out server responses. All data is ephemeral
  and destroyed on reload.
* It strives to show idiomatic Ember and use ES2015 features, like
  destructuring and `let`.
* It is Fastboot enabled and can thus even render without javascript. Try `curl http://demo.rockandrollwithemberjs.com/bands`
* It is deployed on Heroku.

### Found a bug?

That's great, please [submit a pull request][5].

### Licensing

I would like you to be able to do anything you wish with this code as long as
you don't sell it, or anything that uses it (e.g a screencast). To that end, I
chose the GPL v2 License which you find here in the repository and which is
nicely summarized on [choosealicense.com](http://choosealicense.com/licenses/).

Feel free to fork it, play with it, share it with friends or use some code
snippets in a presentation while you keep the license and the copyright notice
in the repository.

Copyright (c) 2016 [Balint Erdi](http://balinterdi.com)

[1]: http://rockandrollwithemberjs.com
[2]: http://demo.rockandrollwithemberjs.com
[3]: http://www.ember-cli-mirage.com/
[4]: https://www.pagefronthq.com/
[5]: https://github.com/balinterdi/rarwe-demo/pulls
