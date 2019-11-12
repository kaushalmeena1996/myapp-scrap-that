import { INPUT_TYPES, CATEGORY_TYPES, OPERATION_TYPES, VALIDATION_TYPES } from "./types";
import IOperation from "../types/operation";

const OPERATIONS: IOperation[] = [
  {
    type: OPERATION_TYPES.OPEN,
    category: CATEGORY_TYPES.ACTION,
    description: "Open url for web scrapping.",
    format: "{0}",
    inputs: [
      {
        label: "URL",
        type: INPUT_TYPES.TEXT,
        width: 12,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter URL."
          },
          {
            type: VALIDATION_TYPES.URL,
            message: "Please enter valid URL."
          }
        ],
        value: ""
      },
      {
        label: "Variable",
        type: INPUT_TYPES.VARIABLE_BOX,
        update: 0,
        width: 12
      }
    ]
  },
  {
    type: OPERATION_TYPES.EXTRACT,
    category: CATEGORY_TYPES.ACTION,
    description: "Scraps specified elements from opened page.",
    format: "{0} [{1}]",
    inputs: [
      {
        label: "Element name",
        type: INPUT_TYPES.TEXT,
        width: 6,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid element name."
          }
        ],
        value: ""
      },
      {
        label: "CSS selector",
        type: INPUT_TYPES.TEXT,
        width: 6,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid CSS selector."
          }
        ],
        value: ""
      }
    ]
  },
  {
    type: OPERATION_TYPES.CLICK,
    category: CATEGORY_TYPES.ACTION,
    description: "Click on specified element.",
    format: "[{0}]",

    inputs: [
      {
        label: "CSS selector",
        type: INPUT_TYPES.TEXT,
        width: 12,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid CSS selector."
          }
        ],
        value: ""
      }
    ]
  },
  {
    type: OPERATION_TYPES.TYPE,
    category: CATEGORY_TYPES.ACTION,
    description: "Type text into specified input.",
    format: "[{0}] {1}",
    inputs: [
      {
        label: "CSS selector",
        type: INPUT_TYPES.TEXT,
        width: 6,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid CSS selector."
          }
        ],
        value: ""
      },
      {
        label: "Text",
        type: INPUT_TYPES.TEXT,
        width: 6,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid text."
          }
        ],
        value: ""
      }
    ]
  },
  {
    type: OPERATION_TYPES.SET,
    category: CATEGORY_TYPES.ACTION,
    description: "Set specified data to a variable.",
    format: "{0} [{1}]",
    inputs: [
      {
        label: "Variable name",
        type: INPUT_TYPES.VARIABLE_TEXT,
        width: 6,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid variable name."
          }
        ],
        value: ""
      },
      {
        label: "Data type",
        type: INPUT_TYPES.SELECT,
        options: [
          {
            name: "String",
            value: "String"
          },
          {
            name: "Number",
            value: "Number"
          },
          {
            name: "Boolean",
            value: "Boolean"
          },
          {
            name: "Array",
            value: "Array"
          }
        ],
        width: 6,
        value: ""
      },
      {
        label: "Value",
        type: INPUT_TYPES.TEXT,
        rows: 4,
        multiline: true,
        width: 12,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid value."
          }
        ],
        value: ""
      }
    ]
  },
  {
    type: OPERATION_TYPES.IF,
    category: CATEGORY_TYPES.CONDITION,
    description: "Executes block only if specified condition is true.",
    format: "{0}",
    inputs: [
      {
        label: "Condition",
        type: INPUT_TYPES.TEXT,
        width: 12,
        rules: [
          {
            type: VALIDATION_TYPES.REQUIRED,
            message: "Please enter valid condition."
          }
        ],
        value: ""
      },
      {
        label: "Variable",
        type: INPUT_TYPES.VARIABLE_BOX,
        update: 0,
        width: 12
      },
      {
        label: "Operations",
        type: INPUT_TYPES.OPERATIONS,
        operations: [{
          type: OPERATION_TYPES.OPEN,
          category: CATEGORY_TYPES.ACTION,
          description: "Open url for web scrapping.",
          format: "{0}",
          inputs: [
            {
              label: "URL",
              type: INPUT_TYPES.TEXT,
              width: 12,
              rules: [
                {
                  type: VALIDATION_TYPES.REQUIRED,
                  message: "Please enter valid URL."
                }
              ],
              value: ""
            },
            {
              label: "Variable",
              type: INPUT_TYPES.VARIABLE_BOX,
              update: 0,
              width: 12
            }
          ]
        }],
        width: 12
      }
    ]
  }
  // {
  //   type: OPERATION_TYPES.IF_ELSE,
  //   category: CATEGORY_TYPES.CONDITION,
  //   description: "Scraps specified elements from opened page.",
  //   format: "{0}",
  //   inputs: [
  //     {
  //       label: "URL",
  //       type: INPUT_TYPES.TEXT,
  //       width: 6,
  //       rules: [
  //         {
  //           type: VALIDATION_TYPES.REQUIRED,
  //           message: "Please enter valid URL."
  //         }
  //       ],
  //       value: ""
  //     }
  //   ]
  // },
  // {
  //   type: OPERATION_TYPES.WHILE,
  //   category: CATEGORY_TYPES.LOOP,
  //   description: "Executes block untill specified condition become false.",
  //   format: "{0}",
  //   inputs: [
  //     {
  //       label: "URL",
  //       type: INPUT_TYPES.TEXT,
  //       width: 6,
  //       rules: [
  //         {
  //           type: VALIDATION_TYPES.REQUIRED,
  //           message: "Please enter valid URL."
  //         }
  //       ],
  //       value: ""
  //     }
  //   ]
  // },
  // {
  //   type: OPERATION_TYPES.FOR,
  //   category: CATEGORY_TYPES.LOOP,
  //   description: "Scraps specified elements from opened page.",
  //   format: "{0}",
  //   inputs: [
  //     {
  //       label: "URL",
  //       type: INPUT_TYPES.TEXT,
  //       width: 6,
  //       rules: [
  //         {
  //           type: VALIDATION_TYPES.REQUIRED,
  //           message: "Please enter valid URL."
  //         }
  //       ],
  //       value: ""
  //     }
  //   ]
  // }
];

export default OPERATIONS;
