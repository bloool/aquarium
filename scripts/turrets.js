//trident
const sharp = extend(ShrapnelBulletType, {
    damage: 10,
    length: 10,
    lifetime: 2,
    width : 8,
    serrations: 0,
    hitEffect : Fx.none,
    toColor : Color.valueOf("5368d480"),
});

const sharp2 = extend(ShrapnelBulletType, {
    damage: 15,
    length: 15,
    lifetime: 5,
    width : 10,
    serrations: 0,
    hitEffect : Fx.none,
    toColor : Color.valueOf("5368d480"),
});

const sharpshort = extend(ShrapnelBulletType, {
    damage: 10,
    length: 5,
    lifetime: 3,
    width : 10,
    serrations: 0,
    hitEffect : Fx.none,
    toColor : Color.valueOf("5368d480"),
});

const trident = extend(BasicBulletType, {
    width : 18,
    height: 28,
    sprite: "large-bomb",

    damage : 30,
    speed : 4,
    lifetime : 30,
    pierce : true,
    pierceCap : 2,

    hitSound : Sounds.plasmaboom,
    mixColorTo : Color.valueOf("ffffff"),
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("5368d4"),

    update(b){
        sharp.create(b, b.x, b.y, b.rotation() + 20, Mathf.random(0.5, 2), 1);
        sharp.create(b, b.x, b.y, b.rotation() - 20, Mathf.random(0.5, 2), 1);
        sharp.create(b, b.x, b.y, b.rotation(), Mathf.random(0.5, 2), 1);
    }
});

const harpoon = extend(BasicBulletType, {
    width : 18,
    height: 28,
    sprite: "large-bomb",

    damage : 60,
    speed : 6,
    lifetime : 30,
    pierce : true,

    mixColorTo : Color.valueOf("ffffff"),
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("5368d4"),

    update(b){
        sharp2.create(b, b.x, b.y, b.rotation(), 1, 1);
        sharpshort.create(b, b.x, b.y, b.rotation() + 180, 1, 1);
        sharpshort.create(b, b.x, b.y, b.rotation() + 200, 1, 1);
        sharpshort.create(b, b.x, b.y, b.rotation() - 200, 1, 1);
    }
});

const tridentTurret = extend(PowerTurret, "trident", {
    shootType : trident,
});

const harpoonTurret = extend(PowerTurret, "harpoon", {
    shootType : harpoon,
});

//backfire

const pyraBackfire = extend(BasicBulletType, {
    width : 14,
    height: 20,

    damage : 15,
    speed : 5,
    lifetime : 12,
    status : StatusEffects.burning,
    pierce : true,

    hitSound : Sounds.flame,
    despawnEffect : Fx.shootPyraFlame,
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("ffaa5f"),
});

const pyraBackfireBig = extend(BasicBulletType, {
    width : 18,
    height: 24,

    damage : 20,
    speed : 4,
    lifetime : 20,
    status : StatusEffects.burning,
    pierce : true,

    hitSound : Sounds.flame,
    despawnEffect : Fx.shootPyraFlame,
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("ffaa5f"),
});


const pyraShot = extend(BasicBulletType, {
    width : 18,
    height: 24,

    damage : 30,
    speed : 6,
    lifetime : 20,
    status : StatusEffects.burning,
    pierce : true,
    pierceCap : 2,

    hitSound : Sounds.flame,
    despawnEffect : Fx.shootPyraFlame,
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("ffaa5f"),

    despawned(b){
        pyraBackfire.create(b, b.x, b.y, b.rotation() - 180, 1, 1);
    }
});

const pyraShotBig = extend(BasicBulletType, {
    width : 22,
    height: 28,

    damage : 40,
    speed : 5,
    lifetime : 30,
    status : StatusEffects.burning,
    pierce : true,
    pierceCap : 4,

    hitSound : Sounds.flame,
    despawnEffect : Fx.massiveExplosion,
    frontColor : Color.valueOf("ffffff"),
    backColor  : Color.valueOf("ffaa5f"),

    despawned(b){
        pyraBackfireBig.create(b, b.x, b.y, b.rotation() - 180 + Mathf.random(-5, 5), Mathf.random(0.8, 1.2), 1);
        pyraBackfireBig.create(b, b.x, b.y, b.rotation() - 170 + Mathf.random(-5, 5), Mathf.random(0.8, 1.2), 1);
        pyraBackfireBig.create(b, b.x, b.y, b.rotation() + 170 + Mathf.random(-5, 5), Mathf.random(0.8, 1.2), 1);
    }
});

const backfire = extend(ItemTurret, "backfire", {});
backfire.ammoTypes.put(
    Items.pyratite, pyraShot
);

const backfire2 = extend(ItemTurret, "sternflak", {});
backfire2.ammoTypes.put(
    Items.pyratite, pyraShotBig
);

//green
const swiggle = extend(BasicBulletType, {
    sprite : "large-bomb",
    width : 38,
    height : 38,

    splashDamage : 560,
    splashDamageRadius : 80,

    homingPower : 0.2,
    homingRange : 150,

    ignoreRotation : true,

    backColor : Pal.heal,
    frontColor : Color.white,
    mixColorTo : Color.white,
    shrinkY : 0,

    hitSound : Sounds.plasmaboom,

    ejectEffect : Fx.none,
    despawnShake : 4,

    lifetime : 240,

    despawnEffect : Fx.greenBomb,
    hitEffect : Fx.massiveExplosion,
    spin : 10,

    
    init(b){
        if(!b)return;
        b.data = new Trail(150);
    },
    update(b){
        this.super$update(b);
        b.data.update(b.x, b.y);
    },
    draw(b){
        this.super$draw(b);
        b.data.draw(Pal.heal, 5);
    }
});

