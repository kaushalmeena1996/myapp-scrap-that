import * as operationCategories from './operationCategories';
import * as operationTypes from './operationTypes'
import * as inputTypes from './inputTypes'


export const OPERATION_CATEGORIES = [
    operationCategories.ACTION,
    operationCategories.CONDITION,
    operationCategories.LOOP
];

export const OPERATION_TYPES = [
    {
        type: operationTypes.OPEN,
        category: operationCategories.ACTION,
        description: 'Open url for web scrapping.',
        headingFormat: '%url%',
        heading: '',
        inputs: [{
            name: 'url',
            label: 'URL',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validURL',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid URL.'
            }]
        }],
        outputs: {
            url: ''
        },
        errors: {
            url: ''
        }
    },
    {
        type: operationTypes.EXTRACT,
        category: operationCategories.ACTION,
        description: 'Scraps specified elements from opened page.',
        headingFormat: '%element% [%selector%]',
        heading: '',
        inputs: [{
            name: 'element',
            label: 'Element name',
            type: inputTypes.TEXT,
            width: 6,
            validators: [{
                name: 'validElementName',
                regex: ".+",
                message: 'Please enter valid element name.'
            }]
        }, {
            name: 'selector',
            label: 'CSS selector',
            type: inputTypes.TEXT,
            width: 6,
            validators: [{
                name: 'validCSSSelector',
                regex: ".+",
                message: 'Please enter valid CSS selector.'
            }]
        }],
        outputs: {
            element: '',
            selector: ''
        },
        errors: {
            element: '',
            selector: ''
        }
    },
    {
        type: operationTypes.CLICK,
        category: operationCategories.ACTION,
        description: 'Click on specified element.',
        headingFormat: '[%selector%]',
        heading: '',
        inputs: [{
            name: 'selector',
            label: 'CSS selector',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validCSSSelector',
                regex: ".+",
                message: 'Please enter valid CSS selector.'
            }]
        }],
        outputs: {
            selector: ''
        },
        errors: {
            selector: ''
        }
    },
    {
        type: operationTypes.TYPE,
        category: operationCategories.ACTION,
        description: 'Type text into specified input.',
        headingFormat: '[%selector%] %text%',
        heading: '',
        inputs: [{
            name: 'selector',
            label: 'CSS selector',
            type: inputTypes.TEXT,
            width: 6,
            validators: [{
                name: 'validCSSSelector',
                regex: ".+",
                message: 'Please enter valid CSS selector.'
            }]
        }, {
            name: 'text',
            label: 'Text',
            type: inputTypes.TEXT,
            width: 6,
            validators: [{
                name: 'validTextName',
                regex: ".+",
                message: 'Please enter valid text.'
            }]
        }],
        outputs: {
            selector: '',
            text: '',
        },
        errors: {
            selector: '',
            text: '',
        }
    },
    {
        type: operationTypes.SET,
        category: operationCategories.ACTION,
        description: 'Set specified data to a variable.',
        headingFormat: '%variable% [%type%]',
        heading: '',
        inputs: [{
            name: 'variable',
            label: 'Variable name',
            type: inputTypes.TEXT,
            width: 6,
            validators: [{
                name: 'validVariableName',
                regex: ".+",
                message: 'Please enter valid variable name.'
            }]
        }, {
            name: 'type',
            label: 'Data type',
            type: inputTypes.SELECT,
            options: [{
                name: 'String',
                value: 'String'
            },
            {
                name: 'Number',
                value: 'Number'
            },
            {
                name: 'Boolean',
                value: 'Boolean'
            },
            {
                name: 'Array',
                value: 'Array'
            }],
            width: 6,
            validators: [{
                name: 'validDataType',
                regex: ".+",
                message: 'Please select valid data type.'
            }]
        }, {
            name: 'data',
            label: 'Data',
            type: inputTypes.TEXT,
            rows: 5,
            multiline: true,
            width: 12,
            validators: [{
                name: 'validDataName',
                regex: ".+",
                message: 'Please enter valid data.'
            }]
        }],
        outputs: {
            variable: '',
            type: 'String',
            data: ''
        },
        errors: {
            variable: '',
            type: '',
            data: ''
        }
    },
    {
        type: operationTypes.IF,
        category: operationCategories.CONDITION,
        description: 'Executes block only if specified condition is true.',
        headingFormat: '%condition%',
        heading: '',
        inputs: [{
            name: 'condition',
            label: 'Condition',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validCondtion',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid condition.'
            }]
        }],
        outputs: {
            condition: ''
        },
        errors: {
            condition: ''
        }
    },
    {
        type: operationTypes.IF_ELSE,
        category: operationCategories.CONDITION,
        description: 'Scraps specified elements from opened page.',
        headingFormat: '%url%',
        heading: '',
        inputs: [{
            name: 'url',
            label: 'URL',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validURL',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid URL.'
            }]
        }],
        outputs: {
            url: ''
        },
        errors: {
            url: ''
        }
    },
    {
        type: operationTypes.WHILE,
        category: operationCategories.LOOP,
        description: 'Executes block untill specified condition become false.',
        headingFormat: '%url%',
        heading: '',
        inputs: [{
            name: 'url',
            label: 'URL',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validURL',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid URL.'
            }]
        }],
        outputs: {
            url: ''
        },
        errors: {
            url: ''
        }
    },
    {
        type: operationTypes.FOR,
        category: operationCategories.LOOP,
        description: 'Scraps specified elements from opened page.',
        headingFormat: '%url%',
        heading: '',
        inputs: [{
            name: 'url',
            label: 'URL',
            type: inputTypes.TEXT,
            width: 12,
            validators: [{
                name: 'validURL',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid URL.'
            }]
        }],
        outputs: {
            url: ''
        },
        errors: {
            url: ''
        }
    }
];