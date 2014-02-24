

var model = {
    first: 111,
    second: 222,
    third: 'The first'
};

var schema = {
    first: {},
    second: { label: 'SECOND' },
    third: {}
};

var form = FormUP.create(model, schema, {
    label: 2, field: 10
});

var frm = document.getElementById('frm');
frm.appendChild(form);
