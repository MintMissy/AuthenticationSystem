<h1 align="center">
  <br>
  <img src="./docs/image/auth.jpg" alt="" width="250">
  <br>
  Authentication System
  <br>
</h1>

<p align="center">Authentication system is a boilerplate code that can be used to implement login functionality to your angular application.</p>

## Key Features

- Codebase was written with SOLID and DRY principles in mind
- NgRx state management support
- User Factory
- Build-in user models
- Http Interceptor
- Authenticated & Not-authenticated guard
- Extracted API url

## Setup

1. Copy authentication module to your application.

2. Go to `environment.ts` and `environment.ts` file and change API url to your own. If you're missing these files create them inside a new folder called `environments` located in the root of your project. Don't forget to add following code to your production configuration in `angular.json`.

```json
"fileReplacements": [
	{
		"replace": "src/environments/environment.ts",
		"with": "src/environments/environment.prod.ts"
	}
]
```

3. Configure authentication api service. Go to `authentication.service.ts` and setup `AuthenticationResponse` type - it should match a response data from your backend service.

4. Go to `app-user.model.ts` and configure your `AppUser` model along with `isAppUser` function.

5. Go to `user.factory.ts` and configure your user factory. User factory is a service that parses authentication response to user model.

6. Enjoy your authentication system :)