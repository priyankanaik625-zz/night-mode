function isNumberInOpenInterval(c, b, a) {
	return c >= b && c <= a;
}
var DayTime = (function() {
	function a(b, c) {
		if (isNumberInOpenInterval(b, 0, 23) && isNumberInOpenInterval(c, 0, 59)) {
			this.hour = b;
			this.minute = c;
		} else {
			throw new RangeError("Incorrect time set: " + b + ":" + c);
		}
	}
	a.hasValidStructure = function(b) {
		return /^\d{1,2}:\d{2}$/.test(b);
	};
	a.fromString = function(c) {
		if (a.hasValidStructure(c)) {
			var b = c.split(":");
			return new a(Number(b[0]), Number(b[1]));
		} else {
			throw new Error(
				"Given value " + c + " didn't match expected format HH:mm"
			);
		}
	};
	a.fromCurrentTime = function() {
		var b = new Date();
		return new a(b.getHours(), b.getMinutes());
	};
	a.prototype.isAfter = function(b) {
		return (
			this.hour > b.hour || (this.hour === b.hour && this.minute > b.minute)
		);
	};
	return a;
})();
var NightMode = (function() {
	function a(b) {
		if (b === void 0) {
			b = {};
		}
		this.evening =
			b.evening instanceof DayTime ? b.evening : new DayTime(21, 0);
		this.morning = b.morning instanceof DayTime ? b.morning : new DayTime(6, 0);
		this.refreshIntervalInSeconds =
			typeof b.refreshIntervalInSeconds === "number"
				? b.refreshIntervalInSeconds
				: 20;
		this.nightClass = typeof b.nightClass === "string" ? b.nightClass : "night";
		if (b.shouldAutoswitch !== false) {
			this.enableAutoSwitch();
		}
	}
	a.prototype.isNight = function() {
		var b = DayTime.fromCurrentTime();
		return this.morning.isAfter(b) || !this.evening.isAfter(b);
	};
	a.prototype.checkBodyClass = function() {
		if (this.isNight()) {
			document.body.classList.add(this.nightClass);
		} else {
			document.body.classList.remove(this.nightClass);
		}
	};
	a.prototype.enableAutoSwitch = function() {
		var b = this;
		this.checkBodyClass();
		this.autoSwitchTimeoutIntervalID = setInterval(function() {
			return b.checkBodyClass();
		}, this.refreshIntervalInSeconds * 1000);
	};
	a.prototype.disableAutoSwitch = function() {
		clearInterval(this.autoSwitchTimeoutIntervalID);
	};
	return a;
})();
