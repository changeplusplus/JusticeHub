## Privacy and Authentication

There are unique privacy considerations for this project. Since confidential legal information will be exchanged through our app and in client-to-lawyer communication, these interactions must be handled appropriately both on the backend and in chat environments. To provide robust authentication to users, email or phone numbers may be used to sign up for a JusticeHub account and authentication will be provided through Firebase.

## Security in Chat

Each user will have a case title and description associated to their client profile. It is important that this information remains classified to anyone besides lawyers working with the client on the case. It is also possible that users may provide sensitive case details including, but not limited to, name, location, age, and profession. Securing this information is therefore an important objective for the messaging feature. For this chat functionality, we provide users with a direct route to contact lawyers through Telegram within the JusticeHub application. Telegram is known for its proprietary MTProto security protocol which uses a mix of traditional encryption protocols including AES-256, RSA-2048 and Diffie-Hellman key exchange. As an additional security measure, phone numbers are hidden from users, and only lawyers are able to initiate contact with clients based on a case of their choosing. This setup provides a secure medium for lawyers and clients to communicate and to exchange additional case information or relevant files.  

### Resources

[Security](https://telegram.org/faq#q-how-secure-is-telegram) **|**
[Firebase](https://firebase.google.com/docs/auth/)
