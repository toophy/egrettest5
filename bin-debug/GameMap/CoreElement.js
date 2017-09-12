var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Mecha = (function () {
    function Mecha() {
        this._isJumpingA = false;
        this._isJumpingB = false;
        this._isSquating = false;
        this._isAttackingA = false;
        this._isAttackingB = false;
        this._weaponRIndex = 0;
        this._weaponLIndex = 0;
        this._faceDir = 1;
        this._aimDir = 0;
        this._moveDir = 0;
        this._aimRadian = 0;
        this._speedX = 0;
        this._speedY = 0;
        this._armature = null;
        this._armatureDisplay = null;
        this._weaponR = null;
        this._weaponL = null;
        this._aimState = null;
        this._walkState = null;
        this._attackState = null;
        this._target = new egret.Point();
        this._parent = null;
        this._ground_y = 0;
        this._moveRangeWidth = 0;
        this._moveRangeHeight = 0;
        this._land = null;
        this._armature = GameMapContainer.instance.factory.buildArmature("mecha_1502b");
        this._armatureDisplay = this._armature.display;
        // this._armatureDisplay.x = GameMapContainer.instance.rootContainer.stage.stageWidth * 0.5;
        // this._armatureDisplay.y = GameMapContainer.GROUND;
        this._armatureDisplay.scaleX = this._armatureDisplay.scaleY = 0.4;
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        // Mecha effects only controled by normalAnimation.
        this._armature.getSlot("effects_1").displayController = Mecha.NORMAL_ANIMATION_GROUP;
        this._armature.getSlot("effects_2").displayController = Mecha.NORMAL_ANIMATION_GROUP;
        // Get weapon childArmature.
        this._weaponR = this._armature.getSlot("weapon_r").childArmature;
        this._weaponL = this._armature.getSlot("weapon_l").childArmature;
        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        this._updateAnimation();
        // GameMapContainer.instance.addChild(this._armatureDisplay);
        dragonBones.WorldClock.clock.add(this._armature);
    }
    Mecha.prototype.setParent = function (land, p, x, y) {
        if (this._parent != null) {
            this._parent.removeChild(this._armatureDisplay);
        }
        this._land = land;
        this._parent = p;
        this._parent.addChild(this._armatureDisplay);
        this._ground_y = y;
        this._armatureDisplay.x = x;
        this._armatureDisplay.y = this._ground_y;
    };
    Mecha.prototype.setMoveRange = function (w, h) {
        this._moveRangeWidth = w;
        this._moveRangeHeight = h;
    };
    Mecha.prototype.getPoint = function () {
        return new egret.Point(this._armatureDisplay.x, this._armatureDisplay.y);
    };
    Mecha.prototype.move = function (dir) {
        if (this._moveDir == dir) {
            return;
        }
        this._moveDir = dir;
        this._updateAnimation();
    };
    Mecha.prototype.jump = function () {
        if (this._isJumpingA) {
            return;
        }
        this._isJumpingA = true;
        this._armature.animation.fadeIn("jump_1", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
        this._walkState = null;
    };
    Mecha.prototype.squat = function (isSquating) {
        if (this._isSquating == isSquating) {
            return;
        }
        this._isSquating = isSquating;
        this._updateAnimation();
    };
    Mecha.prototype.attack = function (isAttacking) {
        if (this._isAttackingA == isAttacking) {
            return;
        }
        this._isAttackingA = isAttacking;
    };
    Mecha.prototype.switchWeaponR = function () {
        this._weaponRIndex++;
        if (this._weaponRIndex >= Mecha.WEAPON_R_LIST.length) {
            this._weaponRIndex = 0;
        }
        this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        var weaponName = Mecha.WEAPON_R_LIST[this._weaponRIndex];
        this._weaponR = GameMapContainer.instance.factory.buildArmature(weaponName);
        this._armature.getSlot("weapon_r").childArmature = this._weaponR;
        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    };
    Mecha.prototype.switchWeaponL = function () {
        this._weaponLIndex++;
        if (this._weaponLIndex >= Mecha.WEAPON_L_LIST.length) {
            this._weaponLIndex = 0;
        }
        this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        var weaponName = Mecha.WEAPON_L_LIST[this._weaponLIndex];
        this._weaponL = GameMapContainer.instance.factory.buildArmature(weaponName);
        this._armature.getSlot("weapon_l").childArmature = this._weaponL;
        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    };
    Mecha.prototype.aim = function (x, y) {
        if (this._aimDir == 0) {
            this._aimDir = 10;
        }
        this._target.setTo(x, y);
    };
    Mecha.prototype.update = function () {
        this._updatePosition();
        this._updateAim();
        this._updateAttack();
    };
    Mecha.prototype._animationEventHandler = function (event) {
        switch (event.type) {
            case dragonBones.EventObject.FADE_IN_COMPLETE:
                if (event.eventObject.animationState.name == "jump_1") {
                    this._isJumpingB = true;
                    this._speedY = -Mecha.JUMP_SPEED;
                    this._armature.animation.fadeIn("jump_2", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                }
                else if (event.eventObject.animationState.name == "jump_4") {
                    this._updateAnimation();
                }
                break;
            case dragonBones.EventObject.FADE_OUT_COMPLETE:
                if (event.eventObject.animationState.name == "attack_01") {
                    this._isAttackingB = false;
                    this._attackState = null;
                }
                break;
        }
    };
    Mecha.prototype._frameEventHandler = function (event) {
        if (event.eventObject.name == "onFire") {
            var firePointBone = event.eventObject.armature.getBone("firePoint");
            event.eventObject.armature.display.localToGlobal(firePointBone.global.x, firePointBone.global.y, Mecha._globalPoint);
            this._fire(Mecha._globalPoint);
        }
    };
    Mecha.prototype._fire = function (firePoint) {
        firePoint.x += Math.random() * 2 - 1;
        firePoint.y += Math.random() * 2 - 1;
        var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
        var bullet = new Bullet(this._land.getBulletLayer(), "bullet_01", "fireEffect_01", radian + Math.random() * 0.02 - 0.01, 40, firePoint);
        bullet.setMaxRange(this._moveRangeWidth, this._moveRangeHeight);
        this._land.addBullet(bullet);
    };
    Mecha.prototype._updateAnimation = function () {
        if (this._isJumpingA) {
            return;
        }
        if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
            this._walkState = null;
            return;
        }
        if (this._moveDir == 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
            this._walkState = null;
        }
        else {
            if (!this._walkState) {
                this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
            }
            if (this._moveDir * this._faceDir > 0) {
                this._walkState.timeScale = Mecha.MAX_MOVE_SPEED_FRONT / Mecha.NORMALIZE_MOVE_SPEED;
            }
            else {
                this._walkState.timeScale = -Mecha.MAX_MOVE_SPEED_BACK / Mecha.NORMALIZE_MOVE_SPEED;
            }
            if (this._moveDir * this._faceDir > 0) {
                this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
            }
            else {
                this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
            }
        }
    };
    Mecha.prototype._updatePosition = function () {
        if (this._speedX != 0) {
            this._armatureDisplay.x += this._speedX;
            if (this._armatureDisplay.x < 0) {
                this._armatureDisplay.x = 0;
            }
            else if (this._armatureDisplay.x > this._moveRangeWidth) {
                this._armatureDisplay.x = this._moveRangeWidth;
            }
        }
        if (this._speedY != 0) {
            if (this._speedY < 5 && this._speedY + GameMapContainer.G >= 5) {
                this._armature.animation.fadeIn("jump_3", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
            }
            this._speedY += GameMapContainer.G;
            this._armatureDisplay.y += this._speedY;
            if (this._armatureDisplay.y > this._ground_y) {
                this._armatureDisplay.y = this._ground_y;
                this._isJumpingA = false;
                this._isJumpingB = false;
                this._speedY = 0;
                this._speedX = 0;
                this._armature.animation.fadeIn("jump_4", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                if (this._isSquating || this._moveDir) {
                    this._updateAnimation();
                }
            }
        }
    };
    Mecha.prototype._updateAim = function () {
        if (this._aimDir == 0) {
            return;
        }
        this._faceDir = this._target.x > this._armatureDisplay.x ? 1 : -1;
        if (this._armatureDisplay.scaleX * this._faceDir < 0) {
            this._armatureDisplay.scaleX *= -1;
            if (this._moveDir) {
                this._updateAnimation();
            }
        }
        var aimOffsetY = this._armature.getBone("chest").global.y * this._armatureDisplay.scaleY;
        if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
        }
        else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
            if (this._aimRadian > Math.PI) {
                this._aimRadian -= Math.PI * 2;
            }
        }
        var aimDir = 0;
        if (this._aimRadian > 0) {
            aimDir = -1;
        }
        else {
            aimDir = 1;
        }
        if (this._aimDir != aimDir) {
            this._aimDir = aimDir;
            // Animation mixing.
            if (this._aimDir >= 0) {
                this._aimState = this._armature.animation.fadeIn("aimUp", 0, 1, 0, Mecha.AIM_ANIMATION_GROUP, 2 /* SameGroup */);
            }
            else {
                this._aimState = this._armature.animation.fadeIn("aimDown", 0, 1, 0, Mecha.AIM_ANIMATION_GROUP, 2 /* SameGroup */);
            }
        }
        this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);
        //_armature.invalidUpdate("pelvis"); // Only update bone mask.
        this._armature.invalidUpdate();
    };
    Mecha.prototype._updateAttack = function () {
        if (!this._isAttackingA || this._isAttackingB) {
            return;
        }
        this._isAttackingB = true;
        // Animation mixing.
        this._attackState = this._armature.animation.fadeIn("attack_01", -1, -1, 0, Mecha.ATTACK_ANIMATION_GROUP, 2 /* SameGroup */);
        this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
        this._attackState.addBoneMask("pelvis");
    };
    return Mecha;
}());
Mecha.NORMAL_ANIMATION_GROUP = "normal";
Mecha.AIM_ANIMATION_GROUP = "aim";
Mecha.ATTACK_ANIMATION_GROUP = "attack";
Mecha.JUMP_SPEED = 20;
Mecha.NORMALIZE_MOVE_SPEED = 3.6;
Mecha.MAX_MOVE_SPEED_FRONT = Mecha.NORMALIZE_MOVE_SPEED * 1.4;
Mecha.MAX_MOVE_SPEED_BACK = Mecha.NORMALIZE_MOVE_SPEED * 1.0;
Mecha.WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
Mecha.WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
Mecha._globalPoint = new egret.Point();
__reflect(Mecha.prototype, "Mecha");
var Bullet = (function () {
    function Bullet(cts, armatureName, effectArmatureName, radian, speed, position) {
        this._speedX = 0;
        this._speedY = 0;
        this._armature = null;
        this._armatureDisplay = null;
        this._effect = null;
        this._master = null;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._master = cts;
        this._speedX = Math.cos(radian) * speed;
        this._speedY = Math.sin(radian) * speed;
        this._armature = GameMapContainer.instance.factory.buildArmature(armatureName);
        this._armatureDisplay = this._armature.display;
        this._armatureDisplay.x = position.x;
        this._armatureDisplay.y = position.y;
        this._armatureDisplay.rotation = radian * dragonBones.DragonBones.RADIAN_TO_ANGLE;
        this._armature.animation.play("idle");
        if (effectArmatureName) {
            this._effect = GameMapContainer.instance.factory.buildArmature(effectArmatureName);
            var effectDisplay = this._effect.display;
            effectDisplay.rotation = radian * dragonBones.DragonBones.RADIAN_TO_ANGLE;
            effectDisplay.x = position.x;
            effectDisplay.y = position.y;
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }
            this._effect.animation.play("idle");
            dragonBones.WorldClock.clock.add(this._effect);
            cts.addChild(effectDisplay);
        }
        dragonBones.WorldClock.clock.add(this._armature);
        cts.addChild(this._armatureDisplay);
    }
    Bullet.prototype.setMaxRange = function (w, h) {
        this._maxWidth = w;
        this._maxHeight = h;
    };
    Bullet.prototype.update = function () {
        this._armatureDisplay.x += this._speedX;
        this._armatureDisplay.y += this._speedY;
        if (this._armatureDisplay.x < -100 || this._armatureDisplay.x >= this._maxWidth + 100 ||
            this._armatureDisplay.y < -100 || this._armatureDisplay.y >= this._maxHeight + 100) {
            dragonBones.WorldClock.clock.remove(this._armature);
            this._master.removeChild(this._armatureDisplay);
            this._armature.dispose();
            if (this._effect) {
                dragonBones.WorldClock.clock.remove(this._effect);
                this._master.removeChild(this._effect.display);
                this._effect.dispose();
            }
            return true;
        }
        return false;
    };
    return Bullet;
}());
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=CoreElement.js.map