export const OPERATION_CATEGORIES = [
    {
        categoryId: 'cat001',
        categoryName: 'ACTION',
    },
    {
        categoryId: 'cat002',
        categoryName: 'CONDITION',
    },
    {
        categoryId: 'cat003',
        categoryName: 'LOOP',
    }
];

export const OPERATION_TYPES = [
    {
        typeId: 'opr001',
        categoryId: 'cat001',
        typeName: 'OPEN',
        description: 'Open url for web scrapping.',
        outputFormat: '%url%',
        inputs: ['inp001']
    },
    {
        typeId: 'opr002',
        categoryId: 'cat001',
        typeName: 'EXTRACT',
        description: 'Scraps specified elements from opened page.',
        outputFormat: '%name% [%selector%]',
        inputs: ['inp002', 'inp003']
    },
    {
        typeId: 'opr003',
        categoryId: 'cat002',
        typeName: 'IF',
        description: 'Executes block only if specified condition is true.'
    },
    {
        typeId: 'opr004',
        categoryId: 'cat002',
        typeName: 'IF...ELSE',
        description: 'Scraps specified elements from opened page.'
    },
    {
        typeId: 'opr005',
        categoryId: 'cat003',
        typeName: 'WHILE',
        description: 'Executes block untill specified condition become false.'
    },
    {
        typeId: 'opr006',
        categoryId: 'cat003',
        typeName: 'FOR',
        description: 'Scraps specified elements from opened page.'
    }
];

export const OPERATION_INPUTS = [{
    inputId: 'inp001',
    name: 'url',
    label: 'URL',
    type: 'text',
    width: 12,
    validators: [{
        name: 'validURL',
        regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
        message: 'Please enter valid URL.'
    }]
},
{
    inputId: 'inp002',
    name: 'name',
    label: 'Element name',
    helperText: '',
    type: 'text',
    width: 6,
    validators: [{
        name: 'validElementName',
        regex: ".+",
        message: 'Please enter valid element name.'
    }]
},
{
    inputId: 'inp003',
    name: 'selector',
    label: 'Selector',
    helperText: '',
    type: 'text',
    width: 6,
    validators: [{
        name: 'validSelector',
        regex: ".+",
        message: 'Please enter valid selector.'
    }]
}];
