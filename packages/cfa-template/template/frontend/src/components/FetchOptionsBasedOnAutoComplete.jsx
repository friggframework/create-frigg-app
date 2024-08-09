import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form } from './Form.jsx';
import { useFormContext } from '../context/FormContext.jsx';
import FormType from '../enums/FormType';

export const FetchOptionsBasedOnAutoComplete = () => {
  const [formData, setFormData] = useState({});
  const { setFormType } = useFormContext();

  useEffect(() => {
    setFormType(FormType.USER_ACTION);
  }, []);

  const handleChange = async ({ errors, data }) => {
    setFormData(data);
  };
  const handleSubmit = () => {
    alert('Submitted data: ' + JSON.stringify(formData, null, 2));
  };

  const sampleJsonSchema = {
    type: 'object',
    properties: {
      companyName: {
        type: 'string',
        title: 'Enter Text',
        oneOf: [
          {
            const: 'foo',
            title: 'Foo',
          },
          {
            const: 'bar',
            title: 'Bar',
          },
          {
            const: 'foobar',
            title: 'FooBar',
          },
        ],
        asyncRefresh: true,
      },
    },
    required: ['autocomplete'],
  };

  const sampleUiSchema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/autocomplete',
      },
    ],
  };

  return (
    <div className="flex flex-col justify-content-center align-items-center gap-3">
      <h2>Autocomplete search (Type faceboook for a sample)</h2>
      <Form
        schema={sampleJsonSchema}
        uiSchema={sampleUiSchema}
        data={formData}
        onChange={handleChange}
      />
      <button
        className="p-2 bg-black text-white rounded-md"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
