/*The Composite pattern allows you to treat individual objects or groupings of objects in the same way. The pattern does this by designing it so that a method called on an object will then call the same method on each of it's children, which will call the method on each of its children until we reach the end of the tree. Each class of children will have its own way of implementing the method.

In this scenario, we have an inventory that we are going to display. The inventory is broken up into smaller catagories which can be broken up into even smaller categories, which are broken into individual items. 

A program using the composite pattern won't care whether it's executing code on a item category or an item itself.
*/

namespace Inventory{


	interface Component{
		displayInfo(index:string)
	}

	//The first composite. A composite can be broken up into smaller and smaller components, including other composites.
	class ItemCategory implements Component{

	    name: string;

		//This is the main thing that seperates a composite from a leaf. This allows this component to contain children.
		private list: Component[];

		constructor(name:string){
			this.name = name;
			this.list = [];
		}

		add(item:Component){
			this.list.push(item)
		}

		remove(indx:number){
			this.list.splice(indx, 1)
		}

		//Notice how the composite's use of displayInfo not only includes it's own implementation, but also calls that of all of its children.
		displayInfo(indent = ""){

			let ret = `${this.name}: \n`;
			ret += this.list.reduce( (itemList, item) => {
				itemList += `${indent}--${item.displayInfo(indent + "  ")}`;
				return itemList
			}, "");

			return ret
		}
	}

	//The leaf. The difference between leafs and composites is that leafs can't have any children below them.
	class Item implements Component{
		//notice that there is no way to have children within this class.

		name:string

		constructor(name:string){
			this.name = name;
		}

		displayInfo(indent = ""){
			return this.name + "\n"
		}
	}


	//Our tree Structure

	//The top of the tree structure. The master parent.
	const inventory = new ItemCategory("Inventory");



	//Level 2 of the tree
	let weaponsCategory = new ItemCategory("Weapons");
	let armorCategory = new ItemCategory("Armor");
	let potionCategory = new ItemCategory("Potion");


	//Add to the inventory composite
	inventory.add(weaponsCategory);
	inventory.add(armorCategory);
	inventory.add(potionCategory);



	//Level 3 of the tree. We can have as many levels as we want. The potion category will not be divided further.

	//Weapons Category
	let swordCategory = new ItemCategory("Sword");
	let axeCategory = new ItemCategory("Axe");

	//Armor Category
	let helmCategory = new ItemCategory("Helm");
	let shieldCategory = new ItemCategory("Shield");


	//Add to the 2nd level composites
	weaponsCategory.add(swordCategory);
	weaponsCategory.add(axeCategory);

	armorCategory.add(helmCategory);
	armorCategory.add(shieldCategory);


	//The final level, the leafs, one for each composite 

	let ironSword = new Item("Iron Sword");
	let goldenAxe = new Item("Golden Axe");
	let mithrilHelm = new Item("Mithril Helm");
	let elvenShield = new Item("Elven Shield");
	let healthPotion = new Item("Potion of Health");

	//Add to the respective composites
	swordCategory.add(ironSword);
	axeCategory.add(goldenAxe);
	helmCategory.add(mithrilHelm);
	shieldCategory.add(elvenShield);
	potionCategory.add(healthPotion);

	console.log( inventory.displayInfo() )

	
}

