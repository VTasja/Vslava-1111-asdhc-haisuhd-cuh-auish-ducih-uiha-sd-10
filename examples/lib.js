

var model = {
    first: 111,
    second: 222,
    third: 'The first',
    fourth: 'The second',
    fifth: 'The third'
};

var schema = {
    first: { order: 2 },
    second: { order: 1, label: 'SECOND' },
    third: { order: 3 },
    fifth: { label: 'FIFTH' }
};

var form = FormUP.create(model, schema, {
    label: 2, field: 10, readonly: true
});

var frm = document.getElementById('frm');
frm.appendChild(form);
