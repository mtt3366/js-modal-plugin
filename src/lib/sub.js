function Sub() {
    this.pond = [];
}
Sub.prototype = {
    constructor: Sub,
    on(func) {
        let pond = this.pond;
        !pond.includes(func) ? pond.push(func) : null;
    },
    off(func) {
        let pond = this.pond;
        pond.forEach((item, index) => item === func ? pond[index] = null : null);
    },
    fire(...params) {
        let pond = this.pond;
        for (let i = 0; i < pond.length; i++) {
            let itemFunc = pond[i];
            if (typeof itemFunc !== "function") {
                pond.splice(i, 1);
                i--;
                continue;
            }
            itemFunc(...params);
        }
    }
};
export default Sub;