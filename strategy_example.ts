/*
The strategy pattern is used to more easily create a wide variety of ways for classes to execute a particular
operation. Basically, this pattern lets a class handle a task in anyway it wants without worrying about what the other
classes are doing.

So far, this is the most useful pattern to me, as it can easily replace a long, tangled mess of if/else statements,
or having to define a particular function over and over again in different classes. This is also a good example of 
composition, where classes are "composed" of a bunch of tiny little classes instead of inheriting from one and changing
things that differ.

In this scenario, let's say we're making a game, and we're working on NPCs. These NPCs will react differently to the
sight of an enemy. A combat enabled NPC will try to fight it, while a plain civilian will run away and hide. A child NPC
might try to find its parent. This could easily become overwhelming if we tried to keep this as an if/else statement, not
to mention, it would be very brittle. A better way would be to do this... 
*/

namespace StrategyPattern{

	//Here is our example of composition. Instead of declaring one method in the superclass, we create a class that 
	//will house everything we need to for this functionality in a self-contained class, methods and variables. This
	//way, the only thing that has to worry about how a job is getting done is the class itself.
	
	//Having a superclass here isn't entirely necessary. It can be an interface, or even a collection of unrelated
	//classes.
	class ReactToEnemyBehavior{
		owner:NPC
		constructor(owner:NPC){
			this.owner = owner
		}
		
		react(){}
	}

	//The behavior class for NPCs who will fight enemies.
	class FightEnemy extends ReactToEnemyBehavior{
		react(){
			console.log(`${this.owner.name} draws their weapon to fight the enemy.`)
		}
		
	}

	//The behavior class for NPCs who will run away from enemies.
	class FleeFromEnemy extends ReactToEnemyBehavior{
		react(){
			console.log(this.owner.name + " runs away from the enemy.")
		}
		
	}

	//The behavior class for NPCs who will find protection when encountering enemies.
	class FindParent extends ReactToEnemyBehavior{
		react(){
			console.log(this.owner.name + " runs away from the enemy to find a parent.")
		}
		
	}

	//A sort of "default" behavior in case one isn't defined by the subclass. This isn't necessary, but it helps
	//to keep the code from exploding...
	class NoReaction extends ReactToEnemyBehavior{
		react(){
			console.log(`${this.owner.name} just stands there, either too scared or really not paying attention.`)
		}
	}


	//Our NPC superclass
	class NPC{
		name:string;
		reactionToEnemy:any;
		
		constructor(name:string){
			this.name = name
			this.setReactionToEnemy(NoReaction(this))
		} 

		/*While there are a couple of ways to customize this kind of behavior, this way works best for this
		example since it allows the behavior to be changed dynamically, such as, if you want a civilian
		to be able to attack an enemy when a family member or friend is in danger.*/
		setReactionToEnemy(reaction:ReactToEnemyBehavior){
			this.reactionToEnemy = reaction;
		};

		reactToEnemy(){
			this.reactionToEnemy.react();
		};
	}

	//Our first subclass. This one will attack an enemy on sight.
	class GuardNPC extends NPC{
		constructor(name:string){
			super(name);

			this.setReactionToEnemy(new FightEnemy(this))
		}
	}

	//Our second subclass. This one will run away from an enemy on sight.
	class CivilianNPC extends NPC{
		constructor(name:string){
			super(name);
			
			this.setReactionToEnemy(new FleeFromEnemy(this));
		}
	}

	//Our third subclass. This one will search for a parent when an enemy is sighted.
	class ChildNPC extends NPC{
		constructor(name:string){
			super(name);
			
			this.setReactionToEnemy(new FindParent(this));
		};
	}

	//Our final subclass, notice how this one uses the same interface as the guard NPC.
	class MercenaryNPC extends NPC{
		constructor(name:string){
			super(name);
			
			this.setReactionToEnemy(new FightEnemy(this));
		};
	}

	//Create NPCs
	let sally = new GuardNPC("Sally the Guard");
	let ernie = new CivilianNPC("Ernie the Civilian");
	let lucy  = new ChildNPC("Lucy the Child");
	let carlo = new MercenaryNPC("Carlo the Mercenary");

	//Have them react to an enemy
	sally.reactToEnemy();
	ernie.reactToEnemy();
	lucy.reactToEnemy();
	carlo.reactToEnemy();

	//Let's change Erie's reaction to an enemy.
	console.log("Ernie sees that Lucy is in danger.")
	ernie.setReactionToEnemy(new FightEnemy(ernie));
	ernie.reactToEnemy()
	
}

