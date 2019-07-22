import * as operationCategories from './operationCategories';
import * as operationTypes from './operationTypes'

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
        outputFormat: '%url%',
        inputs: ['url'],
    },
    {
        type: operationTypes.EXTRACT,
        category: operationCategories.ACTION,
        description: 'Scraps specified elements from opened page.',
        outputFormat: '%name% [%selector%]',
        inputs: ['name', 'selector']
    },
    {
        type: operationTypes.IF,
        category: operationCategories.CONDITION,
        description: 'Executes block only if specified condition is true.',
        outputFormat: '%url%',
        inputs: ['url']
    },
    {
        type: operationTypes.IF_ELSE,
        category: operationCategories.CONDITION,
        description: 'Scraps specified elements from opened page.',
        outputFormat: '%url%',
        inputs: ['url']
    },
    {
        type: operationTypes.WHILE,
        category: operationCategories.LOOP,
        description: 'Executes block untill specified condition become false.',
        outputFormat: '%url%',
        inputs: ['url']
    },
    {
        type: operationTypes.FOR,
        category: operationCategories.LOOP,
        description: 'Scraps specified elements from opened page.',
        outputFormat: '%url%',
        inputs: ['url']
    }
];

export const OPERATION_INPUTS = [{
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