const swivel = extend(PowerTurret, "swivel", {
    shootType : swiggle,
});

//star
const starBoom = new Effect(40, 100, e => {
    Draw.color(Color.valueOf("ffc999"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 20);

    Draw.color(Color.valueOf("ffc999"));
    for(let i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 6, 40 * e.fout(), i*90);
    }

    Draw.color();
    for(let i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 3, 12 * e.fout(), i*90);
    }
});

const starBomb = extend(BasicBulletType, {
    sprite : "large-bomb",
    width : 16,
    height : 24,
    speed : 6,
    lifetime : 40,
    drag : -0.01,

    splashDamage : 60,
    splashDamageRadius : 20,

    homingPower : 0.3,
	homingRange : 200,
    homingDelay : 8,

    hitEffect : Fx.railHit,
	despawnEffect : starBoom,
    backColor : Color.valueOf("ffc999"),

    weaveScale : 3,
    weaveMag : 3,
    shrinkY : 0,

    init(b){
        if(!b)return;
        b.data = new Trail(10);
    },
    update(b){
        this.super$update(b);
        b.data.update(b.x, b.y);
    },
    draw(b){
        this.super$draw(b);
        b.data.draw(Color.valueOf("ffc999"), 3);
    }
});

const star = extend(BasicBulletType, {
    sprite : "large-bomb",
    width : 12,
    height : 20,
    damage : 30,
    speed : 5,
    lifetime : 25,
    drag : -0.004,

    homingPower : 0.2,
	homingRange : 200,
    homingDelay : 10,

    hitEffect : Fx.railHit,
	despawnEffect : Fx.absorb,
    backColor : Color.valueOf("ffc999"),

    weaveScale : 3,
    weaveMag : 3,
    shrinkY : 0,

    init(b){
        if(!b)return;
        b.data = new Trail(5);
    },
    update(b){
        this.super$update(b);
        b.data.update(b.x, b.y);
    },
    draw(b){
        this.super$draw(b);
        b.data.draw(Color.valueOf("ffc999"), 1.5);
    }
});

const polaris = extend(PowerTurret, "polaris", {
    shootType : star,
});

const rigel = extend(PowerTurret, "rigel", {
    shootType : starBomb,
});

const laser = extend(LaserBulletType, {
    colors : [Color.valueOf("ffe18f"),Color.valueOf("ffc999"),Color.valueOf("ffffff")],
    hitEffect : Fx.absorb,
    despawnEffect : Fx.none,
    damage: 80,
    hitSize : 16,
    lifetime : 36,
    length : 180,
    width : 10,
});

const antares = extend(PowerTurret, "antares", {});
antares.buildType = () => extend(PowerTurret.PowerTurretBuild, antares, {
    creload : 0,
    updateTile(){
        this.super$updateTile();
        let rx = this.x + Mathf.range(-15, 15)
        let ry = this.y + Mathf.range(-15, 15)

        if(this.isShooting() && this.power.status > 0.5 && this.hasAmmo() && this.creload >= 10){
            this.creload = 0
            laser.create(this, this.team, rx, ry, this.rotation)
            Fx.absorb.at(rx, ry)
            Sounds.sap.at(this)
        }
        else{
            if(this.creload < 10){this.creload += 1} 
        }
    },
});

/*updateTile(){
    this.super$updateTile();
    let rx = this.x + Mathf.range(-15, 15)
    let ry = this.y + Mathf.range(-15, 15)
    if(this.isShooting() && this.power.status > 0.5 && this.hasAmmo() && Mathf.chance(0.05)){
        laser.create(this, this.team, rx, ry, this.rotation)
        Fx.absorb.at(rx, ry)
        Sounds.sap.at(this)
    }
},*/

//others

const gale = extend(ItemTurret, "gale", {});
const tineSharp = extend(ShrapnelBulletType, {
    damage: 10,
    length: 5,
    width : 6,
    serrations: 0,
    hitEffect : Fx.none,
    toColor : Pal.bulletYellowBack,
});
const tine = extend(BasicBulletType, {
    width : 8,
    height : 35,
    damage : 30,
    speed : 5,
    lifetime : 40,
    collidesGround : false,

    homingPower : 1,
	homingRange : 25,

    hitEffect : Fx.railHit,
    backColor : Pal.bulletYellowBack,

    init(b){
        if(!b)return;
        b.data = new Trail(8);
    },
    update(b){
        this.super$update(b);
        b.data.update(b.x, b.y);
    },
    draw(b){
        this.super$draw(b);
        b.data.draw(Pal.bulletYellowBack, 2);
    },
    despawned(b){
        tineSharp.create(b, b.x, b.y, b.rotation() - 180, 1, 1);
        tineSharp.create(b, b.x, b.y, b.rotation(), 1, 1);
    }
});
gale.ammoTypes.put(
    Items.lead, tine
)