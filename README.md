Due to the seperation of front-end and back-end improper installation commands can brick your files.

Here is how to open the front-end of the application WITHOUT bricking anything according to current design of application. 


RUNNING FRONTEND

1. Create a codes.js file in the frontend/app directory. Add the following code to codes.js (replacing 'insert hugging face access token' with your own token):
```bash
 const HF_ACCESS_TOKEN = "<insert hugging face access token>";
 export { HF_ACCESS_TOKEN };
```
  
2. From the root directory navigate to the frontend folder: 
 ```bash
   cd frontend
   ```

3.  If you haven't already done so, install node package manager: 
 ```bash
   npm install
   ```

4. Run the application using expo: 
 ```bash
   npx expo start
   ```
