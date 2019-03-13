# Changing versions

So because I had been told that Expo will soon be compatible with the NodeJS native library, I tried updating expo to see if that was true.

It may be, but not in version 32.0.0.

This means that we are still unable to use twilio chat because their npm package
> npm install --save twilio-chat

requires the 'events' native module.

Changing the version of that also led to some compatibility issues with react-navigation (changing that version too) that while I was eventually able to sort it out, it's not 
worth dealing with right now.

As of now any npm packages that require native modules are a no-go until Expo gets everything sorted out.

It may be worth updating to Expo 32.0.0 sometime before our demo day, and then updating react-navigation as well.

That won't affect chat in anyway, and so Michael and I are still exploring options. Telegram is next on the hit list.