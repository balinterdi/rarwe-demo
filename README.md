Rock & Roll with Ember.js
=========================

The Ember.js app I build during the introductory screencast series to my mailing list.

The code for the backend server in the last episode lives at [balinterdi/rock-and-roll-api](https://github.com/balinterdi/rock-and-roll-api).

### Want more Ember stuff?

If you would like to learn more about Ember.js and receive valuable content regularly, you can [sign up here](http://emberjs.balinterdi.com).

### Tips on working along

My goal with releasing the code for the screencast is to help you work along as you watch the episodes. Let me share a few tips that can also help.

#### Git tags

The repository is properly tagged for each episode. If you want to jump directly to the end of Episode 3 (which happens to also be the beginning of Episode 4), just do `git checkout episode-3`.

#### App server

There is a very simple application server implemented in config.ru. It implements a simple file server and adds a convenience for `index.html` files so that they can be served without having to append `index.html` to the end of the URL. To run it, just do `rackup` in the root of the repository. This is going to launch the app server on port 9292 so you can then load the application on `http://localhost:9292`.

### Licensing

I would like you to do anything you wish with this code as long as you don't sell it, or anything that uses it (e.g a screencast). To that end, I chose the GPL v2 License which you find here in the repository and which is nicely summarized on [choosealicense.com](http://choosealicense.com/licenses/).

Feel free to fork it, play with it, share it with friends or use some code snippets in a presentation while you keep the license and the copyright notice in the repository.

Copyright (c) 2013 [Balint Erdi](http://balinterdi.com)
