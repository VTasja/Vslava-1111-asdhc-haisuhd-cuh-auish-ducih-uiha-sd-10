
"use strict";

var databind = require('databind');

module.exports = (function () {

    /**
     * Create a form by schema
     *
     * @param model модель
     * @param schema схема формы
     * @param buttons хэш кнопок где ключ это идентификатор кнопки, а значение это текст кнопки
     */
    function create(model, schema, opts) {
        var name,
            form,
            div,
            btn,
            btnEl,
            el,
            i,
            fields = [];
            
        form = createForm(opts);
        
        for (name in model) {
            if (schema[name]) {
                if (typeof schema[name].order !== 'undefined') {
                    fields.push({ name: name, order: schema[name].order });
                } else {
                    fields.push(name);
                }
            } else {
                fields.push(name);
            }
        }
        
        fields = fields.sort(function (a, b) {
            var order_a = (typeof a === 'object' ? a.order : Number.MAX_VALUE),
                order_b = (typeof b === 'object' ? b.order : Number.MAX_VALUE);
            
            return (order_a < order_b ? -1 : (order_a > order_b ? 1 : 0));
        }).map(function (value) {
            return (typeof value === 'object' ? value.name : value);
        });
        
        for (i = 0; i < fields.length; i++) {
            name = fields[i];
            
            div = createGroupDiv();
            
            var has_label = false;
            if (schema[name] && schema[name].label) {
                div.appendChild(createLabel(schema[name].label, opts));
                has_label = true;
            }

            var input = createInput(name, opts, has_label);
            databind.bind(input, model);

            div.appendChild(input);
            form.appendChild(div);
        }
        
        var divButton = createGroupDiv(),
            divInput = createInputDiv(opts, false);
        
        divButton.appendChild(divInput);
    
        divInput.appendChild(createButton('cancel', 'Cancel', 'button'));
        divInput.appendChild(createButton('submit', 'OK', 'submit'));

        form.appendChild(divButton);
        
        return form;
    }

    function createForm(opts) {
        var tag = document.createElement('form');
        tag.setAttribute('role','form');
        tag.className = 'form-horizontal';
        opts.url && tag.setAttribute('action',opts.url);
        opts.request_type && tag.setAttribute('type',opts.request_type);
        return tag;
    }
    
    function createInputDiv(opts, has_label) {
        var tag = document.createElement('div');
        tag.className = (has_label ? '' : ('col-sm-offset-' + opts.label_size)) + ' col-sm-' + opts.field_size;
        return tag;
    }
    
    function createInput(dataKey, opts, has_label) {
        var tag,
            div = createInputDiv(opts, has_label);
        
        if (opts.readonly) {
            tag = document.createElement('p');
            tag.className = 'form-control-static';
            tag.setAttribute('data-key', dataKey);
        } else {
            tag = document.createElement('input');
            tag.setAttribute('type', 'text');
            tag.setAttribute('data-key', dataKey);
            tag.className = 'form-control';
        }
        
        div.appendChild(tag);
        return div;
    }

    function createLabel(text, opts) {
        var tag = document.createElement('label');
        tag.className = 'col-sm-' + opts.label_size + ' control-label';
        tag.innerHTML = text;
        return tag;
    }

    function createGroupDiv() {
        var tag = document.createElement('div');
        tag.className = 'form-group';
        return tag;
    }

    function createButton(id, text, type) {
        var tag = document.createElement('button');
        //tag.id = id;
        tag.className = 'btn btn-default ' + id;
        tag.innerHTML = text;
        tag.type = type;
        return tag;
    }

    return {
        create: create
    }
})();
