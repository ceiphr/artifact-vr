(() => {
    if (!AFRAME) { return console.error('AFRAME is required!'); }
    if (!AFRAME.ASSETS_PATH) { AFRAME.ASSETS_PATH = "./assets"; }
    const SFX = require('./material');
})();
AFRAME.registerComponent('modal', {
    schema: {
        message: { type: 'string', default: "You are cool" },
        action: { type: 'string', default: "" },
        backgroundColor: { type: "color", default: "#222" },//242f35
        actionColor: { type: "color", default: "#4076fd" },
        color: { type: "color", default: "#FFF" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        width: { type: "number", default: 3 },
        height: { type: "number", default: 3 },
        duration: { type: 'number', default: 2000 },
        autoshow: { type: 'boolean', default: false }
    },
    init: function () {
        var that = this;

        // CONFIG
        this.el.setAttribute("position", `10000 10000 10000`);
        this.el.setAttribute("rotation", "-25 0 0");
        this.el.setAttribute("scale", "0.3 0.3 0.3");

        // OUTLINE
        this.background = document.createElement('a-rounded');
        this.background.setAttribute('radius', 0.03);
        this.background.setAttribute('position', `0 -${0.36 / 2} 0.001`);
        this.el.appendChild(this.background);

        // LABEL
        this.label = document.createElement('a-entity');
        this.el.appendChild(this.label);

        function changeWidth(e) {
            let attr = that.label.getAttribute('text');
            attr.width = that.data.width - e.detail;
            attr.wrapCount = 10 * attr.width;
            that.label.setAttribute('text', attr);
            that.label.setAttribute('position', attr.width / 2 + 0.14 + ' 0.04 0.001');

            this.setAttribute('position', `${that.data.width - e.detail} ${(0.44 - 0.36) / 2} 0.001`)
        }
        this.action.addEventListener('change:width', changeWidth);
        this.action.addEventListener('click', function () {
            Event.emit(that.el, 'actionclick');
        });

        function changeHeight(e) {
            let attr = that.label.getAttribute('text');
            attr.height = that.data.height - e.detail;
            attr.wrapCount = 10 * attr.height;
            that.label.setAttribute('text', attr);
            that.label.setAttribute('position', attr.height / 2 + 0.14 + ' 0.04 0.001');

            this.setAttribute('position', `${that.data.height - e.detail} ${(0.44 - 0.36) / 2} 0.001`)
        }
        this.action.addEventListener('change:height', changeHeight);
        this.action.addEventListener('click', function () {
            Event.emit(that.el, 'actionclick');
        });

        let timer = setInterval(function () {
            if (that.action.object3D && that.action.object3D.children[0]) {
                clearInterval(timer);
                Utils.updateOpacity(that.el, 0);
                Utils.updateOpacity(that.label, 0);
                Utils.updateOpacity(that.action, 0);
                if (that.data.autoshow) { that.show(); }
            }
        }, 10);

        // METHDOS
        this.el.show = this.show.bind(this);
        this.el.hide = this.hide.bind(this);
    },
    show: function () {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }
        this.el.setAttribute("position", `${-this.data.width / (2 / this.el.object3D.scale.x)} 0.25 -1.6`);
        let that = this;
        /*if (!this.el.parentNode && this.el._parentNode) {
          this.el._parentNode.appendChild(this.el);
        }*/
        setTimeout(function () {
            that.el.setAttribute('fadein', { duration: 160 });
            setTimeout(function () {
                Utils.updateOpacity(that.label, 1);
            }, 10)
        }, 0)
        this.hideTimer = setTimeout(function () {
            that.hide();
        }, this.data.duration);

        SFX.show(this.el);
    },
    hide: function () {
        let that = this;
        setTimeout(function () {
            Utils.updateOpacity(that.label, 0);
            setTimeout(function () {
                that.el.setAttribute('fadeout', { duration: 160 });
                setTimeout(function () {
                    /*if (that.el.parentNode) {
                      that.el._parentNode = that.el.parentNode;
                      that.el.parentNode.removeChild(that.el);
                    }*/
                    that.el.setAttribute("position", `10000 10000 10000`);
                }, 200);
            }, 10)
        }, 0);
    },
    update: function () {
        var that = this;

        // BACKGROUND
        this.background.setAttribute('color', this.data.backgroundColor);
        this.background.setAttribute('width', this.data.width);
        this.background.setAttribute('height', this.data.height);

        let props = {
            color: this.data.color,
            align: 'left',
            wrapCount: 10 * this.data.width,
            width: this.data.width,
            height: this.data.height,
            lineHeight: 64
        }
        if (this.data.font) { props.font = this.data.font; }

        // MESSAGE
        props.value = this.data.message
        this.label.setAttribute('text', props);
        this.label.setAttribute('position', this.data.width / 2 + 0.14 + ' 0 0.001');

        // ACTION
        this.action.setAttribute('value', this.data.action.toUpperCase());
        this.action.setAttribute('color', this.data.actionColor);
    },
    tick: function () { },
    remove: function () { },
    pause: function () { },
    play: function () { }
});

AFRAME.registerPrimitive('a-modal', {
    defaultComponents: {
        modal: {}
    },
    mappings: {
        message: 'modal.message',
        action: 'modal.action',
        'action-color': 'modal.actionColor',
        'background-color': 'modal.backgroundColor',
        color: 'modal.color',
        font: 'modal.font',
        'letter-spacing': 'modal.letterSpacing',
        'line-height': 'modal.lineHeight',
        'width': 'modal.width',
        'height': 'modal.height',
        'duration': 'modal.duration',
        'autoshow': 'modal.autoshow'
    }
});
