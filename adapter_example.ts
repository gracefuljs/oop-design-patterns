/*The Adapter pattern is used to allow two incompatible interfaces to work together by providing a way to convert input/output from one to the other.
Think of a real life adapter that allows a three prong plug to use a two prong outlet.

This pattern seems to be the most useful for introducing an outside library to a fully established code base or to allow legacy code to function along with newer code.
*/

/*In this scenario, Myrin, an elf mage, is trying to join a fighting tournament, but it requires the use of weapons. Myrin doesn't fight that way, instead casting
spells directly from his hands, but he still wants to participate, so he uses a staff-- an adapter than allows him to channel his magic use through a weapon.*/

//The "target". The "two-prong plug" that has the functionality we need. 
interface WeaponUser{

	attackWithWeapon(): void;
	guard(): void;
}


//The concrete implementation
class Warrior implements WeaponUser{
	
	name: string;
	weapon: string;
	hp: number;
	atk: number;
	def: number;

	constructor(name: string, weapon: string, hp: number, atk: number, def: number){
		this.name = name;
		this.weapon = weapon;
		this.hp = hp;
		this.atk = atk;
		this.def = def;
	}

	public attackWithWeapon(){
		console.log(this.name + " attacks with a " + this.weapon + " for " + this.atk + " damage.")
	}

	public guard(){
		console.log(this.name + " guards, reducing the damage.")
	}
}


//The "adaptee". The "three-prong plug" that wants to use the target's functionality but isn't compatible.
interface MagicUser{

	castSpell(): void;
	castShield(): void;
}

//Concrete Implementation
class Mage implements MagicUser{
	
	name: string;
	element: string;
	hp: number;
	mp: number;
	mag: number;
	def: number;

	constructor(name:string, element:string, hp: number, mp: number, mag: number, def:number){
		this.name = name;
		this.element = element;
		this.hp = hp;
		this.mp = mp;
		this.mag = mag;
		this.def = def;
	}

	public castSpell(){
		console.log( this.name + " casts " + this.element + " for " + this.mag + " damage.")
	}

	public castShield(){
		console.log( this.name + " casts a shield, neutralizing the damage." )
	}
}

//In order for our "adaptee" to use the functionality of the "target", we need an adapter. 
//The adapter needs to be a class that implements the target's functionality
class MageWithStaff implements WeaponUser{
	
	//after that, we need to include a concrete implementation of the adaptee so we can wrap their behaviors around that of the target's.
	mage: Mage; 

	constructor(mage:Mage){
		this.mage = mage;
	}

	//Within the target's methods, call the equivalent of the adaptee. 
	public attackWithWeapon(){
		console.log(this.mage.name + " uses a staff to cast a spell.");
		this.mage.castSpell()
	}

	public guard(){
		console.log(this.mage.name + " uses a staff to cast a shield.");
		this.mage.castShield()
	}
}


//The demo fighters
let dursal = new Warrior("Dursal", "axe", 100, 10, 10);
let myrin = new Mage("Myrin", "lightning", 100, 10, 10, 10);

//The adapter. Note that we've passed our instance of the adaptee into this new instance of adapter.
let myrinWithStaff = new MageWithStaff(myrin);

//Our Warrior using the WeaponUser behavior
console.log("The Warrior:")
dursal.attackWithWeapon();
dursal.guard();

//Our Mage using the MagicUser behavior
console.log("The Unwrapped Mage:");
myrin.castSpell()
myrin.castShield()

//Our Mage wrapped in the MageWithStaff adapter using the MagicUser behavior 
console.log("The Mage Using a Staff:")
myrinWithStaff.attackWithWeapon();
myrinWithStaff.guard()
