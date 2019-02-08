## Authentication and Privacy

There are some unique privacy and security considerations for this project. Our partners on this project requested that information such as email addresses or phone numbers not be required as credentials to register with JusticeHub. With this in mind, we plan to provide the option to sign up with email, phone number, or a username and password combination. To achieve this, an anonymous authentication will be enabled with Firebase that does not require an email address or phone number. In addition, sensitive case information needs to be confidential, as well as client and lawyer interactions and any personal information sent over our chat channels. The obstacle then becomes handling the mix of credentials that can be used to sign up for the service. In some cases, users will sign up with a phone number and/or email address and in others, users may only provide a username and a password to create an account. We must ensure then that Firebase appropriately recognizes and uniformly handles all users regardless of the authentication method chosen by the client account.

## Security in Chat

Each user will have a case title and description associated to their client profile. It is important that this information remains classified to anyone besides any lawyers working with the client on the case. Additionally, it is possible that users may be sending sensitive information including, but not limited to, name, location, case details, age, and profession. Securing this information is an important objective for the in-app messaging feature. For this chat functionality, we decided to use PubNub as the backend service for messaging. PubNub also provides a customizable ChatEngine template application which we will repurpose for our needs. From a security standpoint, PubNub guarantees end-to-end encryption using TLS and AES256, routes data in a way that prevents local attacks, and is also a HIPAA and SOC2 compliant service which is the robustness needed from a service handling a variety of sensitive legal data. 


### Resources

[Security](https://www.pubnub.com/products/security-overview/) **|**
[PubNub](https://www.pubnub.com/blog/pubnub-chatengine-vs-layer/) **|**
[Authentication](https://firebase.google.com/docs/auth/)
