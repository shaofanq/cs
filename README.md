# Cancer Spot - setup

##Setup npm

First think you'll need is to download NPM to your machine if you don't already have it. 

### For Mac
- install [homebrew](http://brew.sh/) 
- use home brew to install node:

````
$ brew install node
````

### For PC
- download [node](http://nodejs.org/) directly from their webiste

Now you should be able to type:

````
$ npm -v
````
and get a legit version number.

##Setup Ionic

In your terminal, you should now be able to install the Ionic tools by typing:

````
$ npm install -g cordova ionic
````

##Setup git

If you get a valid version number by typing

````
$ git --version
````

in your command line, then you've got git. 

If you don't get a valid version, then go (here)[http://git-scm.com/download] to get git.


Once you have git working, clone the cancerspot app:

````
$ git clone https://github.com/cancerspot/cs.git
````

then traverse into the new cs folder you just created, and type the following in your terminal:

````
$ npm install && bower install
````

After that you should be able to type

````
$ ionic serve
````

And view the app!

