## Authentication and Privacy

There are some unique privacy and security considerations for this project. Our partners on this project requested that information such as email addresses or phone numbers not be required as credentials to register with JusticeHub. With this in mind, we plan to provide the option to sign up with email, phone number, or a username and password combination. To achieve this, an anonymous authentication will be enabled with Firebase that does not require an email address or phone number. In addition, sensitive case information needs to be confidential, as well as client and lawyer interactions and any personal information sent over our chat channels. The obstacle then becomes handling the mix of credentials that can be used to sign up for the service. In some cases, users will sign up with a phone number and/or email address and in others, users may only provide a username and a password to create an account. We must ensure then that Firebase appropriately recognizes and uniformly handles all users regardless of the authentication method chosen by the client account.

## Security in Chat

Each user will have a case title and description associated to their client profile. It is important that this information remains classified to anyone besides any lawyers working with the client on the case. Additionally, it is possible that users may be sending sensitive information including, but not limited to, name, location, case details, age, and profession. Securing this information is an important objective for the in-app messaging feature. For this chat functionality, we decided to use Twilio programmable chat as the messaging service. From a security standpoint, Twilio supports both TLS and provides Request Validation using SHA1 in conjunction with HMAC (Hash-based Message Authentication Code) signing and Twilio's own AuthTokens. Twilio's services are also SOC2 compliant to handle large amounts of sensitive legal data from the application users. 

### Resources

[Security](https://www.twilio.com/security) **|**
[Authy](https://www.twilio.com/authy) **|**
[Firebase](https://firebase.google.com/docs/auth/)
