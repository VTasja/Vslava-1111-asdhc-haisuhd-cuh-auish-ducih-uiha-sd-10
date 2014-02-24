
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
            el;
            
        form = createForm();
        
        for (name in model) {
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
    
        divInput.appendChild(createButton('cancel','Отмена','button'));
        divInput.appendChild(createButton('submit','OK','submit'));

        form.appendChild(divButton);
        
        return form;
    }

    function createForm() {
        var tag = document.createElement('form');
        tag.setAttribute('role','form');
        tag.className = 'form-horizontal';
        return tag;
    }
    
    function createInputDiv(opts, has_label) {
        var tag = document.createElement('div');
        tag.className = (has_label ? '' : ('col-sm-offset-' + opts.label)) + ' col-sm-' + opts.field;
        return tag;
    }
    
    function createInput(dataKey, opts, has_label) {
        var div = createInputDiv(opts, has_label);
        
        var tag = document.createElement('input');
        tag.setAttribute('type', 'text');
        tag.setAttribute('data-key', dataKey);
        tag.className = 'form-control';
        
        div.appendChild(tag);
        return div;
    }

    function createLabel(text, opts) {
        var tag = document.createElement('label');
        tag.className = 'col-sm-' + opts.label + ' control-label';
        tag.innerHTML = text;
        return tag;
    }

    function createGroupDiv() {
        var tag = document.createElement('div');
        tag.className = 'form-group';
        return tag;
    }

    function createButton(id,text,type) {
        var tag = document.createElement('button');
        tag.id = id;
        tag.className = 'btn btn-default';
        tag.innerHTML = text;
        tag.type = type;
        return tag;
    }

    return {
        create: create
    }
})();
