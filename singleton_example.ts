/*The Singleton Pattern is very simple. It allows only one instance of an object to be created. Any other attempts to get an 
instance of an object will just return the same instance over and over again.

This is useful for when you need to have only one instance of a class
Many warn against using it because of it's restrictive nature and the fact that it introduces variables into the global namespace.
It's still worth learning about anyway.
*/

namespace Singleton{
	
	class Singleton{
		
		//The variable that stores the instance.
		//If one hasn't been created yet, it just stores null.
		private static singleton:Singleton = null;

		//so we can track that this instance is indeed the same:
		private id:number = 0;

		//This is the most important part of the pattern.
		//Making the constructor private means that nothing outside the class has access to it,
		//and therefore cannot create any new instances using it.
		private constructor(){
			console.log("Created new instance...")
			this.id = Math.floor( Math.random() * 10000 )
		}

		//This is the only way to get an instance of the class from the outside.
		public static getInstance(){

			//To ensure that we only ever get one instance, we check to see if one exists first.
			if(this.singleton == null){

				//If we don't have one, we'll create it here.
				this.singleton = new Singleton()
			}

			console.log(`Returning singleton with id: ${this.singleton.id}`)

			//return the stored variable object
			return this.singleton
		}
	}

	const highlander = Singleton.getInstance();
	const sparticus = Singleton.getInstance();

}