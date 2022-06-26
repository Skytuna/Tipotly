# A platform where you can store financial information about your trips with your friends. [Example Site]

This project was created due to the lost time while figuring out how much money who should give to who after trips that we make with my friends. 
![alt text](https://skytuna.s-ul.eu/jtXqvRFr)
![alt text](https://skytuna.s-ul.eu/UUOBVl98)



## Tech

This project uses a number of open source projects (except [Firebase]) to work properly:

Frontend
* [React] - Main framework that was used for frontend.
* [Tailwind CSS] - Tailwind is a UI "framework" that makes it way faster to style your components.
* [Flowbite-React] - Tailwind based ready-to-use React components. It was used at bare minimum.

Backend
* [Firebase] - Google based backend service platform. It includes everything that Tipotly needs.

And of course this project itself is open source with a [public repository][repo] on GitHub.

### Running locally
* Clone or download the project to your local machine.\
* Create a `firebase.ts`  file under `/config` folder.
* Copy and paste the following fields. Specify the values according to your situation.
```typescript
   export const firebaseConfig = {
       apiKey: '12312312312312312312',
       authDomain: 'example.firebaseapp.com',
       projectId: 'example',
       storageBucket: 'example.appspot.com',
       messagingSenderId: '123123123123',
       appId: '1:123123123:web:123123123123',
       measurementId: 'example-123',
   };
```
then run the following commands.
```bash
npm install
npm start
```

### Build
In order to build the app, you need to configure the app as described in "Running locally" section. \
then run the following commands.
```bash
npm install
npm build
```
### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT](https://choosealicense.com/licenses/mit/)

   [repo]: <https://github.com/Skytuna/Tipotly>
   [Example Site]: <https://tipotly.web.app/>
   [React]: <https://reactjs.org/>
   [Tailwind CSS]: <https://tailwindcss.com/>
   [Flowbite-React]: <https://flowbite-react.com/>
   [Firebase]: <https://firebase.google.com/>
