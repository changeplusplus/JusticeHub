# Here's how we'll integrate chat

The situation now:
-----------------

Right now we've realized that without diving into native code there's no way to *securely* integrate chat directly in to the app.

We've turned from PubNub to Twilio and now to Telegram.

Telegram offers everything that we want in terms of security, and the most effective way for us to implement it without ejecting our ap is to give give access to the client's 
phone number and have the lawyer contact the client on the Telegram app.

This requires a few steps that we can't implement just yet, but here's a gameplan.

The gameplan:
------------

1. Clients MUST sign up with their phone number
2. This phone number MUST be authenticated and there are a couple ways we can do this:
   
   -Find another API that allows us to do so without ejecting (firebase?)
 
   -Integrate with a web app and do this manually
3. Once the phone number is authenticated then clients will be able to post their cases, and each case will have the client's phone number tied to it in the firebase backend. 
This will be the only identifiable information besides the case description.
   
   -There are additional firebase security features we can implement here to ensure that this data is only read/writable by the same client and only readable by lawyers under 
   the circumstance that they accept the case.
   
4. When the lawyer accepts the case and is given access to the phone number, ideally the lawyer doesn't even have to see the actual number but instead clicks a button that 
brings him/her into the Telegram app and starts a conversation with the client

   -While this doesn't necessarily provide a huge barrier to just scheming phone numbers, the more intermediate steps between a user signing up and seeing identifiable 
   information, the better.
   
   -This step is the hard part, because integrating with Telegram is as straight forward as chat has been this whole time... not. Updates on this step will come soon
   
5. Chat obligations fulfilled, JusticeHub's job is done now that clients are connected with lawyers.
