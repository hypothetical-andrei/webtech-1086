class Robot {
  constructor (name) {
    this.name = name
  }

  move () {
    console.log(`${this.name} is moving`)
  }
}

let r1 = new Robot('standard robot')
r1.move()

class Weapon {
  constructor (description) {
    this.description = description
  }

  fire () {
    console.log(`firing ${this.description}`)
  }
}

class CombatRobot extends Robot {
  constructor (name) {
    super(name)
    this.weapons = []
  }

  addWeapon (weapon) {
    this.weapons.push(weapon)
  }

  fire () {
    console.log('firing all weapons')
    for (const weapon of this.weapons) {
      weapon.fire()     
    }
  }
}

let cr1 = new CombatRobot('a fearsome robot')
cr1.fire()

let w1 = new Weapon('pew pew lazor')
cr1.addWeapon(w1)
cr1.fire()

Robot.prototype.fly = function () {
  console.log(`${this.name} is flying`)
}

r1.fly()
cr1.fly()

let f0 = r1.move
// f0()

f0.apply(cr1, [])