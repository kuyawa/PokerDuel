# PokerDuel - Texas Hold'em in Kitura and Heroku

Lorem ipsum...

PokerDuel is a simple app to test Kitura and Heroku. Turns out they're very easy to set up and I'll show the details here for everybody to play with it.

This are the steps to have any web page up and running with Kitura on Heroku:

* Get a Heroku account
* Download the CLI (Heroku's Command Line Interface to do some stuff in terminal)
* Go to the dashboard (after login, go to dashboard.heroku.com)
* Create an app, give it a nice name like PokerFight or whatever
* We will use that name for everything so be sure to change it accordignly
* Now open terminal in your PC and let's start the fun
* Clone this repo like:
* $ git clone https://github.com/kuyawa/PokerDuel.git PokerFight
* Pay attention to the last part of the cloning, that's the name of your new folder 
* Modify the Procfile to have this `web: PokerFight`
* Now lets compile it all:
* $ swift build
* And test it:
* $ .build/debug/PokerFight
* If you go to your browser it should run in localserver:8090
* $ CTRL+C to stop the app
* Now let's add everything to github
* $ git init
* $ git add .
* $ git commit -m 'First commit'
* Time to upload everything to Heroku
* $ heroku login
* $ Enter password
* Ok, to Heroku it goes:
* $ git remote heroku to https://git.heroku.com/PokerFight.git
* $ git push -u heroku master
* Now it will push everything to Heroku and start compilation
* Oops, we forgot the buildpack. 
* Ok, go to dashboard.heroku.com
* Enter your app, go to settings, then to buildpack and add this:
* buildpack: https://github.com/kylef/heroku-buildpack-swift
* If it won't run we may need to do a final step on our free server gently provided by Heroku
* $ heroku ps:scale web=1
* That's it, our app should be up and running
* Head over to http://pokerfight.herokuapp.com and marvel

Questions? Let me know...