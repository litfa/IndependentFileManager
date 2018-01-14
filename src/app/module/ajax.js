const DEBUG = true;

class Ajax {
	constructor(parameter) {
		this.parameter = parameter;
		this.parameter["json"] = parameter["json"] || true;
	}

	success(data) {
		if (DEBUG) console.log("Ajax success\n", data);
		try {
			if (this.parameter["json"]) data = JSON.parse(data);
		} catch (e) {
			console.error('WANG: Ajax BackData is not JSON', e);
		} finally {
			if (this.parameter['success']) this.parameter['success'](data);
		}

	}

	error(XML, textStatus, errorThrown) {
		if (DEBUG) console.error("Ajax error!!!\n", XML);
		if (this.parameter['error']) this.parameter['error'](XML, textStatus, errorThrown);
	}

	data(commande = "", dataObj = null, isJSON = true) {
		if (!isJSON) return this.parameter['data'] = data;
		let post = {
			commande: commande,
			data: dataObj
		}
		let stringData = JSON.stringify(post);
		return this.parameter['data'] = stringData;
	}

	ajax() {
		let that = this;
		$.ajax({
			type: this.parameter['type'] || "GET",
			url: encodeURI(this.parameter['url']),
			data: this.parameter['data'] || "", //具体实例化
			timeout: this.parameter['timeout'] || 8000,
			success: function (data) {
				that.success(data);
			},
			error: function (XML, textStatus, errorThrown) {
				that.error(XML, textStatus, errorThrown)
			},
			cache: this.parameter['cache'] || false
		});
	}

	reset() {
		this.parameter = null;
	}
}

exports.Ajax = Ajax;